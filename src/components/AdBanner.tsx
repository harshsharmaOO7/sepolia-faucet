import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  position: 'top' | 'side' | 'bottom';
  script?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, script }) => {
  const adRef = useRef<HTMLDivElement>(null);

  let classes = "bg-card/70 backdrop-blur-sm border border-border/60 flex items-center justify-center overflow-hidden text-muted-foreground text-sm";

  switch (position) {
    case 'top':
      classes += " h-24 w-full rounded-lg mb-8";
      break;
    case 'side':
      classes += " h-96 w-full rounded-lg";
      break;
    case 'bottom':
      classes += " h-32 w-full rounded-lg mt-8";
      break;
    default:
      classes += " h-24 w-full rounded-lg";
  }

  // Inject script dynamically
  useEffect(() => {
    if (script && adRef.current) {
      adRef.current.innerHTML = script;

      const scripts = adRef.current.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        const oldScript = scripts[i];
        const newScript = document.createElement("script");

        Array.from(oldScript.attributes).forEach(attr =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.text = oldScript.text;

        oldScript.parentNode?.replaceChild(newScript, oldScript);
      }
    }
  }, [script]);

  return (
    <div className={classes}>
      <div ref={adRef} className="w-full h-full text-center p-4">
        {!script && (
          <>
            <p>Advertisement</p>
            <p className="text-xs mt-1">Your ad could be here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdBanner;
