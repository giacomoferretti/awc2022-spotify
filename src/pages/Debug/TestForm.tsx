export const TestForm = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 lg:p-8">
      <form className="space-y-6" action="#">
        {/* onSubmit={handleSubmit(onSubmit)} */}
        <h5 className="text-xl font-medium text-gray-900">
          Sign in to {"Floorsquare Platform"}
        </h5>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900">
            Your email
          </label>
          <input
            type="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
            placeholder="name@company.com"
            // {...register("email", { required: true })}
          />
          {/* {errors.email && <span>This field is required</span>} */}
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900">
            Your password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
            // {...register("password", { required: true })}
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                aria-describedby="remember"
                type="checkbox"
                className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 text-orange-500 focus:ring-orange-300"
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
          className="w-full rounded-lg bg-orange-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300">
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
