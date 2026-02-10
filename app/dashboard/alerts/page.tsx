'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Bell, Filter, Eye, MoreHorizontal } from 'lucide-react';
import { Alert } from '@/app/lib/data';
import Toast, { ToastType } from '@/app/components/Toast';

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [filterSeverity, setFilterSeverity] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch('/api/alerts');
                const data = await res.json();
                setAlerts(data);
            } catch (error) {
                console.error("Error fetching alerts:", error);
                setToast({ message: "Error loading alerts", type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchAlerts();
    }, []);

    const filteredAlerts = filterSeverity
        ? alerts.filter(a => a.severity === filterSeverity)
        : alerts;

    const handleResolve = (id: string) => {
        // Simulate API call to resolve
        setAlerts(prev => prev.filter(a => a.id !== id));
        setToast({ message: "Alert resolved successfully", type: 'success' });
    };

    const handleMarkAllRead = () => {
        setToast({ message: "All alerts marked as read", type: 'success' });
    };

    const handleFilterToggle = () => {
        if (filterSeverity === null) setFilterSeverity('Critical');
        else if (filterSeverity === 'Critical') setFilterSeverity('Warning');
        else setFilterSeverity(null);

        setToast({
            message: filterSeverity === null ? "Showing Critical only" :
                filterSeverity === 'Critical' ? "Showing Warnings only" : "Showing all alerts",
            type: 'info'
        });
    };

    const handleViewDetails = (id: string) => {
        setToast({ message: `Viewing details for alert ${id}`, type: 'info' });
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#4a7c59] rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500 font-medium">Loading Alerts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">System Alerts</h2>
                    <p className="text-gray-500 text-sm">Monitor and manage critical system notifications</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleFilterToggle}
                        className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${filterSeverity
                                ? 'bg-gray-100 border-gray-300 text-gray-900'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Filter size={16} />
                        Filter Severity {filterSeverity ? `(${filterSeverity})` : ''}
                    </button>
                    <button
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors active:scale-95"
                    >
                        <CheckCircle2 size={16} />
                        Mark All Read
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {filteredAlerts.length > 0 ? (
                    filteredAlerts.map((alert) => (
                        <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-xl border animate-slide-up ${alert.severity === 'Critical'
                                ? 'bg-red-50 border-red-100'
                                : alert.severity === 'Warning'
                                    ? 'bg-orange-50 border-orange-100'
                                    : 'bg-blue-50 border-blue-100'
                            }`}>
                            <div className={`p-2 rounded-full shrink-0 ${alert.severity === 'Critical'
                                    ? 'bg-red-100 text-red-600'
                                    : alert.severity === 'Warning'
                                        ? 'bg-orange-100 text-orange-600'
                                        : 'bg-blue-100 text-blue-600'
                                }`}>
                                <AlertTriangle size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`text-base font-semibold ${alert.severity === 'Critical' ? 'text-red-900' :
                                            alert.severity === 'Warning' ? 'text-orange-900' : 'text-blue-900'
                                        }`}>
                                        {alert.type}: {alert.storageName}
                                    </h3>
                                    <span className="text-xs text-gray-500 whitespace-nowrap">{new Date(alert.timestamp).toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleViewDetails(alert.id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                                    >
                                        <Eye size={14} />
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleResolve(alert.id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                                    >
                                        <CheckCircle2 size={14} />
                                        Resolve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200 animate-fade-in">
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">All Systems Normal</h3>
                        <p className="text-gray-500">No active alerts matching your filter.</p>
                        {filterSeverity && (
                            <button
                                onClick={() => setFilterSeverity(null)}
                                className="mt-4 text-[#4a7c59] font-medium hover:underline text-sm"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
