import AuthForm from "@/components/forms/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold text-center text-gray-900 sm:text-5xl">
            Create an Account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us to access and manage your vouchers seamlessly.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <AuthForm mode="register" />
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-gray-900 hover:text-gray-600"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
