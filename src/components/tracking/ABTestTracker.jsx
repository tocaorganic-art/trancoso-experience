import React, { useEffect } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Componente para rastrear testes A/B
 * Automaticamente registra visualizações e conversões
 */
export default function ABTestTracker({ testName, element, children, onVariantSelected }) {
  const [variant, setVariant] = React.useState(null);
  const [sessionId] = React.useState(() => {
    let id = sessionStorage.getItem('ab_session_id');
    if (!id) {
      id = Math.random().toString(36).substring(7);
      sessionStorage.setItem('ab_session_id', id);
    }
    return id;
  });

  useEffect(() => {
    const storedVariant = sessionStorage.getItem(`ab_${testName}`);
    const selectedVariant = storedVariant || (Math.random() > 0.5 ? 'A' : 'B');
    
    if (!storedVariant) {
      sessionStorage.setItem(`ab_${testName}`, selectedVariant);
    }
    
    setVariant(selectedVariant);
    onVariantSelected?.(selectedVariant);

    trackView(selectedVariant);
  }, [testName]);

  const trackView = async (v) => {
    try {
      await base44.entities.ABTest.create({
        test_name: testName,
        variant: v,
        element_tested: element,
        user_session_id: sessionId,
        viewed: true,
        clicked: false,
        converted: false
      });
    } catch (error) {
      console.error('Error tracking A/B test view:', error);
    }
  };

  const trackClick = async () => {
    try {
      await base44.entities.ABTest.create({
        test_name: testName,
        variant: variant,
        element_tested: element,
        user_session_id: sessionId,
        viewed: true,
        clicked: true,
        converted: false
      });
    } catch (error) {
      console.error('Error tracking A/B test click:', error);
    }
  };

  const trackConversion = async (revenue = 0) => {
    try {
      await base44.entities.ABTest.create({
        test_name: testName,
        variant: variant,
        element_tested: element,
        user_session_id: sessionId,
        viewed: true,
        clicked: true,
        converted: true,
        revenue: revenue
      });
    } catch (error) {
      console.error('Error tracking A/B test conversion:', error);
    }
  };

  if (!variant) return null;

  return children({ variant, trackClick, trackConversion });
}