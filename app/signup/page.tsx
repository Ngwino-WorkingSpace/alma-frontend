'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Building, Eye, EyeOff } from 'lucide-react';
import AlmaLogo from '@/app/components/AlmaLogo';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
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

            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] to-[#e8f0ec] flex items-center justify-center p-6">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Branding */}
                <div className="hidden lg:block space-y-8 animate-fade-in">
                    <Link href="/" className="flex items-center gap-3 group">
                        <AlmaLogo className="w-16 h-16" />
                        <span className="text-4xl font-black text-[#1a3a2e] tracking-tight">ALMA</span>
                    </Link>

                    <div className="space-y-6">
                        <h1 className="text-5xl font-black text-[#1a3a2e] leading-tight">
                            Start your journey to<br />
                            <span className="text-[#4a7c59]">Zero Food Waste</span>
                        </h1>
                        <p className="text-lg text-[#1a3a2e]/60 leading-relaxed max-w-md">
                            Join thousands of businesses using ALMA to revolutionize their food preservation and supply chain management.
                        </p>
                    </div>

                    <div className="space-y-4 pt-8">
                        {[
                            'Real-time molecular monitoring',
                            '72-hour early spoilage detection',
                            'AI-powered predictive analytics',
                            'Blockchain-verified supply chain',
                            'Enterprise-grade security'
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-[#4a7c59] rounded-full flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-[#1a3a2e]/70 font-semibold">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="bg-white rounded-[48px] p-12 shadow-2xl border border-[#1a3a2e]/5 animate-scale-in">
                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-[#1a3a2e] mb-2">Create your account</h2>
                        <p className="text-[#1a3a2e]/60">Get started with ALMA in minutes</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider">
                                Full Name
                            </label>
                            <div className="relative">
                                <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40" />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Isaac Precieux"
                                    className="w-full pl-14 pr-5 py-3.5 bg-[#faf8f5] border-2 border-transparent rounded-3xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="isaac@company.com"
                                    className="w-full pl-14 pr-5 py-3.5 bg-[#faf8f5] border-2 border-transparent rounded-3xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Company Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider">
                                Company Name
                            </label>
                            <div className="relative">
                                <Building size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40" />
                                <input
                                    type="text"
                                    required
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="Your Company"
                                    className="w-full pl-14 pr-5 py-3.5 bg-[#faf8f5] border-2 border-transparent rounded-3xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-14 py-3.5 bg-[#faf8f5] border-2 border-transparent rounded-3xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:bg-white transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40 hover:text-[#1a3a2e] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#1a3a2e]/70 uppercase tracking-wider">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a3a2e]/40" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-5 py-3.5 bg-[#faf8f5] border-2 border-transparent rounded-3xl text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 focus:outline-none focus:border-[#4a7c59] focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-2 border-[#1a3a2e]/20 text-[#4a7c59] focus:ring-[#4a7c59]" />
                            <span className="text-sm text-[#1a3a2e]/60">
                                I agree to the{' '}
                                <Link href="/terms" className="text-[#4a7c59] font-bold hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-[#4a7c59] font-bold hover:underline">Privacy Policy</Link>
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-[#4a7c59] text-white rounded-3xl font-bold text-base hover:bg-[#3d6849] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <div className="text-center mt-6">
                        <p className="text-[#1a3a2e]/60">
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
