"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import {
  trackAnalyticsEvent,
  type AnalyticsEventName,
  type AnalyticsParameters,
} from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: AnalyticsEventName;
  eventParameters?: AnalyticsParameters;
};

export default function TrackedLink({
  eventName,
  eventParameters,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackAnalyticsEvent(eventName, eventParameters);
        onClick?.(event);
      }}
    />
  );
}
