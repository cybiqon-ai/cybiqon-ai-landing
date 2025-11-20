import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

// Core Web Vitals reporting
// These metrics are crucial for Google ranking
const reportWebVitals = (metric: { name: string; value: number; id: string }) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value);
  }

  // Send to Google Analytics 4 when configured
  // Uncomment and update when GA4 is set up
  /*
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
  */
};

// Report Core Web Vitals
onCLS(reportWebVitals);   // Cumulative Layout Shift
onINP(reportWebVitals);   // Interaction to Next Paint (replaced FID)
onLCP(reportWebVitals);   // Largest Contentful Paint
onFCP(reportWebVitals);   // First Contentful Paint
onTTFB(reportWebVitals);  // Time to First Byte

createRoot(document.getElementById("root")!).render(<App />);
