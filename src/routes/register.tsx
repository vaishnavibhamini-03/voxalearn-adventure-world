import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageBackground } from "@/components/GameBackground";
import { FormInput } from "@/components/FormInput";
import { PixelButton } from "@/components/PixelButton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — VoxaLearn" },
      { name: "description", content: "Create your VoxaLearn account and begin the adventure." },
      { property: "og:title", content: "Create Account — VoxaLearn" },
      { property: "og:description", content: "Create your VoxaLearn account and begin the adventure." },
    ],
  }),
  component: RegisterPage,
});

type Field = "fullName" | "email" | "username" | "password" | "confirmPassword";
type Errors = Partial<Record<Field, string>>;

function scorePassword(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const STRENGTH = ["Too short", "Weak", "Fair", "Strong", "Excellent"];

function RegisterPage() {
  const [values, setValues] = useState<Record<Field, string>>({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const set = (key: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const score = scorePassword(values.password);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (values.fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(values.username))
      next.username = "3–20 characters, letters, numbers or underscores.";
    if (values.password.length < 8) next.password = "Use at least 8 characters.";
    if (values.confirmPassword !== values.password) next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setCreated(true);
    }, 800);
  }

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4.5rem)] items-center overflow-hidden py-14">
      <PageBackground />
      <div className="relative z-10 mx-auto w-full max-w-md px-4">
        <div className="mb-6 text-center">
          <h1 className="title-gradient font-pixel text-lg sm:text-2xl">Create Account</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Join VoxaLearn and start your learning adventure.
          </p>
        </div>

        {created ? (
          <div role="status" className="pixel-frame pixel-glow mb-6 flex items-start gap-3 bg-card/90 p-5">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
            <div className="min-w-0">
              <h2 className="font-pixel text-[11px] text-card-foreground">Account details ready</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your adventurer profile has been prepared. Head to the login page to continue.
              </p>
            </div>
          </div>
        ) : null}

        <form onSubmit={onSubmit} noValidate className="pixel-frame grid gap-5 bg-card/90 p-6 sm:p-8">
          <FormInput
            label="Full Name"
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={set("fullName")}
            error={errors.fullName}
            placeholder="Your name"
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            error={errors.email}
            placeholder="you@example.com"
          />
          <FormInput
            label="Username"
            name="username"
            autoComplete="username"
            value={values.username}
            onChange={set("username")}
            error={errors.username}
            placeholder="adventurer_01"
          />
          <div>
            <FormInput
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={set("password")}
              error={errors.password}
              placeholder="••••••••"
            />
            <div className="mt-3">
              <div className="flex gap-1" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-sm transition-colors",
                      i < score ? "bg-accent" : "bg-muted",
                    )}
                  />
                ))}
              </div>
              <p aria-live="polite" className="mt-1.5 text-xs text-muted-foreground">
                Password strength: {STRENGTH[score]}
              </p>
            </div>
          </div>
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={set("confirmPassword")}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />
          <PixelButton type="submit" variant="gold" size="lg" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </PixelButton>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-accent hover:underline">
              Login
            </Link>
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center font-pixel text-[10px] text-muted-foreground uppercase transition-colors hover:text-accent"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
