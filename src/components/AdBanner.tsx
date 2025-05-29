import React, { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  position: "top" | "side" | "bottom";
  scriptKey: string;
  width: number;
  height: number;
}

const AdBanner: React.FC<AdBannerProps> = ({
  position,
  scriptKey,
  width,
  height,
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !adRef.current) return;

    // Clear previous ad scripts if any
    adRef.current.innerHTML = "";

    // Create the global ad options script
    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.innerHTML = `
      atOptions = {
        key: '${scriptKey}',
        format: 'iframe',
        height: ${height},
        width: ${width},
        params: {}
      };
    `;

    // Create the external script tag to load the ad
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = `https://www.highperformanceformat.com/${scriptKey}/invoke.js`;
    invokeScript.async = true;

    // Append scripts to the ad container
    adRef.current.appendChild(optionsScript);
    adRef.current.appendChild(invokeScript);
  }, [isClient, scriptKey, width, height]);

  return (
    <div
      ref={adRef}
      className={`ad-banner ad-banner-${position}`}
      style={{ width: "100%", maxWidth: width, height }}
    />
  );
};

export default AdBanner;
