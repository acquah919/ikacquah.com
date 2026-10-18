import Image from "next/image";
import type { ReactNode } from "react";
import { Android } from "@/components/ui/android";
import { Iphone } from "@/components/ui/iphone";
import type { AppAppearance, PhoneDevice } from "@/data/projects";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  src: string;
  alt: string;
  device?: PhoneDevice;
  appearance?: AppAppearance;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
}

export function PhoneFrame({ src, alt, device = "android", appearance = "light", priority = false, className, children }: PhoneFrameProps) {
  const content = (
    <div className="phone-screen" data-appearance={appearance} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <div className="phone-screen-content" style={{ position: "absolute", top: "8%", left: 0, width: "100%", height: "92%" }}>
        {children ?? <Image src={src} alt={alt} fill sizes="(max-width: 767px) 280px, 320px" priority={priority} className="object-contain object-top" />}
      </div>
    </div>
  );

  return (
    <div className={cn("phone-frame", className)} data-device={device} data-model={device === "iphone" ? "iPhone 18 Pro" : "Pixel 11 Pro"}>
      {device === "iphone" ? <Iphone>{content}</Iphone> : <Android width={380} height={830} className="block size-full">{content}</Android>}
    </div>
  );
}
