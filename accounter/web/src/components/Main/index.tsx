import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Services from "./components/Services";
import Users from "./components/Users";
import SideBar from "./components/Sidebar";
import Content from "./components/Content";
import Directory from "./components/Directory";

const TO_DETERMINE = () => (
  <div className="lg:hidden">
    <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
      <div>
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-pink-500.svg"
          alt="Workflow"
        />
      </div>
      <div>
        <button
          type="button"
          className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
        >
          <span className="sr-only">Open sidebar</span>
          {/* Heroicon name: menu */}
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

export default function Main() {
  return (
    <div>
      <div className="h-screen flex overflow-hidden bg-white">
        <SideBar />
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <TO_DETERMINE />
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <Content />
            <Directory />
          </div>
        </div>
      </div>
    </div>
  );
}
