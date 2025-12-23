import { Flex, Spinner } from "@once-ui-system/core";

export default function Loading() {
  return (
    <Flex
      fillWidth
      fillHeight
      style={{ minHeight: "100vh" }}
      className="glass-panel"
      horizontal="center"
      align="center"
    >
      <div className="elegant-loader" />
    </Flex>
  );
}
