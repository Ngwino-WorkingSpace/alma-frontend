'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Building, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Toast, { ToastType } from '@/app/components/Toast';

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            if (formData.email && formData.password && formData.name) {
                localStorage.setItem('alma_user', JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    role: 'admin'
                }));

                setToast({ message: "Account created successfully!", type: 'success' });
                setTimeout(() => router.push('/dashboard'), 1000);
            } else {
                setToast({ message: "Please fill in all fields", type: 'error' });
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row font-[family-name:var(--font-jost)]">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Left Side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden">
                <div className="w-full max-w-md space-y-8 relative z-10 py-10">
                    {/* Header */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block mb-8">
                            <div className="flex flex-col -space-y-1">
                                <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">ALMA</span>
                                <span className="text-[8px] font-bold text-green-600 uppercase tracking-[0.2em]">Eco-Intelligence</span>
                            </div>
                        </Link>
                        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight leading-none uppercase">Create Account</h1>
                        <p className="text-slate-400 font-medium text-sm">Join us for a premium grocery shopping experience.</p>
                    </div>

                    {/* Social Login */}
                    <button
                        type="button"
                        onClick={() => setToast({ message: 'Google signup coming soon', type: 'info' })}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm shadow-sm active:scale-[0.98]"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Signup with Google
                    </button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-white text-slate-300 font-bold uppercase tracking-[0.2em]">OR</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-green-600 uppercase tracking-widest ml-1">Name*</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your name"
                                className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium text-sm outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-green-600 uppercase tracking-widest ml-1">Email*</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter your email"
                                className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium text-sm outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-green-600 uppercase tracking-widest ml-1">Password*</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium text-sm outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-green-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="terms-signup" className="w-5 h-5 rounded border-slate-200 text-green-600 focus:ring-green-600" />
                            <label htmlFor="terms-signup" className="text-[11px] font-bold text-slate-400">I agree to all Terms and Conditions</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-green-600 text-white rounded-2xl font-bold text-[13px] uppercase tracking-widest hover:bg-green-500 transition-all shadow-xl shadow-green-600/20 active:scale-[0.98] disabled:opacity-70"
                        >
                            {isLoading ? 'Processing...' : 'SIGN UP'}
                        </button>
                    </form>

                    <div className="text-center pt-4">
                        <p className="text-sm font-bold text-slate-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-green-600 hover:text-green-500 font-bold transition-colors">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Image Section */}
            <div className="hidden lg:block w-1/2 p-6">
                <div className="w-full h-full relative rounded-[50px] overflow-hidden isolate z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"
                        alt="ALMA Freshness"
                        className="w-full h-full object-cover absolute inset-0 -z-10 grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-green-950/40 -z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-transparent to-transparent -z-10"></div>

                    {/* Floating Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-16 space-y-6">
                        <h2 className="text-5xl font-semibold text-white leading-tight tracking-tighter uppercase">
                            Join The <br />
                            <span className="text-green-400">Ecosystem</span>
                        </h2>
                        <p className="text-white/80 font-medium text-lg max-w-sm leading-relaxed">
                            Sustainable agriculture starts with intelligence. Join ALMA and optimize your supply chain from farm to fork.
                        </p>

                        <div className="flex gap-4 pt-6">
                            <div className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                <CheckCircle2 size={18} className="text-green-400" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">ECO-INTELLIGENCE</span>
                            </div>
                            <div className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                <ArrowRight size={18} className="text-white" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">ZERO WASTE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
