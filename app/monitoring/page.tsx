'use client';

import { useState, useEffect } from 'react';
import {
    Database, Thermometer, Droplets, Wind,
    MapPin, CheckCircle2, AlertTriangle, XCircle, Search, Filter
} from 'lucide-react';
import { SensorData } from '@/app/lib/data';

export default function MonitoringPage() {
    const [sensors, setSensors] = useState<SensorData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/sensors');
                const data = await res.json();
                setSensors(data);
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredSensors = sensors.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Fresh': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
            case 'At Risk': return 'text-amber-500 bg-amber-50 border-amber-100';
            case 'Spoiled': return 'text-red-500 bg-red-50 border-red-100';
            default: return 'text-slate-500 bg-slate-50 border-slate-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Fresh': return <CheckCircle2 size={16} />;
            case 'At Risk': return <AlertTriangle size={16} />;
            case 'Spoiled': return <XCircle size={16} />;
            default: return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Storage Monitoring</h1>
                    <p className="text-slate-500">Inventory locations and their atmospheric conditions.</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search units..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64 bg-white"
                        />
                    </div>
                    <button className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50">
                        <Filter size={20} className="text-slate-600" />
                    </button>
                </div>
            </header>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[32px]"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSensors.map((node) => (
                        <div key={node.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6 card-hover group">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                        <Database size={14} />
                                        {node.type}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{node.name}</h3>
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(node.status)}`}>
                                    {getStatusIcon(node.status)}
                                    {node.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-y border-slate-50 py-6">
                                <div className="text-center space-y-1">
                                    <Thermometer size={20} className="mx-auto text-blue-500" />
                                    <p className="text-2xl font-bold text-slate-900">{node.temperature}°</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Temp</p>
                                </div>
                                <div className="text-center space-y-1 border-x border-slate-50">
                                    <Droplets size={20} className="mx-auto text-emerald-500" />
                                    <p className="text-2xl font-bold text-slate-900">{node.humidity}%</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Humid</p>
                                </div>
                                <div className="text-center space-y-1">
                                    <Wind size={20} className="mx-auto text-purple-500" />
                                    <p className="text-lg font-bold text-slate-900 mt-1">{node.gasLevel}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Gas</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                                <div className="flex items-center gap-1">
                                    <MapPin size={12} />
                                    Zone A-12
                                </div>
                                <div>Updated 2m ago</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {filteredSensors.length === 0 && !isLoading && (
                <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-300">
                    <Database size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium text-lg">No monitoring nodes found matching your search.</p>
                </div>
            )}
        </div>
    );
}
