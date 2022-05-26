export const TestForm = () => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8">
      <form className="space-y-6" action="#">
        {/* onSubmit={handleSubmit(onSubmit)} */}
        <h5 className="text-xl font-medium text-gray-900">
          Sign in to {"Floorsquare Platform"}
        </h5>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900">
            Your email
          </label>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="name@company.com"
            // {...register("email", { required: true })}
          />
          {/* {errors.email && <span>This field is required</span>} */}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900">
            Your password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            // {...register("password", { required: true })}
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 text-orange-500 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-orange-300"
                // {...register("remember")}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="remember" className="font-medium text-gray-900">
                Remember me
              </label>
            </div>
          </div>
          <a
            href="#"
            className="ml-auto text-sm text-orange-700 hover:underline">
            Lost Password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Login to your account
        </button>
        <div className="text-sm font-medium text-gray-500">
          Not registered?{" "}
          <a href="#" className="text-orange-700 hover:underline">
            Create account
          </a>
        </div>
      </form>
    </div>
  );
};
