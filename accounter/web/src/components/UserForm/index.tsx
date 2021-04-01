import { createFragmentContainer, commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Environment, PayloadError } from 'relay-runtime';
import { useEnvironment } from '../../contexts/relay';
import {
  UserFormCreateMutation,
  UserFormCreateMutationResponse,
  UserFormCreateMutationVariables
} from './__generated__/UserFormCreateMutation.graphql';
import { UserForm_profile } from './__generated__/UserForm_profile.graphql';
import {
  UserFormUpdateMutationVariables,
  UserFormUpdateMutationResponse,
  UserFormUpdateMutation
} from './__generated__/UserFormUpdateMutation.graphql';
import { useNotifications } from '../../contexts/notification';
import UserSelect from './UserSelect';
import { UserForm_profileList } from './__generated__/UserForm_profileList.graphql';

const createUser = (
  environment: Environment,
  variables: UserFormCreateMutationVariables,
  onCompleted: (response: UserFormCreateMutationResponse, errors?: ReadonlyArray<PayloadError> | null) => void,
  onError: (error: PayloadError) => void
) => {
  commitMutation<UserFormCreateMutation>(environment, {
    mutation: graphql`
      mutation UserFormCreateMutation($email: String!, $firstName: String!, $lastName: String!, $title: String) {
        createUser(input: { email: $email, firstName: $firstName, lastName: $lastName, title: $title }) {
          profile {
            id
            ...Content_profile @relay(mask: false)
            ...UserDirectory_profile @relay(mask: false)
          }
        }
      }
    `,
    variables,
    onCompleted,
    onError
  });
};

const updateUser = (
  environment: Environment,
  variables: UserFormUpdateMutationVariables,
  onCompleted: (response: UserFormUpdateMutationResponse, errors?: ReadonlyArray<PayloadError> | null) => void,
  onError: ((error: Error) => void) | null
) => {
  commitMutation<UserFormUpdateMutation>(environment, {
    mutation: graphql`
      mutation UserFormUpdateMutation(
        $id: ID!
        $email: String
        $firstName: String
        $lastName: String
        $title: String
        $mergeWith: ID
      ) {
        updateUser(
          input: {
            id: $id
            email: $email
            firstName: $firstName
            lastName: $lastName
            title: $title
            mergeWith: $mergeWith
          }
        ) {
          profiles {
            id
            ...Content_profile @relay(mask: false)
            ...UserDirectory_profile @relay(mask: false)
          }
        }
      }
    `,
    variables,
    onCompleted,
    onError
  });
};

type Props =
  | {
      // Edit
      profile: UserForm_profile;
      profileList: UserForm_profileList;
      cancelRoute: string;
    }
  | {
      // Create
      profile?: undefined;
      profileList?: undefined;
      cancelRoute: string;
    };

const UserForm = (props: Props) => {
  const { addNotification } = useNotifications();
  const isUpdate = !!props.profile;
  const environment = useEnvironment();
  const history = useHistory();
  const [emailInput, setEmailInput] = useState(isUpdate ? props.profile!.email : '');
  const [firstNameInput, setFirstNameInput] = useState(
    isUpdate && props.profile!.firstName ? props.profile!.firstName : ''
  );
  const [lastNameInput, setLastNameInput] = useState(
    isUpdate && props.profile!.lastName ? props.profile!.lastName : ''
  );
  const [titleInput, setTitleInput] = useState(isUpdate && props.profile!.title ? props.profile!.title : '');
  const [profileToMergeInput, setProfileToMergeInput] = useState<UserForm_profileList[0]['id'] | null>(null);
  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={(e) => {
        e.preventDefault();

        if (isUpdate) {
          const variables = {
            id: props.profile!.id,
            email: emailInput,
            firstName: firstNameInput,
            lastName: lastNameInput,
            title: titleInput.length > 0 ? titleInput : undefined,
            mergeWith: profileToMergeInput
          };
          updateUser(
            environment,
            variables,
            (response, errors) => {
              if (errors) {
                addNotification({
                  type: 'error',
                  title: 'Something went wrong.',
                  content: 'Could not update user'
                });
              } else {
                const updatedProfile = response.updateUser!.profiles.find((p) => p?.id === props.profile!.id)!;
                history.push(`/users/details/${updatedProfile.id}`);
              }
            },
            (err) =>
              addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Could not update user'
              })
          );
        } else {
          const variables = {
            email: emailInput,
            firstName: firstNameInput,
            lastName: lastNameInput,
            title: titleInput.length > 0 ? titleInput : undefined
          };

          createUser(
            environment,
            variables,
            (response, errors) => {
              if (errors) {
                addNotification({
                  type: 'error',
                  title: 'Something went wrong.',
                  content: 'Could not create user'
                });
              } else {
                history.push(`/users/details/${response.createUser!.profile.id}`);
              }
            },
            (err) =>
              addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Could not create user'
              })
          );
        }
      }}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Basic information about the user</p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                First name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  required
                  value={firstNameInput}
                  onChange={(evt) => setFirstNameInput(evt.target.value)}
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Last name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  required
                  value={lastNameInput}
                  onChange={(evt) => setLastNameInput(evt.target.value)}
                  type="text"
                  name="last_name"
                  id="last_name"
                  autoComplete="family-name"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Email address
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  required
                  value={emailInput}
                  onChange={(evt) => setEmailInput(evt.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Title
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  value={titleInput}
                  onChange={(evt) => setTitleInput(evt.target.value)}
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="organization-title"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Merge</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Merges this profile into another one.</p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              with
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              {props.profileList && (
                <UserSelect
                  profileList={props.profileList.filter((p) => p.id !== props.profile.id)}
                  value={profileToMergeInput}
                  onChange={setProfileToMergeInput}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Link to={props.cancelRoute}>
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isUpdate ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default createFragmentContainer(UserForm, {
  profile: graphql`
    fragment UserForm_profile on ProfileNode {
      id
      firstName
      lastName
      email
      title
    }
  `,
  profileList: graphql`
    fragment UserForm_profileList on ProfileNode @relay(plural: true) {
      id
      ...UserSelect_profileList
    }
  `
});
