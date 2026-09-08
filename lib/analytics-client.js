export function track(event, source = '/') {
  if (typeof window === 'undefined' || window.navigator.doNotTrack === '1') return;
  fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event, source: source.split(/[?#]/)[0] }), keepalive: true }).catch(() => {});
}
