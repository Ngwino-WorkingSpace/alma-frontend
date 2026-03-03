'use client';

import { useState } from 'react';
import {
    User, Bell, Lock, Globe, Palette, Database,
    Shield, Mail, Save, CheckCircle2, Layout,
    Link as LinkIcon, ExternalLink, RefreshCw,
    Store, Warehouse
} from 'lucide-react';
import Toast, { ToastType } from '@/app/components/Toast';

type TabType = 'profile' | 'notifications' | 'security' | 'integrations' | 'preferences';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);

    const [settings, setSettings] = useState({
        // Profile
        name: 'Niyobyose ISAAC',
        email: 'niyobyose.isaac@alma.com',
        company: 'ALMA Systems',
        role: 'Administrator',

        // Notifications
        emailNotifications: true,
        pushNotifications: true,
        alertThreshold: 'medium',

        // Security
        twoFactorAuth: false,
        sessionTimeout: '30',

        // Preferences
        language: 'en',
        timezone: 'Africa/Kigali',
        theme: 'light',

        // Integrations
        simbaEnabled: true,
        simbaLocation: 'Kigali - Town Center',
        syncInterval: '5',
    });

    const handleSave = (section: string) => {
        setToast({ message: `${section} settings saved successfully!`, type: 'success' });
    };

    const handleChange = (field: string, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setToast({ message: 'Synchronized with Simba SuperMarket successfully!', type: 'success' });
        }, 2000);
    };

    const tabs = [
        { id: 'profile', icon: User, label: 'Profile' },
        { id: 'notifications', icon: Bell, label: 'Notifications' },
        { id: 'security', icon: Shield, label: 'Security' },
        { id: 'integrations', icon: LinkIcon, label: 'Integrations' },
        { id: 'preferences', icon: Globe, label: 'Preferences' }
    ];

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black text-[#1a3a2e]">Settings</h2>
                <p className="text-gray-500 font-medium">Configure your ALMA dashboard and external integrations</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:w-64 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-[#1a3a2e] text-white shadow-lg shadow-[#1a3a2e]/20'
                                    : 'text-gray-500 hover:bg-white hover:text-[#1a3a2e]'
                                }`}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Profile Section */}
                    {activeTab === 'profile' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                                <h3 className="text-xl font-black text-[#1a3a2e]">Profile Information</h3>
                                <p className="text-gray-500 text-sm">Update your personal account details and public identity</p>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={settings.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#4a7c59] focus:bg-white focus:outline-none transition-all text-[#1a3a2e] font-bold shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={settings.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#4a7c59] focus:bg-white focus:outline-none transition-all text-[#1a3a2e] font-bold shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Company</label>
                                        <input
                                            type="text"
                                            value={settings.company}
                                            onChange={(e) => handleChange('company', e.target.value)}
                                            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#4a7c59] focus:bg-white focus:outline-none transition-all text-[#1a3a2e] font-bold shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Account Role</label>
                                        <div className="w-full px-5 py-4 bg-gray-100 border-2 border-transparent rounded-2xl text-gray-500 font-bold flex items-center gap-2">
                                            <Shield size={18} />
                                            {settings.role}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={() => handleSave('Profile')}
                                        className="flex items-center gap-2 px-8 py-4 bg-[#1a3a2e] text-white rounded-2xl font-bold hover:bg-[#4a7c59] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Section */}
                    {activeTab === 'notifications' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                                <h3 className="text-xl font-black text-[#1a3a2e]">Notifications</h3>
                                <p className="text-gray-500 text-sm">Control how and when you receive system alerts</p>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div>
                                            <p className="font-bold text-[#1a3a2e]">Email Notifications</p>
                                            <p className="text-sm text-gray-500">Receive detailed reports via email</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.emailNotifications}
                                                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4a7c59]"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div>
                                            <p className="font-bold text-[#1a3a2e]">Push Notifications</p>
                                            <p className="text-sm text-gray-500">Get instant alerts on your mobile device</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.pushNotifications}
                                                onChange={(e) => handleChange('pushNotifications', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4a7c59]"></div>
                                        </label>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Alert Sensitivity</label>
                                        <select
                                            value={settings.alertThreshold}
                                            onChange={(e) => handleChange('alertThreshold', e.target.value)}
                                            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#4a7c59] focus:bg-white focus:outline-none transition-all text-[#1a3a2e] font-bold shadow-sm appearance-none"
                                        >
                                            <option value="low">Low Sensitivity (Only Critical)</option>
                                            <option value="medium">Medium Sensitivity (Normal)</option>
                                            <option value="high">High Sensitivity (All Fluctuations)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={() => handleSave('Notifications')}
                                        className="flex items-center gap-2 px-8 py-4 bg-[#1a3a2e] text-white rounded-2xl font-bold hover:bg-[#4a7c59] transition-all shadow-lg hover:shadow-xl"
                                    >
                                        <Save size={18} />
                                        Update Preferences
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Integrations Section */}
                    {activeTab === 'integrations' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                                <h3 className="text-xl font-black text-[#1a3a2e]">Partner Integrations</h3>
                                <p className="text-gray-500 text-sm">Connect ALMA with your retail and logistics partners</p>
                            </div>
                            <div className="p-8 space-y-8">
                                {/* Simba SuperMarket Integration Card */}
                                <div className="p-8 border-2 border-gray-100 rounded-[32px] bg-white hover:border-[#fc7d00]/20 transition-all group">
                                    <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                                        <div className="flex gap-6 items-center">
                                            <div className="w-16 h-16 bg-[#fc7d00] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#fc7d00]/20 group-hover:scale-110 transition-transform">
                                                <Store size={32} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-2xl font-black text-[#1a3a2e]">Simba SuperMarket</h4>
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full">Connected</span>
                                                </div>
                                                <p className="text-gray-500 font-medium">Retailer Integration • Town Center Hub</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleSync}
                                            disabled={isSyncing}
                                            className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-[#1a3a2e] rounded-xl font-bold hover:bg-[#fc7d00] hover:text-white transition-all border border-gray-100 active:scale-95 disabled:opacity-50"
                                        >
                                            <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
                                            {isSyncing ? 'Syncing...' : 'Sync Data Now'}
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-50">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Store Location</label>
                                            <select
                                                value={settings.simbaLocation}
                                                onChange={(e) => handleChange('simbaLocation', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#fc7d00] focus:bg-white focus:outline-none transition-all text-[#1a3a2e] font-bold shadow-sm"
                                            >
                                                <option value="Kigali - Town Center">Kigali - Town Center (Main)</option>
                                                <option value="Gisenyi - Waterfront">Gisenyi - Waterfront</option>
                                                <option value="Musanze - Hub">Musanze - Hub</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Cloud Sync Interval (Min)</label>
                                            <input
                                                type="number"
                                                value={settings.syncInterval}
                                                onChange={(e) => handleChange('syncInterval', e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#fc7d00] focus:bg-white focus:outline-none transition-all text-[#1a3a2e] font-bold shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                                            <Warehouse size={16} className="text-[#fc7d00]" />
                                            Active Sensors: <span className="text-[#1a3a2e] font-black">24 units</span>
                                        </div>
                                        <a href="https://simba-retail.com/dashboard" target="_blank" className="flex items-center gap-1 text-[#fc7d00] font-black hover:underline cursor-pointer">
                                            Open Simba Dashboard <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>

                                {/* Placeholder for other partners */}
                                <div className="p-8 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center text-center py-12 group hover:border-[#4a7c59] transition-all cursor-pointer">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4 group-hover:bg-[#4a7c59]/10 group-hover:text-[#4a7c59] transition-all">
                                        <LinkIcon size={24} />
                                    </div>
                                    <h5 className="font-bold text-[#1a3a2e]">Add New Integration</h5>
                                    <p className="text-xs text-gray-500 mt-1">Connect with Amazon Fresh, Walmart, or Local Co-ops</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Section (Brief for demo) */}
                    {activeTab === 'security' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-8">
                            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-900">Security Access Locked</h4>
                                    <p className="text-sm text-red-700 mt-1">Please re-verify your identity to access enhanced security settings including 2FA and API key management.</p>
                                    <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                                        Verify Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preferences Section (Brief for demo) */}
                    {activeTab === 'preferences' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Dashboard Language</label>
                                    <select
                                        value={settings.language}
                                        onChange={(e) => handleChange('language', e.target.value)}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#4a7c59] focus:bg-white focus:outline-none transition-all text-[#1a3a2e] font-bold shadow-sm"
                                    >
                                        <option value="en">English (US)</option>
                                        <option value="fr">Français</option>
                                        <option value="rw">Kinyarwanda</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Theme</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleChange('theme', 'light')}
                                            className={`p-4 rounded-2xl border-2 flex items-center gap-2 font-bold transition-all ${settings.theme === 'light' ? 'border-[#4a7c59] bg-white text-[#4a7c59]' : 'border-gray-100 bg-gray-50 text-gray-500'}`}
                                        >
                                            <Globe size={18} /> Light
                                        </button>
                                        <button
                                            onClick={() => handleChange('theme', 'dark')}
                                            className={`p-4 rounded-2xl border-2 flex items-center gap-2 font-bold transition-all ${settings.theme === 'dark' ? 'border-[#4a7c59] bg-white text-[#4a7c59]' : 'border-gray-100 bg-gray-50 text-gray-500'}`}
                                        >
                                            <Palette size={18} /> Dark
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
