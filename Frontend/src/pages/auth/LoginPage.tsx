import { useState } from "react";

import { useLogin } from "@/features/auth/api/AuthMutations";

import { LockIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const { mutate: loginMutation, isPending, isError, error } = useLogin();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="h-3/5 w-xl flex flex-col gap-4 items-center justify-center bg-bg3 rounded-2xl p-8 [box-shadow:0_0_40px_8px_var(--success-border)]"
      >
        <h1 className="text-text text-2xl tracking-tight mb-2">Polaris</h1>

        <label className="flex gap-2 w-full border border-border hover:border-border-hover focus-within:border-ring text-text p-2 rounded-xl transition-colors">
          <UserIcon className="text-subtle shrink-0" />
          <input
            className="bg-transparent outline-none w-full text-sm placeholder:text-subtle"
            placeholder="Username or Email"
            name="usernameOrEmail"
            type="text"
            onChange={handleInputChange}
            value={formData.usernameOrEmail}
          />
        </label>

        <label className="flex gap-2 w-full border border-border hover:border-border-hover focus-within:border-ring text-text p-2 rounded-xl transition-colors">
          <LockIcon className="text-subtle shrink-0" />
          <input
            className="bg-transparent outline-none w-full text-sm placeholder:text-subtle"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleInputChange}
            value={formData.password}
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-accent-purple hover:bg-accent-purple-hover text-text text-sm py-2 rounded-xl transition-colors disabled:opacity-50"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <p
          className={`text-destructive text-sm text-center transition-opacity ${isError ? "opacity-100" : "opacity-0"}`}
        >
          {error?.message ?? "\u00A0"}
        </p>
        <p className="text-subtle text-sm">Don't have an account?</p>
        <Link
          to="/signup"
          className="text-accent-purple hover:text-accent-purple-hover transition-colors"
        >
          Sign up
        </Link>
      </form>
      <a
        href="https://unsplash.com/@jeremybishop"
        className="absolute right-0 bottom-0 text-subtle text-md p-2"
      >
        Photo by Jeremy Bishop
      </a>
    </div>
  );
};
export default LoginPage;
