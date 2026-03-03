'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    Package, Search, Filter, Plus, MoreVertical,
    ChevronLeft, ChevronRight, ArrowUpDown, Trash2,
    Edit, ExternalLink, MapPin, Thermometer, Droplets,
    Wind, AlertCircle
} from 'lucide-react';
import { SensorData } from '@/app/lib/data';
import Toast, { ToastType } from '@/app/components/Toast';

export default function InventoryPage() {
    const [inventory, setInventory] = useState<SensorData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [sortField, setSortField] = useState<'name' | 'temperature' | 'humidity'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await fetch('/api/sensors');
                const data = await res.json();
                setInventory(data);
            } catch (error) {
                console.error("Error fetching inventory:", error);
                setToast({ message: "Failed to load Simba ecosystem data", type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchInventory();
    }, []);

    const filteredAndSortedInventory = useMemo(() => {
        let filtered = inventory.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
            const matchesType = typeFilter === 'all' || item.type === typeFilter;
            return matchesSearch && matchesStatus && matchesType;
        });

        filtered.sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];
            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();

            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [inventory, searchTerm, statusFilter, typeFilter, sortField, sortDirection]);

    const totalPages = Math.ceil(filteredAndSortedInventory.length / itemsPerPage);
    const paginatedInventory = filteredAndSortedInventory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (field: 'name' | 'temperature' | 'humidity') => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleDeleteItem = (id: string, name: string) => {
        setInventory(prev => prev.filter(item => item.id !== id));
        setToast({ message: `Purged ${name} from active monitoring`, type: 'success' });
        if (paginatedInventory.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAddItem = () => {
        setToast({ message: "Integration modal locked. Use 'Simba Developer Portal' to add more nodes.", type: 'info' });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 border-8 border-gray-100 border-t-[#4a7c59] rounded-full animate-spin"></div>
                    <p className="text-lg font-black text-[#1a3a2e] animate-pulse">Syncing Simba Ecosystem...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-[#1a3a2e]">Real-time Inventory</h2>
                    <p className="text-gray-500 font-medium">Monitoring shelf-life and ambient conditions across Simba SuperMarket</p>
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-96">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search units, locations, or status..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#4a7c59] focus:shadow-xl transition-all"
                        />
                    </div>
                    <button
                        onClick={handleAddItem}
                        className="flex items-center gap-2 px-6 py-3.5 bg-[#4a7c59] text-white rounded-2xl font-black text-sm hover:bg-[#3d6849] transition-all shadow-lg active:scale-95 shrink-0"
                    >
                        <Plus size={20} />
                        Add Node
                    </button>
                </div>
            </div>

            {/* Quick Stats / Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 hover:shadow-2xl transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                            <Package size={28} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Units</p>
                            <h4 className="text-3xl font-black text-[#1a3a2e]">{inventory.length}</h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 hover:shadow-2xl transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                            <AlertCircle size={28} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Risks Detected</p>
                            <h4 className="text-3xl font-black text-[#1a3a2e]">{inventory.filter(i => i.status !== 'Fresh').length}</h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 hover:shadow-2xl transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <MapPin size={28} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Locations</p>
                            <h4 className="text-3xl font-black text-[#1a3a2e]">3 Sites</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${statusFilter === 'all' ? 'bg-[#1a3a2e] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                        >
                            All Nodes
                        </button>
                        <button
                            onClick={() => setStatusFilter('Fresh')}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${statusFilter === 'Fresh' ? 'bg-green-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                        >
                            Fresh Only
                        </button>
                        <button
                            onClick={() => setStatusFilter('Spoiled')}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${statusFilter === 'Spoiled' ? 'bg-red-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                        >
                            Purge Needed
                        </button>
                    </div>
                    <div className="text-sm font-bold text-gray-400">
                        Total tracked: {filteredAndSortedInventory.length} items
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white border-b border-gray-50">
                                <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-1/4">
                                    <button onClick={() => handleSort('name')} className="flex items-center gap-2 hover:text-[#1a3a2e] transition-colors">
                                        Unit Description <ArrowUpDown size={12} />
                                    </button>
                                </th>
                                <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Condition</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Metrics</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Location Hub</th>
                                <th className="text-right py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedInventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${item.status === 'Fresh' ? 'bg-green-100 text-green-600 scale-100' :
                                                    item.status === 'At Risk' ? 'bg-orange-100 text-orange-600' :
                                                        'bg-red-600 text-white shadow-lg shadow-red-200 animate-pulse'
                                                }`}>
                                                <Package size={22} />
                                            </div>
                                            <div>
                                                <p className="font-black text-[#1a3a2e] text-lg leading-tight">{item.name}</p>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{item.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Fresh' ? 'bg-green-50 text-green-700' :
                                                item.status === 'At Risk' ? 'bg-orange-50 text-orange-700' :
                                                    'bg-red-50 text-red-700'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Fresh' ? 'bg-green-500' :
                                                    item.status === 'At Risk' ? 'bg-orange-500' :
                                                        'bg-red-500'
                                                }`} />
                                            {item.status}
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-1.5 group/metric" title="Temperature">
                                                <Thermometer size={14} className="text-gray-300 group-hover/metric:text-orange-500 transition-colors" />
                                                <span className="text-sm font-black text-[#1a3a2e]">{item.temperature}°C</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 group/metric" title="Humidity">
                                                <Droplets size={14} className="text-gray-300 group-hover/metric:text-blue-500 transition-colors" />
                                                <span className="text-sm font-black text-[#1a3a2e]">{item.humidity}%</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 group/metric" title="Gas Composition">
                                                <Wind size={14} className="text-gray-300 group-hover/metric:text-[#4a7c59] transition-colors" />
                                                <span className="text-sm font-black text-[#1a3a2e] underline decoration-dotted decoration-gray-200">{item.gasLevel}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm font-bold">
                                            <MapPin size={14} className="text-[#4a7c59]" />
                                            {item.location || 'Central Warehouse'}
                                        </div>
                                    </td>
                                    <td className="py-6 px-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                            <button
                                                onClick={() => setToast({ message: `Accessing Node ${item.id} debug console...`, type: 'info' })}
                                                className="p-3 bg-white text-[#1a3a2e] rounded-xl border border-gray-100 hover:border-[#1a3a2e] transition-all shadow-sm"
                                            >
                                                <ExternalLink size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteItem(item.id, item.name)}
                                                className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
                    <p className="text-sm font-bold text-gray-500">
                        Node Cluster Index: <span className="text-[#1a3a2e]">{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedInventory.length)}</span> of {filteredAndSortedInventory.length}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-3 rounded-xl bg-white border border-gray-100 text-gray-600 hover:bg-[#1a3a2e] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm group"
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div className="flex items-center gap-2 px-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === page
                                            ? 'bg-[#1a3a2e] text-white shadow-xl shadow-black/20 scale-110'
                                            : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-xl bg-white border border-gray-100 text-gray-600 hover:bg-[#1a3a2e] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm group"
                        >
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
