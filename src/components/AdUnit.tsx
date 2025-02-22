
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdUnit = () => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading ad:', error);
    }
  }, []);

  return (
    <div className="w-full my-4 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '250px' }}
        data-ad-client="ca-pub-9023930540533105"
        data-ad-slot="5837449681"
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
};
