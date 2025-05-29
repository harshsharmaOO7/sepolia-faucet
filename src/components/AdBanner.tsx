import React, { useEffect, useRef } from "react";

interface AdBannerProps {
  position: "top" | "side" | "bottom";
  scriptKey: string;
  width: number;
  height: number;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, scriptKey, width, height }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    adRef.current.innerHTML = "";

    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.innerHTML =
      "atOptions = {" +
      "key: '" + scriptKey + "'," +
      "format: 'iframe'," +
      "height: " + height + "," +
      "width: " + width + "," +
      "params: {}" +
      "};";

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = 'https://www.highperformanceformat.com/' + scriptKey + '/invoke.js';
    invokeScript.async = true;

    adRef.current.appendChild(optionsScript);
    adRef.current.appendChild(invokeScript);
  }, [scriptKey, width, height]);

  return (
    <div
      ref={adRef}
      className={`ad-banner ad-banner-${position}`}
      style={{ width, height }}
    />
  );
};

export default AdBanner;
