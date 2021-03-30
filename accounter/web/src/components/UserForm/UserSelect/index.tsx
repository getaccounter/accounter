import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { UserSelect_profileList } from "./__generated__/UserSelect_profileList.graphql";

type Props = {
  profileList: UserSelect_profileList;
  value: UserSelect_profileList[0]["id"] | null
  onChange: (id: UserSelect_profileList[0]["id"] | null) => void
};

const NONE = {
  id: null,
  firstName: "-",
  lastName: null,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
};

const UserSelect = ({ profileList, value, onChange }: Props) => {
  const sortedProfiles = [NONE, ...profileList].sort((a, b) => {
    const aName = a.lastName ?? a.firstName!;
    const bName = b.lastName ?? b.firstName!;
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });

  const selectedPerson = sortedProfiles.find(p => p.id === value)!

  return (
    <Listbox value={selectedPerson} onChange={p => onChange(p.id)}>
      {({ open }) => {
        const selectedFullName = `${selectedPerson.firstName} ${
          selectedPerson.lastName ?? ""
        }`;
        return (
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <img
                  src={selectedPerson.image}
                  alt={selectedFullName}
                  className="flex-shrink-0 h-6 w-6 rounded-full"
                />
                <span className="ml-3 block truncate">{selectedFullName}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
            >
              <Listbox.Options className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {sortedProfiles.map((profile) => (
                  <Listbox.Option
                    as={Fragment}
                    key={profile.id}
                    value={profile}
                  >
                    {({ active, selected }) => (
                      <li
                        className={`${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        } cursor-default select-none relative py-2 pl-3 pr-9`}
                      >
                        <div className="flex items-center">
                          <img
                            src={profile.image}
                            alt=""
                            className="flex-shrink-0 h-6 w-6 rounded-full"
                          />
                          <span
                            className={`ml-3 block ${
                              selected ? "font-semibold" : "font-normal"
                            } truncate`}
                          >
                            {profile.firstName} {profile.lastName}
                          </span>
                        </div>
                        {selected && (
                          <span
                            className={`${
                              active ? "text-white" : "text-indigo-600"
                            } absolute inset-y-0 right-0 flex items-center pr-4`}
                          >
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        )}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        );
      }}
    </Listbox>
  );
};

export default createFragmentContainer(UserSelect, {
  profileList: graphql`
    fragment UserSelect_profileList on ProfileNode @relay(plural: true) {
      id
      firstName
      lastName
      image
    }
  `,
});
