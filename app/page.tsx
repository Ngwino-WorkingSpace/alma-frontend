'use client';

import Link from 'next/link';
import { ArrowRight, Star, Play, CheckCircle2, TrendingUp, Shield, Database } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2670&auto=format&fit=crop")',
            }}
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f16]/90 via-[#0a1f16]/80 to-[#0a1f16]/60" />

          {/* Floating decorative blobs */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#4a7c59]/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#8bc99d]/10 rounded-full blur-[100px] animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-left">
            {/* Trust Badges */}
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#1a3a2e] bg-gray-200 overflow-hidden">
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-[#1a3a2e] bg-[#4a7c59] flex items-center justify-center text-white text-xs font-bold">
                  +2k
                </div>
              </div>
              <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={16} fill="#fbbf24" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/60 text-sm font-medium mt-1">From 200+ partner businesses</p>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-black text-white leading-[1.05] animate-fade-in delay-100">
              Preserving freshness, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8bc99d] to-[#4a7c59]">
                extending life.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-white/70 max-w-lg leading-relaxed animate-fade-in delay-200">
              With our <strong>Blockchain-Verified</strong> molecular monitoring technology, we turn ordinary supply chains into zero-waste ecosystems powered by <strong>Artificial Intelligence</strong>.
            </p>

            {/* Location/Info Card */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-2 pr-6 rounded-full animate-fade-in delay-300 hover:bg-white/20 transition-colors cursor-default">
              <div className="w-10 h-10 bg-[#4a7c59] rounded-full flex items-center justify-center text-white shadow-lg">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Global Monitoring</p>
                <p className="text-white/60 text-xs">Active across 4 continents</p>
              </div>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="bg-[#f0f2f5] p-8 md:p-10 rounded-[32px] shadow-2xl animate-scale-in delay-200 max-w-md ml-auto w-full relative group">
            {/* Decorative sheen effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[32px] pointer-events-none" />

            <h2 className="text-2xl font-black text-[#1a3a2e] mb-6 text-center">
              Book a demo with our experts
            </h2>

            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1a3a2e]/60 uppercase tracking-wider ml-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Isaac Precieux"
                  className="w-full px-5 py-4 bg-white rounded-xl border-2 border-transparent focus:border-[#4a7c59] focus:outline-none transition-all text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1a3a2e]/60 uppercase tracking-wider ml-1">Your Email</label>
                <input
                  type="email"
                  placeholder="isaac@company.com"
                  className="w-full px-5 py-4 bg-white rounded-xl border-2 border-transparent focus:border-[#4a7c59] focus:outline-none transition-all text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1a3a2e]/60 uppercase tracking-wider ml-1">How can we help?</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your needs..."
                  className="w-full px-5 py-4 bg-white rounded-xl border-2 border-transparent focus:border-[#4a7c59] focus:outline-none transition-all text-[#1a3a2e] placeholder:text-[#1a3a2e]/30 shadow-sm resize-none"
                />
              </div>

              <button
                type="button"
                className="w-full py-4 bg-[#1a3a2e] text-white rounded-xl font-bold text-lg hover:bg-[#4a7c59] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Request a demo
              </button>

              <p className="text-center text-xs text-[#1a3a2e]/40 mt-4">
                No credit card required • Free consultation
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-[#1a3a2e] mb-4">Our Services</h2>
            <p className="text-lg text-[#1a3a2e]/60 max-w-3xl mx-auto">
              Comprehensive food preservation solutions powered by AI and molecular science
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Warehouse Monitoring",
                desc: "Real-time temperature, humidity, and ethylene tracking across your entire facility",
                icon: Database
              },
              {
                title: "Supply Chain Tracking",
                desc: "End-to-end visibility from farm to fork with predictive analytics",
                icon: TrendingUp
              },
              {
                title: "Retail Integration",
                desc: "Seamless integration with your existing POS and inventory systems",
                icon: Shield
              }
            ].map((service, i) => (
              <div key={i} className="bg-[#faf8f5] p-10 rounded-[32px] hover:bg-white hover:shadow-xl transition-all border border-[#1a3a2e]/5">
                <div className="w-16 h-16 bg-[#4a7c59] rounded-3xl flex items-center justify-center mb-6">
                  <service.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-[#1a3a2e] mb-4">{service.title}</h3>
                <p className="text-[#1a3a2e]/60 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black text-[#1a3a2e] mb-6 leading-tight">
              Reducing food waste with molecular-level precision
            </h2>
            <p className="text-lg text-[#1a3a2e]/70 leading-relaxed mb-8">
              ALMA uses advanced AI and IoT sensors to detect spoilage 72 hours before it's visible to the human eye. Our technology has helped businesses reduce waste by 94% and save millions in lost inventory.
            </p>
            <div className="space-y-4">
              {[
                '94% spoilage detection accuracy',
                '72-hour early warning system',
                'FDA-compliant monitoring',
                'Real-time alerts and insights'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-[#4a7c59]" />
                  <span className="text-[#1a3a2e] font-semibold">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[500px] rounded-[48px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80")'
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 px-6 bg-[#1a3a2e]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Ready to eliminate food waste?</h2>
          <p className="text-xl text-white/70 mb-10">Join 100+ businesses already using ALMA</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#4a7c59] text-white rounded-full font-bold text-lg hover:bg-[#3d6849] transition-all"
          >
            Get Started Today <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
