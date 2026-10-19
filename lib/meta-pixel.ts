export type MetaPixelEvent = "PageView" | "ViewContent" | "Contact" | "Lead";

type MetaPixelFunction = {
  (command: "track", eventName: MetaPixelEvent, parameters?: Record<string, unknown>): void;
  (command: "init", pixelId: string): void;
  (command: "consent", status: "grant" | "revoke"): void;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
  }
}

export function trackMetaPixelEvent(
  eventName: MetaPixelEvent,
  parameters?: Record<string, unknown>,
) {
  if (typeof window !== "undefined") {
    window.fbq?.("track", eventName, parameters);
  }
}
