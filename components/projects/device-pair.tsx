"use client";

import { useState } from "react";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { useTranslations } from "next-intl";
import type { PhoneDevice, ProjectScreen } from "@/data/projects";
import { localize } from "@/i18n/localized";
import { getDirection, type Locale } from "@/i18n/config";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PhoneFrame } from "./phone-frame";

interface DevicePairProps {
  screens: ProjectScreen[];
  locale: Locale;
}

export function DevicePair({ screens, locale }: DevicePairProps) {
  const t = useTranslations("Projects");
  const [device, setDevice] = useState<PhoneDevice>("android");
  const home = screens[0];
  const equipment = screens[1];

  return (
    <DirectionProvider direction={getDirection(locale)}>
    <div className="flex min-w-0 flex-col items-center gap-8">
      <div className="device-pair hidden md:block" aria-label={t("devicePreview")}>
        <PhoneFrame src={equipment.dark} alt={localize(equipment.title, locale)} appearance="dark" device="iphone" className="device-pair-back" />
        <PhoneFrame src={home.light} alt={localize(home.title, locale)} device="android" priority className="device-pair-front" />
      </div>
      <div className="flex w-full flex-col items-center gap-6 md:hidden">
        <PhoneFrame src={home.light} alt={localize(home.title, locale)} device={device} priority className="w-[250px] max-w-full" />
        <ToggleGroup value={[device]} onValueChange={values => { if (values[0]) setDevice(values[0] as PhoneDevice); }} aria-label={t("deviceFrame")} className="project-options">
          <ToggleGroupItem value="android">Pixel 11 Pro</ToggleGroupItem>
          <ToggleGroupItem value="iphone">iPhone 18 Pro</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
    </DirectionProvider>
  );
}
