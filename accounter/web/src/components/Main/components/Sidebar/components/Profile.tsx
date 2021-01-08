

const Profile = ({ desktop }: {desktop?: boolean}) => (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
    <a href="#" className={`flex-shrink-0 group block ${desktop ? "w-full" : ""}`}>
      <div className="flex items-center">
        <div>
          <img
            className={`inline-block rounded-full ${desktop ? "h-9 w-9" : "h-10 w-10 "}`}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className={`${desktop ? "text-sm" : "text-base"} font-medium text-gray-700 group-hover:text-gray-900`}>
            Tom Cook
          </p>
          <p className={`${desktop ? "text-xs" : "text-sm"} font-medium text-gray-500 group-hover:text-gray-700`}>
            View profile
          </p>
        </div>
      </div>
    </a>
  </div>
  )

  export default Profile