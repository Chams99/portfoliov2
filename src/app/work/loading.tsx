import { DelayedLoading } from "@/components/skeleton/DelayedLoading";

export default function Loading() {
  return <DelayedLoading type="work" delay={800} useModernOverlay={true} />;
}
