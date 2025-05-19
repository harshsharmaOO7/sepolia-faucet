import React, { useEffect, useRef } from "react";

type AdBannerProps = {
  position: "top" | "side" | "bottom";
  scriptKey: string;
  width: number;
  height: number;
};

const AdBanner: React.FC<AdBannerProps> = ({ position, scriptKey, width, height }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const atOptionsScript = document.createElement("script");
    atOptionsScript.type = "text/javascript";
    atOptionsScript.innerHTML = `
      atOptions = {
        'key' : '${scriptKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;
    containerRef.current.appendChild(atOptionsScript);

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = \`//www.highperformanceformat.com/${scriptKey}/invoke.js\`;
    invokeScript.async = true;
    containerRef.current.appendChild(invokeScript);
  }, [scriptKey, width, height]);

  return (
    <div
      ref={containerRef}
      className={`ad-banner ad-banner-${position}`}
      style={{ width, height, margin: "0 auto" }}
    />
  );
};

export default AdBanner;
