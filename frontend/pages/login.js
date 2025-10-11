// Login page with Vanta waves animation
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { fetcher, setToken } from '../lib/api';
import { useRouter } from 'next/router';

export default function Login(){
  // Ref for Vanta animation
  const vantaRef = useRef(null);
  // Form state
  const [form, setForm] = useState({email:'', password:''});
  const [err, setErr] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();

  // Initialize Vanta waves background
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

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email is invalid';
    if (!form.password) errors.password = 'Password is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle login form submission
  const submit = async (e)=>{
    e.preventDefault();
    setErr('');
    if (!validateForm()) return;
    try {
      const data = await fetcher('/auth/login', { method: 'POST', body: form, auth:false });
      setToken(data.token);
      router.push('/dashboard');
    } catch (e) {
      setErr(e.error || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div ref={vantaRef} className="absolute inset-0 z-0"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl fade-in border border-white/20">
          <h1 className="text-3xl font-bold mb-6 text-indigo-900 text-center drop-shadow-md">Welcome Back</h1>
          <p className="text-gray-700 mb-8 text-center drop-shadow-sm">Sign in to your account</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className={`input-field ${validationErrors.email || err ? 'error-input' : ''}`} 
                placeholder="Enter your email" 
                value={form.email} 
                onChange={e=>setForm({...form, email:e.target.value})}
                autoComplete="email"
              />
              {validationErrors.email && <p className="text-red-600 text-xs mt-1">{validationErrors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                className={`input-field ${validationErrors.password ? 'error-input' : ''}`} 
                placeholder="Enter your password" 
                value={form.password} 
                onChange={e=>setForm({...form, password:e.target.value})}
                autoComplete="current-password"
              />
              {validationErrors.password && <p className="text-red-600 text-xs mt-1">{validationErrors.password}</p>}
            </div>
            {err && <div className="alert-error">{err}</div>}
            <button type="submit" className="btn-primary w-full hover-scale shadow-lg">Sign In</button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">Don't have an account? Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
