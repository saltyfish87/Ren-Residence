import { useState } from 'react';

const MAX_RETRIES = 4;
const RETRY_DELAY_MS = 500;

/** Google Drive CDN sometimes drops one of several concurrent image requests; retry before giving up. */
export function SafeImg({ src, alt, className, loading = 'lazy', fetchPriority, onClick }: { src: string; alt: string; className?: string; loading?: 'lazy' | 'eager'; fetchPriority?: 'high' | 'low' | 'auto'; onClick?: () => void }) {
  const [retryCount, setRetryCount] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center border border-frame bg-bone text-center text-xs uppercase tracking-[0.15em] text-mute ${className ?? ''}`}>
        {alt}
      </div>
    );
  }

  const handleError = () => {
    if (retryCount < MAX_RETRIES) setTimeout(() => setRetryCount((n) => n + 1), RETRY_DELAY_MS * (retryCount + 1));
    else setFailed(true);
  };

  const retrySrc = retryCount > 0 ? `${src}#retry-${retryCount}` : src;
  return <img src={retrySrc} alt={alt} loading={loading} fetchPriority={fetchPriority} className={className} onError={handleError} onClick={onClick} referrerPolicy="no-referrer" />;
}

/** Drive image at a sensible width instead of the 4K =s3840 default (the data file stores 4K URLs). */
export function sized(url: string | undefined, width = 1600): string {
  if (!url) return '';
  return url.replace(/=s\d+$/, `=w${width}`).replace(/=w\d+$/, `=w${width}`);
}
