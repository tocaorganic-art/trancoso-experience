import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null
  });

  useEffect(() => {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.renderTime || lastEntry.loadTime }));
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fid = entries[0];
      setMetrics(prev => ({ ...prev, fid: fid.processingStart - fid.startTime }));
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    if (navigationEntry) {
      setMetrics(prev => ({ ...prev, ttfb: navigationEntry.responseStart }));
    }

    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, []);

  const getScoreColor = (metric, value) => {
    if (!value) return 'text-gray-400';
    
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
      ttfb: { good: 800, poor: 1800 }
    };

    const t = thresholds[metric];
    if (value <= t.good) return 'text-green-600';
    if (value <= t.poor) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (metric, value) => {
    if (!value) return <AlertCircle className="w-5 h-5 text-gray-400" />;
    
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
      ttfb: { good: 800, poor: 1800 }
    };

    const t = thresholds[metric];
    if (value <= t.good) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (value <= t.poor) return <TrendingUp className="w-5 h-5 text-yellow-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  const formatValue = (metric, value) => {
    if (!value) return 'Medindo...';
    if (metric === 'cls') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-600" />
          Core Web Vitals - Performance Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">FCP</span>
              {getScoreIcon('fcp', metrics.fcp)}
            </div>
            <p className={`text-2xl font-bold ${getScoreColor('fcp', metrics.fcp)}`}>
              {formatValue('fcp', metrics.fcp)}
            </p>
            <p className="text-xs text-gray-500 mt-1">First Contentful Paint</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">LCP</span>
              {getScoreIcon('lcp', metrics.lcp)}
            </div>
            <p className={`text-2xl font-bold ${getScoreColor('lcp', metrics.lcp)}`}>
              {formatValue('lcp', metrics.lcp)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Largest Contentful Paint</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">CLS</span>
              {getScoreIcon('cls', metrics.cls)}
            </div>
            <p className={`text-2xl font-bold ${getScoreColor('cls', metrics.cls)}`}>
              {formatValue('cls', metrics.cls)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Cumulative Layout Shift</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">FID</span>
              {getScoreIcon('fid', metrics.fid)}
            </div>
            <p className={`text-2xl font-bold ${getScoreColor('fid', metrics.fid)}`}>
              {formatValue('fid', metrics.fid)}
            </p>
            <p className="text-xs text-gray-500 mt-1">First Input Delay</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">TTFB</span>
              {getScoreIcon('ttfb', metrics.ttfb)}
            </div>
            <p className={`text-2xl font-bold ${getScoreColor('ttfb', metrics.ttfb)}`}>
              {formatValue('ttfb', metrics.ttfb)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Time to First Byte</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Otimizações Implementadas:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ Critical CSS inline no Layout</li>
            <li>✅ Lazy loading para componentes pesados (Chatbot, StickyPlayer)</li>
            <li>✅ Imagens otimizadas com OptimizedImage (WebP, width/height)</li>
            <li>✅ DNS prefetch para domínios externos</li>
            <li>✅ React.Suspense para code splitting</li>
            <li>✅ Defer de recursos não-críticos</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}