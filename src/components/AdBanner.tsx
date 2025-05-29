import React, { useEffect, useRef } from "react";

interface AdBannerProps {
  position: "top" | "side" | "bottom";
  scriptKey: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, scriptKey }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    adRef.current.innerHTML = "";

    const containerWidth = adRef.current.offsetWidth;
    const isMobile = window.innerWidth < 768;
    const height = isMobile ? 250 : 300;

    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.innerHTML =
      "atOptions = {" +
      "key: '" + scriptKey + "'," +
      "format: 'iframe'," +
      "height: " + height + "," +
      "width: " + containerWidth + "," +
      "params: {}" +
      "};";

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = 'https://www.highperformanceformat.com/' + scriptKey + '/invoke.js';
    invokeScript.async = true;

    adRef.current.appendChild(optionsScript);
    adRef.current.appendChild(invokeScript);
  }, [scriptKey]);

  return (
    <div
      ref={adRef}
      className={`ad-banner ad-banner-${position} w-full`}
      style={{ height: "auto", minHeight: 250 }}
    />
  );
};

export default AdBanner;
