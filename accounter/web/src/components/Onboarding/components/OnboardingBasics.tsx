import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

export const ONBOARD_BASIC_MUTATION = gql`
  mutation OnboardBasic($firstName: String!, $lastName: String!, $title: String!, $orgSize: String!) {
    onboardBasic(firstName: $firstName, lastName: $lastName, title: $title, orgSize: $orgSize) {
      status
    }
  }
`;

type OnboardBasicResponse = {
  signup?: {
    status: 'success' | 'error';
  };
};

type OnboardBasicParameters = {
  firstName: string;
  lastName: string;
  title: string;
  orgSize: string;
};

const StepsBar = () => (
  <nav aria-label="Progress">
    <ol className="flex items-center justify-center pb-10">
      <li className="relative pr-8 sm:pr-20">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="h-0.5 w-full bg-green-400" />
        </div>
        <div className="relative w-8 h-8 flex items-center justify-center bg-green-400 rounded-full">
          <svg
            className="w-5 h-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="sr-only">Step 1</span>
        </div>
      </li>

      <li className="relative pr-8 sm:pr-20">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="h-0.5 w-full bg-gray-200" />
        </div>
        <div
          className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-green-400 rounded-full"
          aria-current="step"
        >
          <span className="h-2.5 w-2.5 bg-green-400 rounded-full" aria-hidden="true" />
          <span className="sr-only">Step 2</span>
        </div>
      </li>

      <li className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="h-0.5 w-full bg-gray-200" />
        </div>
        <div className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full">
          <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" aria-hidden="true" />
          <span className="sr-only">Step 3</span>
        </div>
      </li>
    </ol>
  </nav>
);

const OnboardingBasics = () => {
  const [onboardBasic, { data: signupResponse, error, loading }] = useMutation<
    OnboardBasicResponse,
    OnboardBasicParameters
  >(ONBOARD_BASIC_MUTATION, {
    errorPolicy: 'all',
    onError: () => undefined
  });
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [orgSizeInput, setOrgSizeInput] = useState('');

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 sm:mx-auto sm:w-full sm:max-w-lg">
      <StepsBar />
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Let's meet a little bit more</h3>
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
                title: titleInput,
                orgSize: orgSizeInput
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  disabled={loading}
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Your role
                </label>
                <select
                  value={titleInput}
                  onChange={(evt) => setTitleInput(evt.target.value)}
                  id="title"
                  name="title"
                  autoComplete="organization-title"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={loading}
                >
                  <option />
                  <option value={'ca'}>IT Manager</option>
                  <option value={'mx'}>Human Resources</option>
                </select>
              </div>

              <div className="col-span-2">
                <label htmlFor="company_size" className="block text-sm font-medium text-gray-700">
                  Company size
                </label>
                <select
                  value={orgSizeInput}
                  onChange={(evt) => setOrgSizeInput(evt.target.value)}
                  id="org-size"
                  name="org_size"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  disabled={loading}
                >
                  <option />
                  <option value={1}>1 - 20 employees</option>
                  <option value={2}>21 - 100 employees</option>
                  <option value={3}>101 - 1000 employees</option>
                  <option value={5}>&gt; 1000 employees</option>
                </select>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
