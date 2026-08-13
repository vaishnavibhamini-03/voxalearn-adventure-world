import { Link } from "@tanstack/react-router";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { pixelButtonClass } from "./PixelButton";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/features", label: "Features" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:flex lg:justify-between"
      >
        <Link to="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <Sparkles className="size-5 shrink-0 text-accent" aria-hidden />
          <span className="truncate font-pixel text-sm text-foreground sm:text-base">VoxaLearn</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-accent border-accent" }}
                inactiveProps={{ className: "text-muted-foreground border-transparent" }}
                className="inline-flex min-h-11 items-center rounded-md border-b-2 px-3 text-sm font-medium transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/login" className={pixelButtonClass("outline", "sm")}>
            Login
          </Link>
          <Link to="/register" className={pixelButtonClass("gold", "sm")}>
            Register
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border-2 border-border bg-surface/70 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t-2 border-border bg-background/95 px-4 pb-5 lg:hidden">
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-accent" }}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-border/60 text-base font-medium text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-2">
            <Link to="/login" onClick={() => setOpen(false)} className={pixelButtonClass("outline", "md")}>
              Login
            </Link>
            <Link to="/register" onClick={() => setOpen(false)} className={pixelButtonClass("gold", "md")}>
              Register
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
