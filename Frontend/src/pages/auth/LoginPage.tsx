import { useState } from "react";

import { useLogin } from "@/features/auth/api/AuthMutations";

import { getErrorMessage } from "@/lib/axios";
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
    // Destructure the formData object to allow for trim
    // and avoid needing a state update
    loginMutation({
      usernameOrEmail: formData.usernameOrEmail.trim(),
      password: formData.password,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-full w-full flex flex-col items-center pt-8 relative">
      <form
        onSubmit={handleSubmit}
        className="min-h-3/5 md:w-xl w-3/4 flex flex-col gap-4 items-center justify-center bg-bg3 rounded-2xl p-8 [box-shadow:0_0_40px_8px_var(--success-border)]"
      >
        <img
          src="/favicon.svg"
          className="w-30 md:w-50 aspect-square rounded-xl"
          alt="Polaris Logo"
        />
        <h1 className="text-text text-4xl md:text-6xl tracking-tight mb-2">
          {import.meta.env.VITE_APP_TITLE}
        </h1>

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
          {error ? getErrorMessage(error) : "\u00A0"}
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
        className="absolute right-0 bottom-0 text-subtle text-base p-2"
      >
        Photo by Jeremy Bishop
      </a>
    </div>
  );
};
export default LoginPage;
