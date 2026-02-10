'use client';

import { Users, Mail, Phone, Plus, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import Toast, { ToastType } from '@/app/components/Toast';

const teamMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Operations Manager', email: 'alice@alma.com', phone: '+1234567890', image: 'https://i.pravatar.cc/150?u=alice' },
    { id: 2, name: 'Bob Smith', role: 'Warehouse Lead', email: 'bob@alma.com', phone: '+1987654321', image: 'https://i.pravatar.cc/150?u=bob' },
    { id: 3, name: 'Charlie Brown', role: 'Data Analyst', email: 'charlie@alma.com', phone: '+1122334455', image: 'https://i.pravatar.cc/150?u=charlie' },
];

export default function TeamPage() {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const handleInvite = () => {
        setToast({ message: "Invite sent to team member", type: 'success' });
    }

    const handleEdit = (name: string) => {
        setToast({ message: `Editing details for ${name}`, type: 'info' });
    }

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                    <p className="text-gray-500 text-sm">Manage users and access permissions</p>
                </div>
                <button
                    onClick={handleInvite}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4a7c59] text-white rounded-lg font-medium hover:bg-[#3d6849] transition-colors shadow-sm active:scale-95"
                >
                    <Plus size={20} />
                    Invite Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{member.name}</h3>
                                    <p className="text-sm text-gray-500">{member.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleEdit(member.name)}
                                className="text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#4a7c59] transition-colors cursor-pointer group/link">
                                <div className="p-2 bg-gray-50 rounded-lg group-hover/link:bg-[#4a7c59]/10 transition-colors">
                                    <Mail size={16} className="text-gray-400 group-hover/link:text-[#4a7c59]" />
                                </div>
                                {member.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#4a7c59] transition-colors cursor-pointer group/link">
                                <div className="p-2 bg-gray-50 rounded-lg group-hover/link:bg-[#4a7c59]/10 transition-colors">
                                    <Phone size={16} className="text-gray-400 group-hover/link:text-[#4a7c59]" />
                                </div>
                                {member.phone}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
