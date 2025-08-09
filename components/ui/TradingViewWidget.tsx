// components/TradingViewWidget.tsx
'use client';
import React, { useEffect, useRef } from 'react';

export default function TradingViewWidget({ symbol = 'BTCUSDT' }: { symbol?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        new window.TradingView.widget({
          autosize: true,
          symbol: `BINANCE:${symbol}`,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          container_id: container.current!.id,
        });
      };

      container.current.innerHTML = '';
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="w-full h-[500px]">
      <div id="tradingview-widget" ref={container} className="w-full h-full" />
    </div>
  );
}
