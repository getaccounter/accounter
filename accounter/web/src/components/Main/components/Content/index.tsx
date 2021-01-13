import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Mail, Phone } from "../../../icons/solid";

type BreadcrumbProps = {
  title: ReactNode;
};
const Breadcrumb = ({ title }: BreadcrumbProps) => {
  return (
    <nav
      className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
      aria-label="Breadcrumb"
    >
      <Link
        to="/integrations"
        className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
      >
        <ChevronLeft className="-ml-2 h-5 w-5 text-gray-400" />
        <span>{title}</span>
      </Link>
    </nav>
  );
};

const Header = () => {
  return (
    <div>
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt=""
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                Ricardo Cooper
              </h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <Mail className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                <span>Message</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <Phone className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                <span>Call</span>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            Ricardo Cooper
          </h1>
        </div>
      </div>
    </div>
  );
};

const Tabs = () => {
  return (
    <div className="mt-6 sm:mt-2 2xl:mt-5">
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {/* Current: "border-pink-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className="border-pink-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              aria-current="page"
            >
              Profile
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Calendar
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Recognition
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

const Description = (props: {
  long?: boolean;
  term: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className={`sm:col-span-${props.long ? 2 : 1}`}>
      <dt className="text-sm font-medium text-gray-500">{props.term}</dt>
      <dd
        className={`mt-1 text-sm text-gray-900 ${props.long && "max-w-prose"}`}
      >
        {props.children}
      </dd>
    </div>
  );
};

const DescriptionList = () => {
  return (
    <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <Description term="Phone">(555) 123-4567</Description>
        <Description term="Email">ricardocooper@example.com</Description>
        <Description term="Title">Senior Front-End Developer</Description>
        <Description term="Team">Product Development</Description>
        <Description term="Location">San Francisco</Description>
        <Description term="Sits">Oasis, 4th floor</Description>
        <Description term="Salary">$145,000</Description>
        <Description term="Birthday">June 8, 1990</Description>
        <Description long term="About">
          <p>
            Tincidunt quam neque in cursus viverra orci, dapibus nec tristique.
            Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus
            congue arcu aenean posuere aliquam.
          </p>
          <p className="mt-5">
            Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea
            rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus
            vitae. Scelerisque fermentum, cursus felis dui suspendisse velit
            pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan
            vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.
          </p>
        </Description>
      </dl>
    </div>
  );
};

const TeamMember = () => {
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="flex-1 min-w-0">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">Leslie Alexander</p>
          <p className="text-sm text-gray-500 truncate">Co-Founder / CEO</p>
        </a>
      </div>
    </div>
  );
};

const TeamMemberList = () => {
  return (
    <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
      <h2 className="text-sm font-medium text-gray-500">Team members</h2>
      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TeamMember />
        <TeamMember />
        <TeamMember />
        <TeamMember />
      </div>
    </div>
  );
};

type Props = {
  title: ReactNode;
};

const Content = ({ title }: Props) => (
  <>
    <Breadcrumb title={title} />
    <article>
      <Header />
      <Tabs />
      <DescriptionList />
      <TeamMemberList />
    </article>
  </>
);

export default Content;
