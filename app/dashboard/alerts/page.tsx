'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, Filter, Eye, X, Clock } from 'lucide-react';
import { Alert } from '@/app/lib/data';
import Toast, { ToastType } from '@/app/components/Toast';

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [filterSeverity, setFilterSeverity] = useState<string | null>(null);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
    const [showDetails, setShowDetails] = useState(false);

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

    const handleResolve = (id: string, name: string) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
        setToast({ message: `Alert for ${name} resolved`, type: 'success' });
        if (selectedAlert?.id === id) {
            setShowDetails(false);
            setSelectedAlert(null);
        }
    };

    const handleMarkAllRead = () => {
        setToast({ message: `Marked ${alerts.length} alerts as read`, type: 'success' });
    };

    const handleCycleSeverityFilter = () => {
        if (filterSeverity === null) {
            setFilterSeverity('Critical');
        } else if (filterSeverity === 'Critical') {
            setFilterSeverity('Warning');
        } else if (filterSeverity === 'Warning') {
            setFilterSeverity('Info');
        } else {
            setFilterSeverity(null);
        }
    };

    const handleViewDetails = (alert: Alert) => {
        setSelectedAlert(alert);
        setShowDetails(true);
    };

    const handleResolveAll = () => {
        const count = filteredAlerts.length;
        setAlerts(prev => prev.filter(a => !filteredAlerts.includes(a)));
        setToast({ message: `Resolved ${count} alert${count !== 1 ? 's' : ''}`, type: 'success' });
        setShowDetails(false);
        setSelectedAlert(null);
    };

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
                        onClick={handleCycleSeverityFilter}
                        className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${filterSeverity
                                ? 'bg-gray-100 border-gray-300 text-gray-900'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Filter size={16} />
                        {filterSeverity ? `${filterSeverity} Only` : 'All Severities'}
                    </button>
                    <button
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors active:scale-95"
                    >
                        <CheckCircle2 size={16} />
                        Mark All Read
                    </button>
                    {filteredAlerts.length > 0 && (
                        <button
                            onClick={handleResolveAll}
                            className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors active:scale-95"
                        >
                            Resolve All ({filteredAlerts.length})
                        </button>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Alerts List */}
                <div className={`space-y-4 ${showDetails ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                    {filteredAlerts.length > 0 ? (
                        filteredAlerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${selectedAlert?.id === alert.id
                                        ? 'ring-2 ring-[#4a7c59] border-[#4a7c59]'
                                        : ''
                                    } ${alert.severity === 'Critical'
                                        ? 'bg-red-50 border-red-100 hover:bg-red-100'
                                        : alert.severity === 'Warning'
                                            ? 'bg-orange-50 border-orange-100 hover:bg-orange-100'
                                            : 'bg-blue-50 border-blue-100 hover:bg-blue-100'
                                    }`}
                                onClick={() => handleViewDetails(alert)}
                            >
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
                                        <span className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-1">
                                            <Clock size={12} />
                                            {new Date(alert.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewDetails(alert);
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                                        >
                                            <Eye size={14} />
                                            Details
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleResolve(alert.id, alert.storageName);
                                            }}
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

                {/* Alert Details Panel */}
                {showDetails && selectedAlert && (
                    <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm animate-scale-in sticky top-6 h-fit">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Alert Details</h3>
                            <button
                                onClick={() => {
                                    setShowDetails(false);
                                    setSelectedAlert(null);
                                }}
                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Severity</p>
                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${selectedAlert.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                                        selectedAlert.severity === 'Warning' ? 'bg-orange-100 text-orange-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    {selectedAlert.severity}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Type</p>
                                <p className="text-gray-900 font-medium">{selectedAlert.type}</p>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Location</p>
                                <p className="text-gray-900 font-medium">{selectedAlert.storageName}</p>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Message</p>
                                <p className="text-gray-700">{selectedAlert.message}</p>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Timestamp</p>
                                <p className="text-gray-700">{new Date(selectedAlert.timestamp).toLocaleString()}</p>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleResolve(selectedAlert.id, selectedAlert.storageName)}
                                    className="w-full py-3 bg-[#4a7c59] text-white rounded-xl font-bold hover:bg-[#3d6849] transition-colors"
                                >
                                    Resolve This Alert
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
