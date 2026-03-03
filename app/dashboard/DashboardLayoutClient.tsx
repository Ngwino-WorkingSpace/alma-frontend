'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Home, Users, TrendingUp, Settings, HelpCircle, Search, Bell,
    ChevronDown, Package, AlertTriangle, LogOut, Menu, X
} from 'lucide-react';
import AlmaLogo from '@/app/components/AlmaLogo';
import Toast, { ToastType } from '@/app/components/Toast';

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    useEffect(() => {
        // Check for user in localStorage
        const userData = localStorage.getItem('alma_user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Set default placeholder user if not logged in (or redirect, but for this request we want placeholder)
            setUser({
                name: 'Niyobyose ISAAC',
                email: 'niyobyose.isaac@alma.com'
            });
        }
    }, []);

    const navItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: Package, label: 'Inventory', href: '/dashboard/inventory' },
        { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics' },
        { icon: AlertTriangle, label: 'Alerts', href: '/dashboard/alerts' },
        { icon: Users, label: 'Team', href: '/dashboard/team' },
    ];

    const handleFeatureClick = (feature: string) => {
        setToast({ message: `${feature} feature coming soon!`, type: 'info' });
    }

    const handleProfileClick = () => {
        setToast({ message: "Profile settings coming soon!", type: 'info' });
    }

    return (
        <div className="flex h-screen bg-[var(--background)] overflow-hidden text-[var(--foreground)]">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--card)] border-r border-[var(--border)] transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
                        <Link href="/" className="flex items-center gap-2 group">
                            <AlmaLogo className="w-10 h-10" />
                            <span className="text-xl font-black text-[var(--primary)] uppercase tracking-tighter">ALMA</span>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="px-4 py-4">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2.5 bg-[var(--muted)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-[var(--primary-light)] focus:bg-[var(--card)] transition-all"
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-2">
                        <p className="px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Navigation</p>
                        <div className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${isActive
                                            ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                                            : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                                            }`}
                                    >
                                        <item.icon size={20} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>


                        <p className="px-3 mt-8 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Settings</p>
                        <div className="space-y-1">
                            <Link
                                href="/dashboard/settings"
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/dashboard/settings'
                                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                                    }`}
                            >
                                <Settings size={20} />
                                Settings
                            </Link>
                            <Link
                                href="/dashboard/help"
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === '/dashboard/help'
                                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                                    }`}
                            >
                                <HelpCircle size={20} />
                                Help Center
                            </Link>
                        </div>
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-[var(--border)]">
                        <div className="flex items-center gap-3 px-3 py-3 bg-[var(--muted)] rounded-2xl cursor-pointer hover:bg-[var(--border)] transition-all shadow-sm" onClick={handleProfileClick}>
                            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-full flex items-center justify-center text-white font-black text-sm shadow-md">
                                {user?.name?.charAt(0).toUpperCase() || 'N'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-black text-[var(--foreground)] truncate capitalize">{user?.name || 'Niyobyose ISAAC'}</p>
                                <p className="text-[10px] text-[var(--muted-foreground)] font-bold truncate uppercase tracking-wider">{user?.email || 'user@alma.com'}</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    localStorage.removeItem('alma_user');
                                    router.push('/login');
                                }}
                                className="text-[var(--muted-foreground)] hover:text-red-500 rounded-xl p-1.5 hover:bg-red-50 transition-all"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-[var(--card)]/80 backdrop-blur-md border-b border-[var(--border)] px-6 py-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden text-[var(--foreground)]"
                            >
                                <Menu size={24} />
                            </button>
                            <h1 className="text-2xl font-black text-[var(--primary)] tracking-tight">
                                {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleFeatureClick('Notifications')}
                                className="relative p-2.5 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)] rounded-xl transition-all active:scale-95"
                            >
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse shadow-sm"></span>
                            </button>
                            <div
                                onClick={handleProfileClick}
                                className="flex items-center gap-2 px-3 py-2 bg-[var(--muted)] border border-transparent hover:border-[var(--border)] rounded-2xl cursor-pointer hover:bg-[var(--card)] transition-all shadow-sm"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-full flex items-center justify-center text-white font-black text-xs shadow-md">
                                    {user?.name?.charAt(0).toUpperCase() || 'N'}
                                </div>
                                <span className="text-sm font-black text-[var(--foreground)] capitalize hidden sm:block">{user?.name || 'Niyobyose ISAAC'}</span>
                                <ChevronDown size={16} className="text-[var(--muted-foreground)]" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
}
