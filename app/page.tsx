'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingCart, Leaf, Sprout, Tractor, Shovel, ChevronRight, Star, Shield } from 'lucide-react';

const categories = [
  { name: 'Fresh Produce', icon: Leaf, count: '120+ Items', color: 'bg-green-50 text-green-700' },
  { name: 'Seeds & Bulbs', icon: Sprout, count: '450+ Varieties', color: 'bg-emerald-50 text-emerald-700' },
  { name: 'Farm Machinery', icon: Tractor, count: '80+ Models', color: 'bg-blue-50 text-blue-700' },
  { name: 'Hand Tools', icon: Shovel, count: '200+ Tools', color: 'bg-orange-50 text-orange-700' },
];

const products = [
  {
    name: 'Organic Kale Seeds',
    category: 'Seeds',
    price: '12.99',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1524179524541-1da09874b335?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Garden Digging Fork',
    category: 'Tools',
    price: '45.00',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Hydroponic Nutrients',
    category: 'Growth',
    price: '29.50',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Smart Irrigation Kit',
    category: 'Tech',
    price: '199.99',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section - Marketplace Style */}
      <section className="px-6 py-12 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-green-50 rounded-[48px] overflow-hidden relative border border-green-100/50 shadow-2xl shadow-green-900/5 isolate z-0">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-12 md:p-20 space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-xs font-black uppercase tracking-widest">
                  <Star size={12} fill="currentColor" />
                  Farm to Fork Protection
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
                  End Food <span className="text-green-600">Waste</span> <br />
                  Everywhere.
                </h1>
                <p className="text-lg text-slate-500 max-w-md font-medium leading-relaxed">
                  ALMA is the intelligent sensor network that protects your produce in storage,
                  secures it during transport, and monitors it at the supermarket.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/dashboard"
                    className="px-8 py-5 bg-green-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-green-600/30 hover:bg-green-700 transition-all flex items-center gap-3 active:scale-95"
                  >
                    Launch Dashboard <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/shop"
                    className="px-8 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm active:scale-95"
                  >
                    Browse Produce <ShoppingCart size={20} />
                  </Link>
                </div>
              </div>
              <div className="h-full relative hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"
                  alt="Simba Supermarket Freshness"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent"></div>

                {/* Floating Badge */}
                <div className="absolute top-10 right-10 bg-white/90 backdrop-blur p-6 rounded-3xl shadow-xl border border-white/50 max-w-[200px] animate-slide-up">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="#ef4444" className="text-red-500" />)}
                  </div>
                  <p className="text-sm font-black text-slate-900 leading-tight mb-2">"ALMA reduced our transport losses by 40%."</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">James M.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle Grid */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">The ALMA Ecosystem</h2>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">Zero Waste from Farm to Fork</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[48px] bg-slate-50 border border-slate-100 group hover:bg-green-600 transition-all duration-500 cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors">
                <Tractor size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors uppercase tracking-tight">Smart Storage</h3>
              <p className="text-slate-500 group-hover:text-white/80 transition-colors font-medium">Monitoring temperature and molecular indices at the farm level to extend post-harvest life.</p>
            </div>

            <div className="p-10 rounded-[48px] bg-slate-50 border border-slate-100 group hover:bg-green-600 transition-all duration-500 cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors">
                <ArrowRight size={32} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors uppercase tracking-tight">Secure Transit</h3>
              <p className="text-slate-500 group-hover:text-white/80 transition-colors font-medium">Real-time tracking of logistics conditions to ensure zero shocks or spoilage during transport.</p>
            </div>

            <div className="p-10 rounded-[48px] bg-slate-50 border border-slate-100 group hover:bg-green-600 transition-all duration-500 cursor-pointer">
              <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors">
                <ShoppingCart size={32} className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors uppercase tracking-tight">Retail Analytics</h3>
              <p className="text-slate-500 group-hover:text-white/80 transition-colors font-medium">Empowering supermarkets like Simba with real-time freshness data to optimize sales and Reduce waste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Marketplace Selection</h2>
            <p className="text-lg text-slate-500 font-medium">Verified fresh produce from ALMA-monitored farms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((prod, i) => (
              <div key={i} className="bg-white p-4 rounded-[32px] shadow-sm hover:shadow-2xl transition-all group border border-slate-100">
                <div className="h-64 rounded-[24px] overflow-hidden mb-6 relative isolate z-0">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0 -z-10" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                    {prod.category}
                  </div>
                </div>
                <div className="px-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">{prod.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star size={14} fill="#fbbf24" className="text-yellow-400" />
                      <span className="text-sm font-bold text-slate-500">{prod.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <p className="text-2xl font-black text-green-700">${prod.price}</p>
                    <button className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg shadow-slate-900/10 active:scale-90">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center">
              <Leaf className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Sustainable Tech</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Molecular monitoring to ensure zero waste and maximum freshness across the entire chain.</p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center">
              <Shield className="text-slate-900" size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Quality Guaranteed</h3>
            <p className="text-slate-500 leading-relaxed font-medium">All products are monitored 24/7 to guarantee origin and safety from farm to fork.</p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center">
              <Tractor className="text-orange-600" size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Predictive Loss</h3>
            <p className="text-slate-500 leading-relaxed font-medium">AI identifies potential spoilage up to 72 hours before it becomes visible to the human eye.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
