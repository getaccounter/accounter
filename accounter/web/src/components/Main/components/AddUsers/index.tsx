import { createFragmentContainer, commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { AddUsers_organization } from "./__generated__/AddUsers_organization.graphql";
import { useState } from "react";
import { useEnvironment } from "../../../../contexts/relay";
import { useHistory } from "react-router-dom";
import { AddUsersMutation } from "./__generated__/AddUsersMutation.graphql";
import { ConnectionHandler } from "relay-runtime";

const mutation = graphql`
  mutation AddUsersMutation(
    $email: String!
    $firstName: String!
    $lastName: String!
    $title: String
    $department: ID
  ) {
    createUser(
      input: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        title: $title
        department: $department
      }
    ) {
      profile {
        id
        email
        firstName
        lastName
        title
        department {
          name
        }
      }
    }
  }
`;

type DepartmentEdge = NonNullable<
  AddUsers_organization["departments"]["edges"][0]
>;
type DepartmentNode = NonNullable<DepartmentEdge["node"]>;

const NO_DEPARTMENT = "NO_DEPARTMENT";

type Props = {
  organization: AddUsers_organization;
};

const AddUsers = ({ organization }: Props) => {
  const environment = useEnvironment();
  const history = useHistory();
  const [emailInput, setEmailInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [departmentInput, setDepartmentInput] = useState<DepartmentNode["id"]>(
    NO_DEPARTMENT
  );
  return (
    <main className="flex-1 overflow-y-auto focus:outline-none">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={(e) => {
            e.preventDefault();

            const variables = {
              email: emailInput,
              firstName: firstNameInput,
              lastName: lastNameInput,
              title: titleInput.length > 0 ? titleInput : undefined,
              department:
                departmentInput !== NO_DEPARTMENT ? departmentInput : undefined,
            };
            commitMutation<AddUsersMutation>(environment, {
              mutation,
              variables,
              updater: (store) => {
                // TODO invalidate the connection instead
                // https://relay.dev/docs/en/relay-store.html#invalidaterecord-void
                const payload = store.getRootField("createUser");
                const newProfile = payload.getLinkedRecord("profile");
                const organizationRecord = store.get(organization.id)!;
                const connection = ConnectionHandler.getConnection(
                  organizationRecord,
                  "Users_profiles"
                )!;
                const newEdge = ConnectionHandler.createEdge(
                  store,
                  connection,
                  newProfile,
                  "ProfileNodeEdge"
                );
                ConnectionHandler.insertEdgeAfter(connection, newEdge);
                organizationRecord.invalidateRecord();
                connection.invalidateRecord();
                const profiles = organizationRecord.getLinkedRecord("profiles");
                profiles?.invalidateRecord();
              },
              onCompleted: (response, errors) => {
                if (errors) {
                  console.error(errors);
                } else {
                  history.push(
                    `/users/details/${response.createUser?.profile.id}`
                  );
                }
              },
              onError: (err) => console.error(err),
            });
          }}
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
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
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
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
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
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
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Department
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      value={departmentInput}
                      onChange={(inpput) =>
                        setDepartmentInput(inpput.target.value)
                      }
                      id="department"
                      name="department"
                      autoComplete="department"
                      className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value={NO_DEPARTMENT}>No department</option>
                      {organization.departments.edges.map((departmentEdge) => (
                        <option value={departmentEdge!.node!.id}>
                          {departmentEdge!.node!.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default createFragmentContainer(AddUsers, {
  organization: graphql`
    fragment AddUsers_organization on OrganizationNode {
      id
      departments {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `,
});
