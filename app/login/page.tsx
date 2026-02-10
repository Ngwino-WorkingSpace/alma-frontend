'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';
import AlmaLogo from '@/app/components/AlmaLogo';
import Toast, { ToastType } from '@/app/components/Toast';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Mock validation
            if (formData.email && formData.password) {
                // Store user session (in production, use proper auth)
                localStorage.setItem('alma_user', JSON.stringify({
                    email: formData.email,
                    name: formData.email.split('@')[0],
                    role: 'admin'
                }));

                setToast({ message: "Login successful! Redirecting...", type: 'success' });

                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            } else {
                setToast({ message: "Please fill in all fields", type: 'error' });
                setIsLoading(false);
            }
        }, 1500);
    };

    const handleSocialLogin = (provider: string) => {
        setToast({ message: `${provider} login coming soon`, type: 'info' });
    }

    return (
        <div className="min-h-screen bg-[#faf8f5] relative overflow-hidden flex items-center justify-center p-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#4a7c59]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#1a3a2e]/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Side - Branding */}
                <div className="hidden lg:block space-y-8 animate-fade-in pl-8">
                    <Link href="/" className="flex items-center gap-3 group w-fit">
                        <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                            <AlmaLogo className="w-12 h-12" />
                        </div>
                        <span className="text-4xl font-black text-[#1a3a2e] tracking-tight">ALMA</span>
                    </Link>

                    <div className="space-y-6">
                        <h1 className="text-6xl font-black text-[#1a3a2e] leading-[1.1] tracking-tight">
                            Freshness <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4a7c59] to-[#2d4f38]">
                                Reimagined.
                            </span>
                        </h1>
                        <p className="text-lg text-[#1a3a2e]/70 leading-relaxed max-w-md font-medium">
                            The intelligent supply chain platform that predicts spoilage before it happens.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1a3a2e]/10">
                        <div className="space-y-1">
                            <p className="text-3xl font-black text-[#4a7c59]">94%</p>
                            <p className="text-xs text-[#1a3a2e]/60 font-bold uppercase tracking-wide">AI Accuracy</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-black text-[#4a7c59]">100%</p>
                            <p className="text-xs text-[#1a3a2e]/60 font-bold uppercase tracking-wide">Traceability</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-black text-[#4a7c59]">$1.2T</p>
                            <p className="text-xs text-[#1a3a2e]/60 font-bold uppercase tracking-wide">Market Size</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 animate-scale-in">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-3xl font-black text-[#1a3a2e] mb-2">Welcome Back</h2>
                        <p className="text-[#1a3a2e]/60 font-medium">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider ml-4">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 group-focus-within:text-[#4a7c59] transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@company.com"
                                    className="w-full pl-14 pr-5 py-4 bg-white border-2 border-[#1a3a2e]/5 rounded-2xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider ml-4">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 group-focus-within:text-[#4a7c59] transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-14 py-4 bg-white border-2 border-[#1a3a2e]/5 rounded-2xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/10 transition-all font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 hover:text-[#1a3a2e] transition-colors outline-none"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-2 border-[#1a3a2e]/20 text-[#4a7c59] focus:ring-[#4a7c59] transition-all cursor-pointer" />
                                <span className="text-sm text-[#1a3a2e]/60 font-semibold group-hover:text-[#1a3a2e]/80 transition-colors">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-[#4a7c59] font-bold hover:text-[#3d6849] transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-[#1a3a2e] text-white rounded-2xl font-bold text-base hover:bg-[#4a7c59] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#1a3a2e]/20 hover:shadow-xl hover:shadow-[#4a7c59]/30 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="mt-8 space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#1a3a2e]/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white/50 backdrop-blur-sm text-[#1a3a2e]/40 font-bold text-xs uppercase tracking-wider">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleSocialLogin('Google')}
                                className="flex items-center justify-center gap-2 py-3 bg-white border border-[#1a3a2e]/10 rounded-xl hover:bg-gray-50 transition-all font-semibold text-[#1a3a2e]/70 hover:text-[#1a3a2e] active:scale-[0.98]"
                            >
                                <Chrome size={18} />
                                Google
                            </button>
                            <button
                                onClick={() => handleSocialLogin('GitHub')}
                                className="flex items-center justify-center gap-2 py-3 bg-white border border-[#1a3a2e]/10 rounded-xl hover:bg-gray-50 transition-all font-semibold text-[#1a3a2e]/70 hover:text-[#1a3a2e] active:scale-[0.98]"
                            >
                                <Github size={18} />
                                GitHub
                            </button>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center mt-8">
                        <p className="text-[#1a3a2e]/60 font-medium">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-[#4a7c59] font-bold hover:underline">
                                Create one now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
