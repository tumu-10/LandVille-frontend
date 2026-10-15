"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "@/styles/Preloader.module.scss";

export default function Preloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
      setInitialLoad(false);
    }, initialLoad ? 3500 : 2200);
    return () => window.clearTimeout(timer);
  }, [initialLoad, visible]);

  useEffect(() => {
    if (
      (pathname === "/" || pathname === "/services") &&
      previousPath.current !== pathname
    ) {
      setVisible(true);
    }
    previousPath.current = pathname;
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className={`${styles.preloader} ${initialLoad ? styles.initialPreloader : ""}`} role="status" aria-label="Loading LandVille Ventures">
      <div className={styles.topline}>
        <span>LANDVILLE VENTURES</span>
        <span>KAMPALA&nbsp; / &nbsp;UGANDA</span>
      </div>
      <div className={styles.centerpiece}>
        <div className={styles.sitePlan} aria-hidden="true">
          <span className={styles.planGrid} />
          <span className={`${styles.orbit} ${styles.orbitOuter}`} />
          <span className={`${styles.orbit} ${styles.orbitInner}`} />
          <span className={styles.axisHorizontal} />
          <span className={styles.axisVertical} />
          <svg className={styles.architecture} viewBox="0 0 520 310" fill="none">
            <path className={styles.drawLine} d="M76 231h368M111 231V148l77-44v127m0-123 83 44v79m0-134 97 54v80M137 231v-54h31v54m116 0v-68h31v68m59 0v-38h35v38M188 104l83-47 97 48" />
            <path className={styles.drawLineSoft} d="M57 248h406M132 263h254M170 277h180M216 291h91M188 104V74h83V57m0 0V38h97v67m-97-48h97m-97 24h97M111 148l77 43 83-47 97 54" />
            <circle className={styles.planPoint} cx="271" cy="57" r="4" />
            <circle className={styles.planPoint} cx="188" cy="104" r="4" />
          </svg>
          <div className={styles.brandMark}>
            <Image src="/logo.png" alt="LandVille Ventures" width={270} height={110} priority />
          </div>
          <span className={styles.planLabel}>SITE&nbsp; 00°23&apos;N&nbsp; 32°35&apos;E</span>
          <span className={styles.planCorner} />
        </div>
        <div className={styles.message}>
          <span className={styles.kicker}>A NEW PERSPECTIVE ON PROPERTY</span>
          <p>Places shaped by <em>possibility.</em></p>
        </div>
      </div>
      <div className={styles.bottomline}>
        <span>REAL ESTATE&nbsp; · &nbsp;DEVELOPMENT&nbsp; · &nbsp;INVESTMENT</span>
        <span className={styles.loading}><i /> PREPARING YOUR NEXT CHAPTER</span>
      </div>
      <span className={styles.progress} aria-hidden="true" />
    </div>
  );
}
