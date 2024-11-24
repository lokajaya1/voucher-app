import AuthForm from "@/components/forms/AuthForm";

export default function LoginPage() {
  return (
    <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Login to Your Account
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Access your vouchers and manage your claims efficiently.
        </p>
      </div>
      <AuthForm mode="login" />
    </div>
  );
}
