import type { Facility } from "../data/facilities";
import { FacilityLogo } from "./FacilityLogo";
import { SmartImage } from "./SmartImage";

export function FacilityVisual({
  facility,
  className = "",
  eager = false,
}: {
  facility: Facility;
  className?: string;
  eager?: boolean;
}) {
  if (facility.logoOnly && facility.logo) {
    return (
      <div
        className={`flex items-center justify-center border border-ink/10 bg-white p-10 ${className}`}
      >
        <FacilityLogo
          src={facility.logo}
          alt={facility.logoAlt ?? `${facility.name} logo`}
          eager={eager}
          className="max-h-40 w-full object-contain"
        />
      </div>
    );
  }
  return (
    <SmartImage
      src={facility.image}
      alt={facility.imageAlt}
      className={className}
      eager={eager}
    />
  );
}
