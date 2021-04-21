import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { useNotifications } from '../../../contexts/notification';
import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { OnboardingBasics_roles$key } from './__generated__/OnboardingBasics_roles.graphql';
import { OnboardingBasics_organizationSizes$key } from './__generated__/OnboardingBasics_organizationSizes.graphql';

export const ONBOARD_BASIC_MUTATION = gql`
  mutation OnboardBasic($firstName: String!, $lastName: String!, $role: String!, $organizationSize: String!) {
    onboardBasic(firstName: $firstName, lastName: $lastName, role: $role, organizationSize: $organizationSize) {
      status
    }
  }
`;

type OnboardBasicResponse = {
  onboardBasic?: {
    status: 'success' | 'error';
  };
};

type OnboardBasicParameters = {
  firstName: string;
  lastName: string;
  role: string;
  organizationSize: string;
};

type Props = {
  roles: OnboardingBasics_roles$key;
  organizationSizes: OnboardingBasics_organizationSizes$key;
};

const OnboardingBasics = (props: Props) => {
  const { addNotification } = useNotifications();

  const [onboardBasic, { data: response, error, loading }] = useMutation<OnboardBasicResponse, OnboardBasicParameters>(
    ONBOARD_BASIC_MUTATION,
    {
      errorPolicy: 'all',
      onError: () => undefined
    }
  );
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [organizationSizeInput, setOrganizationSizeInput] = useState('');

  useEffect(() => {
    if (error) {
      addNotification({
        type: 'error',
        title: 'Onboarding Failed',
        content: 'Something went wrong. We could not save your data'
      });
    }
  }, [error, addNotification]);

  const roles = useFragment(
    graphql`
      fragment OnboardingBasics_roles on RoleValueLabelPair @relay(plural: true) {
        value
        label
      }
    `,
    props.roles
  );

  const organizationSizes = useFragment(
    graphql`
      fragment OnboardingBasics_organizationSizes on OrganizationSizeValueLabelPair @relay(plural: true) {
        value
        label
      }
    `,
    props.organizationSizes
  );

  return response?.onboardBasic?.status === 'success' ? (
    <Redirect
      to={{
        pathname: '/onboarding/apps'
      }}
    />
  ) : (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Tell us more about you!</h3>
        <p className="mt-1 text-sm text-gray-600">Customizing your experience.</p>
      </div>
      <div className="mt-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onboardBasic({
              variables: {
                firstName: firstNameInput,
                lastName: lastNameInput,
                role: roleInput,
                organizationSize: organizationSizeInput
              }
            });
          }}
        >
          <div className="shadow overflow-hidden sm:rounded-md bg-white">
            <div className="grid grid-cols-2 px-4 py-5 sm:p-6 gap-x-4 gap-y-6">
              <div className="col-span-1">
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  value={firstNameInput}
                  onChange={(evt) => setFirstNameInput(evt.target.value)}
                  type="text"
                  name="first_name"
                  id="first-name"
                  autoComplete="given-name"
                  required
                  className="mt-1 focus:ring-blue-800 focus:border-blue-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  disabled={loading}
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  value={lastNameInput}
                  onChange={(evt) => setLastNameInput(evt.target.value)}
                  type="text"
                  name="last_name"
                  id="last-name"
                  autoComplete="family-name"
                  required
                  className="mt-1 focus:ring-blue-800 focus:border-blue-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  disabled={loading}
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Your role
                </label>
                <select
                  value={roleInput}
                  onChange={(evt) => setRoleInput(evt.target.value)}
                  id="role"
                  name="role"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
                  disabled={loading}
                >
                  <option />
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label htmlFor="organization_size" className="block text-sm font-medium text-gray-700">
                  Company size
                </label>
                <select
                  value={organizationSizeInput}
                  onChange={(evt) => setOrganizationSizeInput(evt.target.value)}
                  id="organization-size"
                  name="organization_size"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
                  required
                  disabled={loading}
                >
                  <option />
                  {organizationSizes.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingBasics;
