import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClass =
  "inline-flex items-center justify-center gap-2 min-h-[44px] px-5 sm:px-6 md:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f19] touch-manipulation";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.4)]",
  secondary:
    "border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10",
  ghost: "text-cyan-400 hover:bg-white/5",
};

type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & (
  | { href: string; type?: never; onClick?: never }
  | { href?: never; type?: "button" | "submit"; onClick?: () => void }
);

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `${baseClass} ${variants[variant]} ${className}`.trim();

  if ("href" in rest && rest.href) {
    const isExternal = rest.href.startsWith("http");
    return isExternal ? (
      <a
        href={rest.href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    ) : (
      <Link href={rest.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={rest.type ?? "button"}
      onClick={rest.onClick}
      className={classes}
      disabled={rest.disabled}
    >
      {children}
    </button>
  );
}
