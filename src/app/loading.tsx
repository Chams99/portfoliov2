import { DelayedLoading } from "@/components/skeleton/DelayedLoading";

export default function Loading() {
  return <DelayedLoading type="home" delay={800} useModernOverlay={true} />;
}
