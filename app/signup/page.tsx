'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Building, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import AlmaLogo from '@/app/components/AlmaLogo';
import Toast, { ToastType } from '@/app/components/Toast';

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setToast({ message: "Passwords do not match!", type: 'error' });
            return;
        }

        if (formData.password.length < 8) {
            setToast({ message: "Password must be at least 8 characters long", type: 'error' });
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Store user session
            localStorage.setItem('alma_user', JSON.stringify({
                email: formData.email,
                name: formData.name,
                company: formData.company,
                role: 'admin'
            }));

            setToast({ message: "Account created successfully!", type: 'success' });

            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] relative overflow-hidden flex items-center justify-center p-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[60%] h-[60%] bg-[#4a7c59]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#1a3a2e]/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-7xl grid lg:grid-cols-12 gap-12 items-center relative z-10">
                {/* Left Side - Branding (5 cols) */}
                <div className="hidden lg:block lg:col-span-5 space-y-8 animate-fade-in pl-8">
                    <Link href="/" className="flex items-center gap-3 group w-fit">
                        <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                            <AlmaLogo className="w-12 h-12" />
                        </div>
                        <span className="text-4xl font-black text-[#1a3a2e] tracking-tight">ALMA</span>
                    </Link>

                    <div className="space-y-6">
                        <h1 className="text-5xl font-black text-[#1a3a2e] leading-[1.1] tracking-tight">
                            Join the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4a7c59] to-[#2d4f38]">
                                Revolution.
                            </span>
                        </h1>
                        <p className="text-lg text-[#1a3a2e]/70 leading-relaxed font-medium">
                            Create an account to access enterprise-grade food supply chain monitoring.
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        {[
                            'Real-time molecular monitoring',
                            '72-hour early spoilage detection',
                            'AI-powered predictive analytics',
                            'Blockchain-verified supply chain',
                            'Enterprise-grade security'
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 group">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-[#1a3a2e]/5 group-hover:scale-110 transition-transform">
                                    <CheckCircle2 size={16} className="text-[#4a7c59]" />
                                </div>
                                <p className="text-[#1a3a2e]/80 font-semibold">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Signup Form (7 cols) */}
                <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 animate-scale-in">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-3xl font-black text-[#1a3a2e] mb-2">Create your account</h2>
                        <p className="text-[#1a3a2e]/60 font-medium">Get started with ALMA in minutes. No credit card required.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider ml-4">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 group-focus-within:text-[#4a7c59] transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Isaac Precieux"
                                        className="w-full pl-12 pr-5 py-3.5 bg-white border-2 border-[#1a3a2e]/5 rounded-2xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Company Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider ml-4">
                                    Company Name
                                </label>
                                <div className="relative group">
                                    <Building size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 group-focus-within:text-[#4a7c59] transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="Your Company"
                                        className="w-full pl-12 pr-5 py-3.5 bg-white border-2 border-[#1a3a2e]/5 rounded-2xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/10 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider ml-4">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 group-focus-within:text-[#4a7c59] transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="isaac@company.com"
                                    className="w-full pl-12 pr-5 py-3.5 bg-white border-2 border-[#1a3a2e]/5 rounded-2xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider ml-4">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 group-focus-within:text-[#4a7c59] transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-[#1a3a2e]/5 rounded-2xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/10 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 hover:text-[#1a3a2e] transition-colors outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider ml-4">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 group-focus-within:text-[#4a7c59] transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-5 py-3.5 bg-white border-2 border-[#1a3a2e]/5 rounded-2xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:ring-4 focus:ring-[#4a7c59]/10 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="px-1">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" required className="peer appearance-none w-5 h-5 rounded border-2 border-[#1a3a2e]/20 text-[#4a7c59] checked:bg-[#4a7c59] checked:border-[#4a7c59] transition-all cursor-pointer" />
                                    <CheckCircle2 size={12} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                </div>
                                <span className="text-sm text-[#1a3a2e]/60 font-medium">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-[#4a7c59] font-bold hover:underline">Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" className="text-[#4a7c59] font-bold hover:underline">Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-[#4a7c59] text-white rounded-2xl font-bold text-base hover:bg-[#3d6849] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#4a7c59]/20 hover:shadow-xl hover:shadow-[#4a7c59]/30 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create account <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="text-center mt-8">
                        <p className="text-[#1a3a2e]/60 font-medium">
                            Already have an account?{' '}
                            <Link href="/login" className="text-[#4a7c59] font-bold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
