import type { SVGProps } from 'react';

export function PollsLogo({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return <svg viewBox="0 0 64 64" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}><path fillRule="evenodd" d="M14 52V12h20a16 16 0 0 1 0 32H22v8zm8-16h12a8 8 0 0 0 0-16H22z" /></svg>;
}
