// app/components/ForexLiveChart.tsx
"use client";

import { useEffect } from "react";

export default function ForexLiveChart() {
  useEffect(() => {
    // Avoid duplicate script injection
    if ((window as any).TradingView) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (!(window as any).TradingView) return;

      new (window as any).TradingView.widget({
        width: "100%",
        height: 500,
        symbol: "FX:EURUSD", // Change this to any currency pair like FX:GBPUSD
        interval: "1", // 1-minute interval
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1", // candlestick
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "forex_chart",
      });
    };

    document.body.appendChild(script);
  }, []);

  return <div id="forex_chart" className="w-full" />;
}
