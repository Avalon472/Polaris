import { useSignup } from "@/features/auth/mutations/AuthMutations";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const { mutate: signup, isPending, isError, error } = useSignup();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError(null); // clear on any change
  };

  const validate = (): string | null => {
    if (formData.username.length < 3)
      return "Username must be at least 3 characters";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email format";
    if (formData.password.length < 8)
      return "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";
    return null;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setValidationError(err);
      return;
    }
    signup({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  const displayError = validationError ?? (isError ? error?.message : null);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-xl flex flex-col gap-4 items-center justify-center bg-bg3 rounded-2xl p-8 [box-shadow:0_0_40px_8px_var(--success-border)]"
      >
        <h1 className="text-text text-2xl tracking-tight mb-2">Polaris</h1>
        <p className="text-subtle text-sm -mt-4">Create your account</p>
        <label className="flex gap-2 w-full border border-border hover:border-border-hover focus-within:border-ring text-text p-2 rounded-xl transition-colors">
          <UserIcon className="text-subtle shrink-0" />
          <input
            className="bg-transparent outline-none w-full text-sm placeholder:text-subtle"
            placeholder="Username"
            name="username"
            type="text"
            onChange={handleInputChange}
            value={formData.username}
          />
        </label>
        <label className="flex gap-2 w-full border border-border hover:border-border-hover focus-within:border-ring text-text p-2 rounded-xl transition-colors">
          <MailIcon className="text-subtle shrink-0" />
          <input
            className="bg-transparent outline-none w-full text-sm placeholder:text-subtle"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleInputChange}
            value={formData.email}
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
        <label className="flex gap-2 w-full border border-border hover:border-border-hover focus-within:border-ring text-text p-2 rounded-xl transition-colors">
          <LockIcon className="text-subtle shrink-0" />
          <input
            className="bg-transparent outline-none w-full text-sm placeholder:text-subtle"
            placeholder="Confirm password"
            name="confirmPassword"
            type="password"
            onChange={handleInputChange}
            value={formData.confirmPassword}
          />
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-accent-purple hover:bg-accent-purple-hover text-text text-sm py-2 rounded-xl transition-colors disabled:opacity-50"
        >
          {isPending ? "Creating account..." : "Sign up"}
        </button>
        <p
          className={`text-destructive text-sm text-center transition-opacity ${displayError ? "opacity-100" : "opacity-0"}`}
        >
          {displayError ?? "\u00A0"}
        </p>
        <p className="text-subtle text-sm"></p>
        Already have an account?
        <Link
          to="/login"
          className="text-accent-purple hover:text-accent-purple-hover transition-colors"
        >
          Log in
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

export default SignupPage;
