import type { SVGProps } from 'react';
import logo from '../../assets/brand/polls-icon.png';

export function PollsLogo({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" {...props}><image href={logo} width="64" height="64" /></svg>;
}
