"use client";

import dynamic from "next/dynamic";
import { withAuth } from "@/hoc/withAuth";

const DashboardContainer = dynamic(
  () => import("@/containers/DashboardContainer").then((m) => ({ default: m.DashboardContainer })),
  { ssr: false, loading: () => <div className="flex min-h-screen items-center justify-center">Loading...</div> }
);

function DashboardPageComponent() {
  return <DashboardContainer />;
}

export const DashboardPage = withAuth(DashboardPageComponent);
