import React from 'react';

interface DoodleProps {
  className?: string;
  size?: number | string;
  color?: string;
}

/**
 * Hand-drawn Curling Steam Animation
 */
export const CurlingSteam: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 60 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`overflow-visible ${className}`}
  >
    <path
      d="M18 60 C12 50, 24 38, 16 26 C10 16, 22 8, 18 2"
      stroke="#BB795F"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="animate-steam origin-bottom"
    />
    <path
      d="M32 62 C26 48, 40 36, 32 22 C26 12, 36 6, 30 0"
      stroke="#BB795F"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animationDelay: '1.2s' }}
      className="animate-steam origin-bottom"
    />
    <path
      d="M45 58 C38 46, 50 34, 44 24 C38 15, 48 8, 42 3"
      stroke="#BB795F"
      strokeWidth="2.2"
      strokeLinecap="round"
      style={{ animationDelay: '0.6s' }}
      className="animate-steam origin-bottom"
    />
  </svg>
);

/**
 * Illustrated Ceramic Coffee Cup with Handle & Plate
 */
export const DoodleCoffeeCup: React.FC<DoodleProps & { withSteam?: boolean }> = ({
  className = '',
  size = 80,
  withSteam = true,
}) => (
  <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
    {withSteam && (
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-12 h-14 pointer-events-none">
        <CurlingSteam className="w-full h-full" />
      </div>
    )}
    <svg
      viewBox="0 0 100 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:rotate-1"
    >
      {/* Saucer / Plate */}
      <ellipse
        cx="48"
        cy="74"
        rx="38"
        ry="7"
        fill="#FCEEE6"
        stroke="#49352D"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <ellipse
        cx="48"
        cy="74"
        rx="26"
        ry="4"
        fill="#F1C5A8"
        opacity="0.4"
      />

      {/* Cup Body */}
      <path
        d="M20 30 C 22 55, 30 68, 48 68 C 66 68, 74 55, 76 30 Z"
        fill="#FFF7EA"
        stroke="#49352D"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Cup Rim */}
      <ellipse
        cx="48"
        cy="30"
        rx="28"
        ry="6"
        fill="#FFFCF5"
        stroke="#49352D"
        strokeWidth="3.2"
      />

      {/* Coffee Surface */}
      <ellipse
        cx="48"
        cy="31"
        rx="24"
        ry="4.5"
        fill="#6E5246"
      />
      {/* Latte Heart / Foam */}
      <path
        d="M48 31 C 46 29, 43 30, 44 32 C 45 33, 48 35, 48 35 C 48 35, 51 33, 52 32 C 53 30, 50 29, 48 31 Z"
        fill="#FFF7EA"
        opacity="0.9"
      />

      {/* Handle */}
      <path
        d="M72 36 C 85 36, 88 52, 70 56"
        fill="none"
        stroke="#49352D"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Heart or Bean Doodle on Cup */}
      <circle cx="48" cy="49" r="7" fill="#F1C5A8" opacity="0.6" />
      <path
        d="M48 47 C 46.5 45, 44 46, 45 48 C 46 49.5, 48 51, 48 51 C 48 51, 50 49.5, 51 48 C 52 46, 49.5 45, 48 47 Z"
        fill="#BB795F"
      />
    </svg>
  </div>
);

/**
 * Smiling Fried Egg Badge (Inspired by Bagel Badge on Attached Menu)
 */
export const DoodleSmilingEgg: React.FC<DoodleProps> = ({ className = '', size = 50 }) => (
  <svg
    viewBox="0 0 70 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-105 hover:rotate-3 ${className}`}
    style={{ width: size, height: size }}
  >
    {/* Egg White - Organic Wobbly Outline */}
    <path
      d="M34 10 C 48 8, 62 18, 64 32 C 66 46, 56 60, 42 63 C 26 66, 10 56, 8 40 C 6 24, 18 12, 34 10 Z"
      fill="#FFFDF7"
      stroke="#49352D"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Yolk - Butter Yellow with Cocoa Line */}
    <circle
      cx="35"
      cy="36"
      r="15"
      fill="#F1CF82"
      stroke="#49352D"
      strokeWidth="2.8"
    />
    {/* Yolk Highlight */}
    <path
      d="M28 30 Q 33 26 38 29"
      stroke="#FFF7EA"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Smiling Face Eyes */}
    <circle cx="31" cy="37" r="1.8" fill="#49352D" />
    <circle cx="39" cy="37" r="1.8" fill="#49352D" />
    {/* Cheerful Smile */}
    <path
      d="M32 41 Q 35 44 38 41"
      stroke="#49352D"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Rosy Cheeks */}
    <circle cx="28" cy="39" r="2.2" fill="#F1C5A8" opacity="0.8" />
    <circle cx="42" cy="39" r="2.2" fill="#F1C5A8" opacity="0.8" />
  </svg>
);

/**
 * Smiling Biscuit / Cookie Badge (Inspired by Signature Badge on Attached Menu)
 */
export const DoodleSmilingBadge: React.FC<DoodleProps> = ({ className = '', size = 50 }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:rotate-6 ${className}`}
    style={{ width: size, height: size }}
  >
    {/* Crinkly Biscuit Base */}
    <circle
      cx="32"
      cy="32"
      r="27"
      fill="#F1C5A8"
      stroke="#49352D"
      strokeWidth="3"
      strokeDasharray="2 1"
    />
    <circle
      cx="32"
      cy="32"
      r="23"
      fill="#FCEEE6"
      stroke="#49352D"
      strokeWidth="2.5"
    />
    {/* Face */}
    <circle cx="25" cy="28" r="2" fill="#49352D" />
    <circle cx="39" cy="28" r="2" fill="#49352D" />
    <path
      d="M26 36 Q 32 42 38 36"
      stroke="#49352D"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Rosy Cheeks */}
    <ellipse cx="23" cy="33" rx="3" ry="2" fill="#BB795F" opacity="0.5" />
    <ellipse cx="41" cy="33" rx="3" ry="2" fill="#BB795F" opacity="0.5" />
  </svg>
);

/**
 * Friendly Toasted Bread Illustration
 */
export const DoodleToast: React.FC<DoodleProps> = ({ className = '', size = 60 }) => (
  <svg
    viewBox="0 0 70 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:-rotate-3 ${className}`}
    style={{ width: size, height: size }}
  >
    {/* Bread Crust */}
    <path
      d="M15 28 C 12 18, 22 10, 35 12 C 48 10, 58 18, 55 28 L 54 55 C 54 60, 48 62, 35 62 C 22 62, 16 60, 16 55 Z"
      fill="#F1CF82"
      stroke="#49352D"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* Bread Inner */}
    <path
      d="M20 30 C 18 22, 26 16, 35 17 C 44 16, 52 22, 50 30 L 49 53 C 49 56, 44 57, 35 57 C 26 57, 21 56, 21 53 Z"
      fill="#FFF7EA"
    />
    {/* Melting Butter */}
    <rect
      x="28"
      y="30"
      width="14"
      height="12"
      rx="3"
      fill="#F1CF82"
      stroke="#49352D"
      strokeWidth="2"
      transform="rotate(8 28 30)"
    />
    {/* Butter drip */}
    <path
      d="M34 44 Q 35 48 37 46"
      stroke="#D8B359"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Flaky Croissant Illustration
 */
export const DoodleCroissant: React.FC<DoodleProps> = ({ className = '', size = 55 }) => (
  <svg
    viewBox="0 0 70 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-105 ${className}`}
    style={{ width: size, height: size }}
  >
    {/* Croissant Crescent */}
    <path
      d="M10 38 C 12 25, 25 10, 35 10 C 45 10, 58 25, 60 38 C 55 42, 45 35, 35 37 C 25 35, 15 42, 10 38 Z"
      fill="#F1CF82"
      stroke="#49352D"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* Middle layer */}
    <path
      d="M20 28 C 25 18, 45 18, 50 28 C 43 25, 27 25, 20 28 Z"
      fill="#D8B359"
      stroke="#49352D"
      strokeWidth="2.5"
    />
    {/* Outer Tips */}
    <path d="M12 37 C 7 38, 5 44, 9 46 C 13 48, 17 44, 15 39" fill="#F1CF82" stroke="#49352D" strokeWidth="2.5" />
    <path d="M58 37 C 63 38, 65 44, 61 46 C 57 48, 53 44, 55 39" fill="#F1CF82" stroke="#49352D" strokeWidth="2.5" />
    {/* Flaky lines */}
    <line x1="28" y1="20" x2="33" y2="30" stroke="#BB795F" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="42" y1="20" x2="37" y2="30" stroke="#BB795F" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/**
 * Seeded Toasted Bagel
 */
export const DoodleBagel: React.FC<DoodleProps> = ({ className = '', size = 55 }) => (
  <svg
    viewBox="0 0 65 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:rotate-3 ${className}`}
    style={{ width: size, height: size }}
  >
    {/* Outer Bagel Ring */}
    <ellipse
      cx="32.5"
      cy="30"
      rx="27"
      ry="22"
      fill="#F1CF82"
      stroke="#49352D"
      strokeWidth="3"
    />
    {/* Bagel Hole */}
    <ellipse
      cx="32.5"
      cy="30"
      rx="10"
      ry="8"
      fill="#FFF7EA"
      stroke="#49352D"
      strokeWidth="2.8"
    />
    {/* Toasted Crust Rim */}
    <path
      d="M12 28 C 14 16, 51 16, 53 28"
      stroke="#BB795F"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Sesame Seeds */}
    <circle cx="20" cy="22" r="1.2" fill="#49352D" />
    <circle cx="28" cy="18" r="1.2" fill="#49352D" />
    <circle cx="38" cy="18" r="1.2" fill="#49352D" />
    <circle cx="46" cy="23" r="1.2" fill="#49352D" />
    <circle cx="22" cy="38" r="1.2" fill="#49352D" />
    <circle cx="43" cy="39" r="1.2" fill="#49352D" />
    <circle cx="33" cy="43" r="1.2" fill="#49352D" />
  </svg>
);

/**
 * Sweet Smiling Strawberry
 */
export const DoodleStrawberry: React.FC<DoodleProps> = ({ className = '', size = 45 }) => (
  <svg
    viewBox="0 0 50 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 hover:scale-110 ${className}`}
    style={{ width: size, height: size }}
  >
    {/* Berry Body */}
    <path
      d="M25 15 C 38 15, 45 26, 42 40 C 39 52, 28 56, 25 56 C 22 56, 11 52, 8 40 C 5 26, 12 15, 25 15 Z"
      fill="#BB795F"
      stroke="#49352D"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    {/* Leaves */}
    <path
      d="M25 15 L 20 6 M25 15 L 25 4 M25 15 L 30 6 M25 15 L 14 12 M25 15 L 36 12"
      stroke="#98BAA4"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Face */}
    <circle cx="20" cy="32" r="1.6" fill="#FFF7EA" />
    <circle cx="30" cy="32" r="1.6" fill="#FFF7EA" />
    <path d="M22 38 Q 25 41 28 38" stroke="#FFF7EA" strokeWidth="1.8" strokeLinecap="round" />
    {/* Seeds */}
    <circle cx="16" cy="26" r="1" fill="#F1CF82" />
    <circle cx="34" cy="26" r="1" fill="#F1CF82" />
    <circle cx="18" cy="45" r="1" fill="#F1CF82" />
    <circle cx="32" cy="45" r="1" fill="#F1CF82" />
    <circle cx="25" cy="49" r="1" fill="#F1CF82" />
  </svg>
);

/**
 * Hand-drawn Twinkle Stars & Sparkles
 */
export const DoodleSparkle: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    style={{ width: size, height: size }}
  >
    <path
      d="M20 4 C 20 14, 26 20, 36 20 C 26 20, 20 26, 20 36 C 20 26, 14 20, 4 20 C 14 20, 20 14, 20 4 Z"
      fill="#F1CF82"
      stroke="#49352D"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Hand-drawn Curly Arrow
 */
export const DoodleArrow: React.FC<{ className?: string; direction?: 'right' | 'down' | 'left' }> = ({
  className = '',
  direction = 'right',
}) => {
  const rotation = direction === 'down' ? 'rotate-90' : direction === 'left' ? '-scale-x-100' : '';
  return (
    <svg
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block overflow-visible ${rotation} ${className}`}
      style={{ width: 60, height: 30 }}
    >
      <path
        d="M6 25 C 24 10, 48 35, 68 18"
        stroke="#49352D"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M56 14 L 70 18 L 64 29"
        stroke="#49352D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Organic Wavy Underline Stroke
 */
export const DoodleUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#F1C5A8',
}) => (
  <svg
    viewBox="0 0 200 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-3 block ${className}`}
    preserveAspectRatio="none"
  >
    <path
      d="M3 10 C 35 4, 75 14, 115 7 C 150 2, 180 12, 197 8"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Hand-drawn Coffee Stain Watermark
 */
export const DoodleCoffeeStain: React.FC<{ className?: string; size?: number | string }> = ({
  className = '',
  size = 120,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none opacity-20 ${className}`}
    style={{ width: size, height: size }}
  >
    {/* Outer irregular ring */}
    <path
      d="M50 10 C 72 8, 92 28, 90 52 C 88 74, 68 92, 48 90 C 26 88, 8 70, 10 48 C 12 25, 30 11, 50 10 Z"
      stroke="#BB795F"
      strokeWidth="6"
      strokeLinecap="round"
      strokeDasharray="40 10 20 8"
    />
    <path
      d="M50 18 C 68 16, 82 32, 80 50 C 78 68, 62 82, 46 80 C 30 78, 18 64, 20 48 C 22 30, 36 19, 50 18 Z"
      stroke="#49352D"
      strokeWidth="1.5"
      opacity="0.4"
    />
    {/* Tiny splatter drops */}
    <circle cx="85" cy="22" r="2.5" fill="#BB795F" />
    <circle cx="94" cy="40" r="1.5" fill="#BB795F" />
    <circle cx="14" cy="72" r="2" fill="#BB795F" />
  </svg>
);

/**
 * BEANIE — THE CAFÉ ASSISTANT CHARACTER
 * An illustrated roasted coffee-bean with character, expressive eyes, and warmth.
 */
export const BeanieCharacter: React.FC<{
  className?: string;
  size?: number;
  mood?: 'happy' | 'thinking' | 'talking' | 'waving';
}> = ({
  className = '',
  size = 60,
  mood = 'happy',
}) => (
  <div
    className={`relative inline-block transition-transform duration-300 ${className}`}
    style={{ width: size, height: size }}
  >
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md overflow-visible"
    >
      {/* Roasted Coffee Bean Outer Shell */}
      <path
        d="M40 8 C 58 8, 70 22, 70 42 C 70 62, 56 74, 38 74 C 20 74, 10 58, 10 38 C 10 18, 22 8, 40 8 Z"
        fill="#6E5246"
        stroke="#49352D"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />
      {/* Soft warm highlight on bean side */}
      <path
        d="M22 20 C 18 28, 16 42, 22 55"
        stroke="#BB795F"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Signature Bean Crease / Fissure (Center S-curve) */}
      <path
        d="M42 12 C 34 26, 46 42, 38 70"
        stroke="#35241D"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Eyes based on mood */}
      {mood === 'thinking' ? (
        <>
          {/* Looking up thoughtfully */}
          <circle cx="28" cy="34" r="3" fill="#FFF7EA" />
          <circle cx="29" cy="33" r="1.8" fill="#35241D" />
          <circle cx="48" cy="34" r="3" fill="#FFF7EA" />
          <circle cx="49" cy="33" r="1.8" fill="#35241D" />
        </>
      ) : mood === 'talking' ? (
        <>
          {/* Lively wide eyes */}
          <circle cx="27" cy="36" r="3.2" fill="#FFF7EA" />
          <circle cx="28" cy="36" r="2" fill="#35241D" />
          <circle cx="49" cy="36" r="3.2" fill="#FFF7EA" />
          <circle cx="50" cy="36" r="2" fill="#35241D" />
        </>
      ) : (
        <>
          {/* Happy friendly eyes with sparkle */}
          <circle cx="28" cy="36" r="3" fill="#FFF7EA" />
          <circle cx="29" cy="36" r="1.8" fill="#35241D" />
          <circle cx="48" cy="36" r="3" fill="#FFF7EA" />
          <circle cx="49" cy="36" r="1.8" fill="#35241D" />
        </>
      )}

      {/* Rosy Cheeks */}
      <ellipse cx="22" cy="42" rx="3.5" ry="2.2" fill="#F1C5A8" />
      <ellipse cx="54" cy="42" rx="3.5" ry="2.2" fill="#F1C5A8" />

      {/* Mouth */}
      {mood === 'talking' ? (
        <path
          d="M34 44 Q 38 52 44 45"
          fill="#35241D"
          stroke="#35241D"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M33 45 Q 38 50 44 45"
          stroke="#FFF7EA"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      )}

      {/* Little Coffee Bean Hat / Steam Wisps above head */}
      <path
        d="M34 4 C 36 0, 42 2, 40 6"
        stroke="#BB795F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M44 4 C 47 1, 51 3, 49 7"
        stroke="#BB795F"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </div>
);
