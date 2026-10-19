"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { trackMetaPixelEvent } from "@/lib/meta-pixel";
import styles from "./MetaPixel.module.scss";

const consentStorageKey = "landville-meta-pixel-consent";
const openPreferencesAttribute = "data-open-meta-preferences";

type ConsentChoice = "unknown" | "granted" | "denied";

export default function MetaPixel() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentChoice>("unknown");
  const [pixelReady, setPixelReady] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [consentError, setConsentError] = useState("");
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    try {
      const savedChoice = window.localStorage.getItem(consentStorageKey);
      if (savedChoice === "granted" || savedChoice === "denied") {
        setConsent(savedChoice);
      } else {
        setShowPrompt(true);
      }
    } catch {
      setShowPrompt(true);
      setConsentError("Your browser could not save this choice. Tracking will remain off.");
    }
  }, []);

  useEffect(() => {
    if (consent !== "granted" || !pixelReady || lastTrackedPath.current === pathname) return;
    if (lastTrackedPath.current !== null) {
      trackMetaPixelEvent("PageView");
    }
    lastTrackedPath.current = pathname;
  }, [consent, pathname, pixelReady]);

  useEffect(() => {
    function openPreferences(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(`[${openPreferencesAttribute}]`)) {
        setShowPrompt(true);
      }
    }

    document.addEventListener("click", openPreferences);
    return () => document.removeEventListener("click", openPreferences);
  }, []);

  useEffect(() => {
    function markPixelReady() {
      lastTrackedPath.current = pathname;
      setPixelReady(true);
    }

    window.addEventListener("landville-meta-pixel-ready", markPixelReady);
    return () => window.removeEventListener("landville-meta-pixel-ready", markPixelReady);
  }, [pathname]);

  useEffect(() => {
    if (consent !== "granted" || !pixelReady) return;

    function trackContactClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      const isContactAction =
        url.protocol === "mailto:" ||
        url.protocol === "tel:" ||
        url.hostname === "wa.me" ||
        url.hostname.endsWith(".whatsapp.com") ||
        url.pathname === "/contact";

      if (isContactAction) trackMetaPixelEvent("Contact");
    }

    document.addEventListener("click", trackContactClick);
    return () => document.removeEventListener("click", trackContactClick);
  }, [consent, pixelReady]);

  function chooseConsent(choice: "granted" | "denied") {
    try {
      window.localStorage.setItem(consentStorageKey, choice);
      setConsentError("");
      if (choice === "denied" && pixelReady) {
        window.fbq?.("consent", "revoke");
      } else if (choice === "granted" && pixelReady) {
        window.fbq?.("consent", "grant");
      }
      setConsent(choice);
      setShowPrompt(false);
    } catch {
      setConsentError("Your browser could not save this choice. Tracking will remain off.");
    }
  }

  return (
    <>
      {consent === "granted" && (
        <Script
          id="landville-meta-pixel"
          strategy="afterInteractive"
          onReady={() => {
            lastTrackedPath.current = pathname;
            setPixelReady(true);
          }}
        >
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2593124127790147');
fbq('track', 'PageView');
window.dispatchEvent(new Event('landville-meta-pixel-ready'));`}
        </Script>
      )}
      {showPrompt && (
        <aside className={styles.consent} aria-label="Meta Pixel privacy choices">
          <div className={styles.consentCopy}>
            <strong>Optional marketing cookies</strong>
            <p>
              If you allow them, Meta Pixel measures visits and contact activity to help
              us understand our advertising. You can change this choice at any time.
            </p>
            {consentError && <p className={styles.error} role="alert">{consentError}</p>}
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={() => chooseConsent("denied")}>Reject</button>
            <button type="button" onClick={() => chooseConsent("granted")}>Allow</button>
          </div>
        </aside>
      )}
    </>
  );
}
