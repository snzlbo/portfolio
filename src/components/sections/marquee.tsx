import { site } from "@/content/site"

/** Scrolling band of the roles being applied for. Pure CSS; pauses on hover. */
export function Marquee() {
  const group = (hidden: boolean, key: number) => (
    <div key={key} aria-hidden={hidden || undefined} className="flex items-center gap-10 pr-10">
      {site.roles.map((role) => (
        <span key={role} className="flex items-center gap-10">
          {role}
          <span aria-hidden="true">✳</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      aria-label={`Roles: ${site.roles.join(", ")}`}
      className="group relative z-10 overflow-hidden bg-brand py-5 text-background"
    >
      <div className="flex w-max animate-marquee font-display text-[clamp(15px,1.6vw,22px)] font-bold whitespace-nowrap uppercase group-hover:[animation-play-state:paused]">
        {[0, 1, 2, 3].map((i) => group(i > 0, i))}
      </div>
    </div>
  )
}
