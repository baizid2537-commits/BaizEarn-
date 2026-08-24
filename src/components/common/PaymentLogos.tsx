import React from 'react';
import { PaymentMethod } from '../../types';

interface LogoProps {
  className?: string;
  size?: number | string;
  rounded?: string;
}

/**
 * Official bKash App Icon & Logo SVG
 * Accurate origami bird symbol with official brand color (#E2136E)
 */
export const BkashLogo: React.FC<LogoProps> = ({
  className = '',
  size = 40,
  rounded = 'rounded-2xl',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden bg-[#E2136E] ${rounded} shadow-md shadow-[#E2136E]/30 select-none ${className}`}
      title="bKash (বিকাশ)"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[78%] h-[78%]"
      >
        {/* Official bKash Origami Bird */}
        {/* Upper wing/beak */}
        <path
          d="M52 14L86 34L64 48L52 14Z"
          fill="#FFFFFF"
        />
        {/* Head / top polygon */}
        <path
          d="M86 34L94 22L76 20L86 34Z"
          fill="#FFF0F5"
        />
        {/* Central body */}
        <path
          d="M26 38L64 48L44 68L26 38Z"
          fill="#FFFFFF"
        />
        {/* Tail / Left wing */}
        <path
          d="M10 24L38 34L26 56L10 24Z"
          fill="#FFF0F5"
        />
        {/* Lower body & tail feathers */}
        <path
          d="M44 68L64 48L78 72L44 86L44 68Z"
          fill="#FFFFFF"
        />
        <path
          d="M44 86L28 72L44 68V86Z"
          fill="#FFF0F5"
        />
      </svg>
    </div>
  );
};

/**
 * Official Nagad App Icon & Logo SVG
 * Accurate flame swoosh & coin symbol with official gradient (#E94E1B / #F7941D)
 */
export const NagadLogo: React.FC<LogoProps> = ({
  className = '',
  size = 40,
  rounded = 'rounded-2xl',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden bg-gradient-to-tr from-[#D8381E] via-[#F15A24] to-[#F7941D] ${rounded} shadow-md shadow-[#F15A24]/30 select-none ${className}`}
      title="Nagad (নগদ)"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[82%] h-[82%]"
      >
        <defs>
          <linearGradient id="nagadGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF2E2" />
          </linearGradient>
        </defs>
        {/* Nagad stylised swirl flame & coin */}
        {/* Outer glowing dynamic ribbon */}
        <path
          d="M22 68C16 54 22 34 36 22C46 14 62 12 72 20C82 28 84 42 78 54C72 66 58 76 44 82C32 87 25 80 22 68Z"
          fill="url(#nagadGlow)"
        />
        {/* Inner dynamic cutout swirl */}
        <path
          d="M34 60C30 50 34 38 42 30C48 24 58 22 64 26C70 30 72 38 68 46C64 54 54 62 44 66C38 68 35 64 34 60Z"
          fill="#D8381E"
        />
        {/* Golden Sun / Coin Dot */}
        <circle cx="56" cy="42" r="10" fill="#FFFFFF" />
        <circle cx="56" cy="42" r="6" fill="#F7941D" />
        {/* Bottom swoosh accent */}
        <path
          d="M38 68C48 74 62 72 72 64C76 60 78 64 74 68C64 78 48 82 36 74C32 71 34 66 38 68Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
};

/**
 * Official Rocket App Icon & Logo SVG
 * Accurate Dutch-Bangla Bank Rocket icon with brand purple (#8C3494) & rocket silhouette
 */
export const RocketLogo: React.FC<LogoProps> = ({
  className = '',
  size = 40,
  rounded = 'rounded-2xl',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden bg-[#8C3494] ${rounded} shadow-md shadow-[#8C3494]/30 select-none ${className}`}
      title="Rocket (রকেট)"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[78%] h-[78%]"
      >
        {/* Rocket spacecraft launching at 45 degree angle */}
        {/* Rocket cone/nose */}
        <path
          d="M72 16C72 16 80 18 84 26C88 34 84 42 84 42L66 40L60 34L72 16Z"
          fill="#FFFFFF"
        />
        {/* Rocket main fuselage body */}
        <path
          d="M60 34L66 40L42 64L32 54L60 34Z"
          fill="#FFFFFF"
        />
        {/* Rocket window / cockpit portal */}
        <circle cx="56" cy="44" r="5" fill="#8C3494" />
        <circle cx="56" cy="44" r="2.5" fill="#00C853" />
        {/* Top fin */}
        <path
          d="M58 26L68 34L54 38L58 26Z"
          fill="#FFC107"
        />
        {/* Bottom fin */}
        <path
          d="M38 52L46 66L34 62L38 52Z"
          fill="#FFC107"
        />
        {/* Thruster exhaust flame rings & blast trail */}
        <path
          d="M32 54L42 64L28 74C24 78 18 78 14 74C10 70 10 64 14 60L32 54Z"
          fill="#FF7A00"
        />
        <path
          d="M26 62L34 70L22 78C19 81 14 81 11 78C8 75 8 70 11 67L26 62Z"
          fill="#FFD200"
        />
      </svg>
    </div>
  );
};

/**
 * Universal Payment Method Logo Component
 */
export const PaymentMethodLogo: React.FC<{
  method: PaymentMethod | string;
  size?: number | string;
  className?: string;
  rounded?: string;
}> = ({ method, size = 36, className = '', rounded = 'rounded-xl' }) => {
  const m = method.toLowerCase();
  if (m === 'bkash') {
    return <BkashLogo size={size} className={className} rounded={rounded} />;
  }
  if (m === 'nagad') {
    return <NagadLogo size={size} className={className} rounded={rounded} />;
  }
  if (m === 'rocket') {
    return <RocketLogo size={size} className={className} rounded={rounded} />;
  }
  return (
    <div
      style={{ width: size, height: size }}
      className={`bg-slate-700 text-white font-bold flex items-center justify-center text-xs ${rounded} ${className}`}
    >
      {method.slice(0, 2).toUpperCase()}
    </div>
  );
};
