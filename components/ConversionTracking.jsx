import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { track } from '../lib/analytics-client';
export default function ConversionTracking() {
  const router = useRouter();
  useEffect(() => {
    function onClick(event) {
      const link = event.target.closest?.('a');
      if (link && (link.getAttribute('href') || '').startsWith('/contacto')) track('cta_click', router.asPath);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [router.asPath]);
  return null;
}
