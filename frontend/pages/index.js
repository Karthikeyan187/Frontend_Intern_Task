import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function Home(){
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    const vantaEffect = VANTA.WAVES({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: window.innerHeight,
      minWidth: window.innerWidth,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x3b82f6,
      shininess: 50.00,
      waveSpeed: 0.65,
      waveHeight: 10.00,
      zoom: 0.65
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div ref={vantaRef} className="absolute inset-0 z-0"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl fade-in border border-white/20">
          <h1 className="text-4xl font-bold mb-6 text-indigo-900 text-center drop-shadow-md">Dashboard</h1>
          <p className="text-gray-700 mb-8 text-center drop-shadow-sm">Manage your profile and data securely and efficiently.</p>
          <div className="flex space-x-4 justify-center">
            <Link href="/register" className="btn-primary hover-scale shadow-lg">
              Get Started
            </Link>
            <Link href="/login" className="btn-secondary hover-scale shadow-lg">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
