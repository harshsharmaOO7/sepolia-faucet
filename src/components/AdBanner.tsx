import React, { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  position: "top" | "side" | "bottom";
  scriptKey: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, scriptKey }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !adRef.current) return;

    adRef.current.innerHTML = "";

    const width = adRef.current.offsetWidth;
    const isMobile = window.innerWidth < 768;
    const height = isMobile ? 50 : 90;

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

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = \`https://www.highperformanceformat.com/${scriptKey}/invoke.js\`;
    invokeScript.async = true;

    adRef.current.appendChild(optionsScript);
    adRef.current.appendChild(invokeScript);
  }, [isClient, scriptKey]);

  return (
    <div
      ref={adRef}
      className={\`ad-banner ad-banner-\${position} w-full\`}
      style={{ minHeight: 50 }}
    />
  );
};

export default AdBanner;
