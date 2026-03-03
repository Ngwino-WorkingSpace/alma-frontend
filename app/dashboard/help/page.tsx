'use client';

import { useState } from 'react';
import {
    Search, Book, MessageCircle, Mail, Phone,
    ExternalLink, ChevronDown, ChevronUp, PlayCircle,
    ShieldCheck, HelpCircle, Store, Cpu
} from 'lucide-react';
import Toast, { ToastType } from '@/app/components/Toast';

export default function HelpPage() {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const faqs = [
        {
            question: "How do I integrate ALMA sensors into Simba SuperMarket shelves?",
            answer: "Visit the 'Integrations' tab in Settings to connect your Simba API key. Then, go to Inventory > Add Item and select 'Simba - Point of Sale' as the storage type."
        },
        {
            question: "What is the 72-hour early warning system?",
            answer: "Our AI model predicts spoilage 3 days before it's visible. You'll receive a 'Warning' alert when molecular shifts indicate the start of degradation."
        },
        {
            question: "How do I recalibrate sensors for high-moisture areas?",
            answer: "Open the specific sensor view, click 'Calibrate', and select the 'Fruit & Veg' preset. This adjusts the sensitivity for natural condensation."
        },
        {
            question: "Can I share analytics with my retail partners?",
            answer: "Yes. From the Analytics page, click 'Export' and select 'Partner Format'. This generates a simplified report optimized for store managers."
        }
    ];

    const resources = [
        {
            title: "Simba Integration Guide",
            description: "Step-by-step setup for Simba SuperMarket retail endpoints",
            icon: Store,
            color: 'text-[#fc7d00]',
            bg: 'bg-[#fc7d00]/10'
        },
        {
            title: "Sensor Calibration",
            description: "Advanced techniques for molecular monitoring accuracy",
            icon: Cpu,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            title: "ALMA University",
            description: "Certified training courses for your operations team",
            icon: PlayCircle,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        },
        {
            title: "Compliance Forms",
            description: "FDA and International food safety documentation",
            icon: ShieldCheck,
            color: 'text-[#4a7c59]',
            bg: 'bg-[#4a7c59]/10'
        }
    ];

    const handleContactSubmit = (method: string) => {
        setToast({ message: `Initiating secure ${method} tunnel...`, type: 'info' });
    };

    return (
        <div className="space-y-12 max-w-6xl mx-auto pb-20">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="text-center space-y-4 max-w-2xl mx-auto pb-8">
                <h2 className="text-4xl font-black text-[var(--primary)]">Knowledge Center</h2>
                <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-widest text-[10px]">Find answers, learn the platform, or get dedicated support</p>
                <div className="relative mt-8">
                    <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for articles, guides, or troubleshooting steps..."
                        className="w-full pl-14 pr-6 py-5 bg-[var(--card)] border-2 border-[var(--border)] rounded-[24px] text-lg font-black focus:outline-none focus:border-[var(--primary-light)] focus:shadow-2xl focus:shadow-[var(--primary-light)]/10 transition-all text-[var(--primary)] placeholder:text-[var(--muted-foreground)]/40"
                    />
                </div>
            </div>

            {/* Quick Support Toggles */}
            <div className="grid md:grid-cols-4 gap-4">
                {resources.map((resource, index) => (
                    <button
                        key={index}
                        className="bg-[var(--card)] p-6 rounded-[28px] border border-[var(--border)] hover:border-[var(--primary-light)]/20 hover:shadow-2xl hover:-translate-y-1 transition-all text-left flex flex-col gap-4 group"
                    >
                        <div className={`w-14 h-14 ${resource.bg} ${resource.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                            <resource.icon size={28} />
                        </div>
                        <div>
                            <h4 className="font-black text-[var(--primary)] mb-1 group-hover:text-[var(--primary-light)] transition-colors">{resource.title}</h4>
                            <p className="text-[10px] text-[var(--muted-foreground)] font-bold uppercase tracking-wider line-clamp-2 leading-relaxed">{resource.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* FAQs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <HelpCircle size={20} className="text-[var(--primary-light)]" />
                        <h3 className="text-xl font-black text-[var(--primary)]">Frequently Asked Questions</h3>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-[var(--card)] rounded-[24px] border border-[var(--border)] overflow-hidden hover:border-[var(--primary-light)]/30 transition-all shadow-sm">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                >
                                    <span className="font-bold text-[var(--primary)] group-hover:text-[var(--primary-light)] transition-colors">{faq.question}</span>
                                    {expandedFaq === index ? (
                                        <ChevronUp size={20} className="text-[var(--primary-light)]" />
                                    ) : (
                                        <ChevronDown size={20} className="text-[var(--muted-foreground)]/30 group-hover:text-[var(--primary-light)]" />
                                    )}
                                </button>
                                {expandedFaq === index && (
                                    <div className="px-8 pb-8 text-gray-500 font-medium text-sm leading-relaxed animate-in slide-in-from-top-2 duration-300">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Support Sidebar */}
                <div className="space-y-6">
                    <div className="bg-[#1a3a2e] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
                        {/* Decorative background circle */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#4a7c59]/20 rounded-full blur-3xl" />

                        <div className="relative z-10 space-y-6">
                            <div>
                                <h3 className="text-2xl font-black mb-2">Still stuck?</h3>
                                <p className="text-white/60 text-sm font-medium">Our global support team is available 24/7 for critical issues.</p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleContactSubmit('Live Chat')}
                                    className="w-full py-4 bg-white text-[#1a3a2e] rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-[#4a7c59] hover:text-white transition-all shadow-xl shadow-black/20"
                                >
                                    <MessageCircle size={18} />
                                    Live Assistance
                                </button>
                                <button
                                    onClick={() => handleContactSubmit('Call')}
                                    className="w-full py-4 bg-white/10 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-white/20 transition-all border border-white/10"
                                >
                                    <Phone size={18} />
                                    Call Hotline
                                </button>
                                <button
                                    onClick={() => handleContactSubmit('Email')}
                                    className="w-full py-4 bg-transparent text-white/70 rounded-2xl font-black text-sm hover:text-white transition-all"
                                >
                                    Send an Email
                                </button>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                <span>Wait time: ~2m</span>
                                <span>Priority: Business</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                            <Book size={20} />
                        </div>
                        <div>
                            <p className="font-black text-[#1a3a2e] text-sm">Download SDK</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 underline cursor-pointer">View on GitHub</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
