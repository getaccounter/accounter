import { Link } from 'react-router-dom';

const OnboardingWelcome = () => {
  return (
    <div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-blue-800 font-semibold tracking-wide uppercase">
              Welcome to Accounter
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Thanks for signing up
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            We are currently in <b>beta</b> and we have added you to a <b>waiting list</b>. We give access to some new
            users every few weeks, so we will keep you posted when you will be able to try Accounter.
          </p>
          <p className="mt-8 text-xl text-gray-500 leading-8">Thanks for your patient.</p>
          <div className="flex justify-center mt-10">
            <Link
              to="/logout"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
            >
              <button type="button">Logout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
