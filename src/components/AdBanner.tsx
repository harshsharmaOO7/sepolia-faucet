
import React from 'react';

interface AdBannerProps {
  position: 'top' | 'side' | 'bottom';
}

const AdBanner: React.FC<AdBannerProps> = ({ position }) => {
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

  return (
    <div className={classes}>
      {/* This is where ad code would go */}
      <div className="text-center p-4">
        <p>Advertisement</p>
        <p className="text-xs mt-1">Your ad could be here</p>
      </div>
    </div>
  );
};

export default AdBanner;
