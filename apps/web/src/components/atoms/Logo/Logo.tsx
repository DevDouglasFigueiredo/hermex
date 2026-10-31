/* eslint-disable @next/next/no-img-element */
export type LogoProps = { variant?: "default" | "inverse"; className?: string };
export function Logo({ variant = "default", className = "" }: LogoProps) {
  const inverse = variant === "inverse";
  return (
    <span
      role="img"
      aria-label="Hermex locadora"
      className={`relative inline-block h-[60.472px] w-[180px] shrink-0 ${className}`}
    >
      <span className="absolute top-[9.94%] left-[7.95%]">
        <img
          src={`/design/home/${inverse ? "imgGroup2" : "imgGroup"}.svg`}
          alt=""
        />
      </span>
      <span className="absolute top-[65.71%] left-[48.32%]">
        <img
          src={`/design/home/${inverse ? "imgGroup3" : "imgGroup1"}.svg`}
          alt=""
        />
      </span>
    </span>
  );
}
