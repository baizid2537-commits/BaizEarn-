import React, { useState, useEffect, useMemo } from 'react';
import { Disc, Sparkles, Clock, Award, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// 8 Visual Segments on the Wheel with numbers up to 50 Taka
const WHEEL_SEGMENTS = [
  { label: '৳১', value: 1, color: '#1769E0', textColor: '#FFFFFF', sub: 'নগদ' },
  { label: '৳৫', value: 5, color: '#8C3494', textColor: '#FFFFFF', sub: 'বোনাস' },
  { label: '৳২', value: 2, color: '#00C853', textColor: '#FFFFFF', sub: 'নগদ' },
  { label: '৳১০', value: 10, color: '#0284C7', textColor: '#FFFFFF', sub: 'মেগা' },
  { label: '৳১', value: 1, color: '#F59E0B', textColor: '#FFFFFF', sub: 'নগদ' },
  { label: '৳২০', value: 20, color: '#6366F1', textColor: '#FFFFFF', sub: 'সুপার' },
  { label: '৳২', value: 2, color: '#10B981', textColor: '#FFFFFF', sub: 'নগদ' },
  { label: '৳৫০', value: 50, color: '#E11D48', textColor: '#FFD700', sub: 'জ্যাকপট' },
];

export const SpinTab: React.FC = () => {
  const { currentUser, settings, claimDailySpin, showToast, setAuthModalOpen, setAuthMode } = useApp();

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonReward, setWonReward] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // 1-second tick for live 24-hour countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 24 Hours Cooldown calculation
  const cooldownHours = settings.spinCooldownHours || 24;
  const cooldownMs = cooldownHours * 3600 * 1000;

  const { isLocked, remainingTimeFormatted } = useMemo(() => {
    if (!currentUser || !currentUser.lastSpinAt) {
      return { isLocked: false, remainingTimeFormatted: '' };
    }

    const lastSpinTime = new Date(currentUser.lastSpinAt).getTime();
    const elapsed = currentTime - lastSpinTime;
    const remaining = Math.max(0, cooldownMs - elapsed);

    if (remaining <= 0) {
      return { isLocked: false, remainingTimeFormatted: '' };
    }

    const hours = Math.floor(remaining / 3600000);
    const mins = Math.floor((remaining % 3600000) / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);

    const formatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    return { isLocked: true, remainingTimeFormatted: formatted };
  }, [currentUser, currentTime, cooldownMs]);

  // Allowed winning reward outcomes configured by admin (defaults strictly to 1 or 2 Taka)
  const allowedWinningValues = useMemo(() => {
    const allowed = settings.spinAllowedRewards && settings.spinAllowedRewards.length > 0
      ? settings.spinAllowedRewards
      : [1, 2];
    const maxCap = settings.spinMaxReward || 2;
    return allowed.filter((val) => val <= maxCap);
  }, [settings.spinAllowedRewards, settings.spinMaxReward]);

  const handleSpin = () => {
    if (!currentUser) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }

    if (isLocked) {
      showToast(`২৪ ঘণ্টার বিরতি চলছে! পরবর্তী স্পিন পাওয়া যাবে: ${remainingTimeFormatted} পর`, 'error');
      return;
    }

    if (spinning) return;

    setSpinning(true);
    setWonReward(null);

    // Find indices on the wheel that match the allowed outcomes (৳১ and ৳২ slices)
    const validTargetIndices: number[] = [];
    WHEEL_SEGMENTS.forEach((seg, idx) => {
      if (allowedWinningValues.includes(seg.value)) {
        validTargetIndices.push(idx);
      }
    });

    // Fallback if none matched: use slice 0 (৳১) or slice 2 (৳২)
    const chosenWinningIndex =
      validTargetIndices.length > 0
        ? validTargetIndices[Math.floor(Math.random() * validTargetIndices.length)]
        : 0;

    const segmentAngle = 360 / WHEEL_SEGMENTS.length; // 45 degrees per slice
    // Calculate target rotation angle to land cleanly at 12 o'clock pointer
    const sliceCenterAngle = chosenWinningIndex * segmentAngle + segmentAngle / 2;
    const fullTurns = 360 * 5; // 5 full rotations for smooth suspense
    const targetOffset = (360 - sliceCenterAngle) % 360;

    // Current normalized rotation
    const currentNormalized = rotation % 360;
    const addedRotation = fullTurns + (targetOffset - currentNormalized + 360) % 360;
    const finalRotation = rotation + addedRotation;

    setRotation(finalRotation);

    // After 4 seconds of spinning animation
    setTimeout(() => {
      setSpinning(false);
      const landedPrize = WHEEL_SEGMENTS[chosenWinningIndex].value;
      setWonReward(landedPrize);
      claimDailySpin(landedPrize);
    }, 4000);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#0b2245] via-[#071A35] to-[#040e1e] border border-white/15 rounded-3xl p-5 shadow-xl text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#FFC107]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-[#FFC107] to-amber-400 text-white flex items-center justify-center mx-auto mb-2 shadow-lg">
          <Disc className="w-7 h-7" />
        </div>
        
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-rose-500 to-amber-500 px-3 py-0.5 rounded-full text-[10px] font-black tracking-wide text-white uppercase mb-1">
          <Flame className="w-3 h-3 fill-white" /> সর্বোচ্চ পুরস্কার ৳৫০
        </div>

        <h2 className="font-['Poppins',sans-serif] text-xl font-extrabold text-white">
          ডেইলি লাকি স্পিন (Daily Lucky Spin)
        </h2>
        <p className="text-xs text-slate-300 max-w-xs mx-auto mt-1 leading-relaxed">
          প্রত্যেক <span className="text-[#FFC107] font-bold">২৪ ঘণ্টা পর পর</span> জিতে নিতে পারেন <span className="text-[#00C853] font-bold">সর্বোচ্চ ৫০ টাকা</span> পর্যন্ত!
        </p>

        {/* 24-Hour Countdown Timer Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm">
          {isLocked ? (
            <div className="flex items-center gap-1.5 text-[#FFC107] bg-[#FFC107]/10 border border-[#FFC107]/30 px-3 py-0.5 rounded-full font-mono">
              <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>পরবর্তী স্পিন বাকি: {remainingTimeFormatted}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[#00C853] bg-[#00C853]/15 border border-[#00C853]/30 px-3 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>চরকা ঘোরান ও জিতে নিন নিশ্চিত টাকা!</span>
            </div>
          )}
        </div>
      </div>

      {/* Wheel Stage */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
        
        {/* Top Pointer Arrow */}
        <div className="z-30 -mb-5 flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-[#FFC107] border-2 border-white shadow-lg flex items-center justify-center -mb-2 z-10">
            <div className="w-2 h-2 rounded-full bg-slate-900" />
          </div>
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-[#FFC107] drop-shadow-xl" />
        </div>

        {/* SVG Interactive Wheel */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-3 select-none">
          {/* Glowing outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFC107] via-rose-500 to-[#1769E0] p-1.5 shadow-[0_0_30px_rgba(255,193,7,0.25)]">
            <div className="w-full h-full rounded-full border-4 border-[#FFC107]/80 bg-slate-950 overflow-hidden relative">
              
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? 'transform 4s cubic-bezier(0.12, 0.95, 0.25, 1)' : 'none',
                }}
              >
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.8" />
                  </filter>
                </defs>

                {WHEEL_SEGMENTS.map((seg, idx) => {
                  const numSlices = WHEEL_SEGMENTS.length;
                  const sliceAngle = 360 / numSlices;
                  const startAngle = idx * sliceAngle - 90;
                  const endAngle = startAngle + sliceAngle;

                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;

                  const x1 = 150 + 145 * Math.cos(startRad);
                  const y1 = 150 + 145 * Math.sin(startRad);
                  const x2 = 150 + 145 * Math.cos(endRad);
                  const y2 = 150 + 145 * Math.sin(endRad);

                  const pathData = `M 150 150 L ${x1} ${y1} A 145 145 0 0 1 ${x2} ${y2} Z`;

                  // Text rotation angle
                  const midAngle = startAngle + sliceAngle / 2;
                  const midRad = (midAngle * Math.PI) / 180;
                  const textX = 150 + 95 * Math.cos(midRad);
                  const textY = 150 + 95 * Math.sin(midRad);

                  return (
                    <g key={idx}>
                      <path
                        d={pathData}
                        fill={seg.color}
                        stroke="#071A35"
                        strokeWidth="2.5"
                      />
                      {/* Inner decoration arc */}
                      <circle
                        cx={150 + 138 * Math.cos(midRad)}
                        cy={150 + 138 * Math.sin(midRad)}
                        r="3.5"
                        fill="#FFFFFF"
                      />
                      {/* Big Bold Bengali Number */}
                      <text
                        x={textX}
                        y={textY}
                        fill={seg.textColor}
                        fontSize={seg.value >= 10 ? "24" : "26"}
                        fontWeight="900"
                        fontFamily="'Poppins', sans-serif"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                        filter="url(#shadow)"
                      >
                        {seg.label}
                      </text>
                      {/* Sub-label */}
                      <text
                        x={150 + 58 * Math.cos(midRad)}
                        y={150 + 58 * Math.sin(midRad)}
                        fill="#FFFFFF"
                        opacity="0.85"
                        fontSize="9"
                        fontWeight="700"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${midAngle + 90}, ${150 + 58 * Math.cos(midRad)}, ${150 + 58 * Math.sin(midRad)})`}
                      >
                        {seg.sub}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Center Hub */}
              <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-b from-[#071A35] to-[#040e1e] border-3 border-[#FFC107] shadow-[0_0_15px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center z-20 pointer-events-none">
                <Disc className="w-5 h-5 text-[#FFC107]" />
                <span className="text-[8px] font-black text-white font-mono tracking-tighter">SPIN</span>
              </div>
            </div>
          </div>
        </div>

        {/* 24-Hour Cooldown Card if locked */}
        {isLocked && (
          <div className="w-full max-w-xs bg-slate-900/90 border border-[#FFC107]/40 rounded-2xl p-3.5 mb-4 text-center space-y-2 animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-1.5 text-[#FFC107] text-xs font-bold">
              <Clock className="w-4 h-4" />
              <span>২৪ ঘণ্টার বিরতি চলছে</span>
            </div>
            <div className="font-['Poppins',sans-serif] text-3xl font-black text-white font-mono tracking-widest text-[#FFC107]">
              {remainingTimeFormatted}
            </div>
            <p className="text-[11px] text-slate-300">
              আপনি আজকের স্পিন সম্পন্ন করেছেন। ২৪ ঘণ্টা পর আবার নতুন স্পিন পাবেন।
            </p>
          </div>
        )}

        {/* Live Winning Result Callout */}
        {wonReward !== null && (
          <div className="p-4 bg-gradient-to-r from-emerald-950/80 to-green-900/80 border-2 border-[#00C853] rounded-2xl text-center text-white mb-4 animate-in zoom-in-95 duration-300 w-full max-w-xs shadow-xl">
            <span className="text-xs text-slate-200 block font-semibold">🎉 অভিনন্দন! আপনি জিতেছেন</span>
            <div className="font-['Poppins',sans-serif] text-3xl font-black text-[#00C853] my-1">
              ৳{wonReward} টাকা
            </div>
            <span className="text-[11px] text-emerald-300 font-medium">আপনার মূল ব্যালেন্সে সরাসরি যোগ করা হয়েছে</span>
          </div>
        )}

        {/* Spin Action Button */}
        <button
          type="button"
          onClick={handleSpin}
          disabled={spinning || isLocked}
          className={`w-full max-w-xs py-3.5 font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${
            isLocked
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-rose-500 via-amber-500 to-[#FFC107] hover:opacity-95 text-slate-950 font-black shadow-amber-500/25 active:scale-95'
          }`}
        >
          {isLocked ? (
            <>
              <Clock className="w-4 h-4" />
              <span>পরবর্তী স্পিন ২৪ ঘণ্টা পর ({remainingTimeFormatted})</span>
            </>
          ) : spinning ? (
            <>
              <Disc className="w-4 h-4 animate-spin text-slate-950" />
              <span className="text-slate-950">চরকা ঘুরছে...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span className="text-slate-950">ফ্রি স্পিন করুন (সর্বোচ্চ ৳৫০)</span>
            </>
          )}
        </button>
      </div>

      {/* Rules and Information Card */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-4 sm:p-5 text-xs space-y-3 text-slate-300">
        <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
          <Award className="w-4 h-4 text-[#FFC107]" />
          <span>লাকি স্পিন নিয়মাবলি (Rules):</span>
        </h4>
        <ul className="space-y-2 list-disc list-inside text-[11px] leading-relaxed text-slate-300">
          <li>
            প্রত্যেক <strong>২৪ ঘণ্টা পর পর</strong> একবার করে ফ্রি স্পিন বা চরকা ঘুরাতে পারবেন।
          </li>
          <li>
            চরকা ঘুরিয়ে জিতে নিতে পারেন <strong>সর্বোচ্চ ৫০ টাকা</strong> পর্যন্ত নগদ রিওয়ার্ড!
          </li>
          <li>
            স্পিনে জিতে নেওয়া টাকা (৳১ বা ৳২) সাথে সাথে আপনার অ্যাকাউন্টের মূল ব্যালেন্সে যোগ হয়ে যাবে।
          </li>
          <li>
            জমা হওয়া টাকা বিকাশ, নগদ অথবা রকেটের মাধ্যমে যেকোনো সময় সরাসরি উত্তোলন করা যাবে।
          </li>
        </ul>
      </div>
    </div>
  );
};
