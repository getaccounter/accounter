import React from 'react';

const OnboardingWelcome = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 sm:mx-auto sm:w-full">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              Welcome to Accounter
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Thanks for signing up
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            We are currently in <b>beta</b> and we have added you to a <b>waiting list</b>. We give access to some new users
            every few weeks, so we will keep you posted when you will be able to try Accounter.
          </p>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            Thanks for your patient.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
