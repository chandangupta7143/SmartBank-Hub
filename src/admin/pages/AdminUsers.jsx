import { useState } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { Lock, Unlock, Search, Edit2, Archive, DollarSign, Shield } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { toast } from 'sonner';

const AdminUsers = () => {
    const { users, updateUserStatus, updateUserBalance } = useAdminStore();
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // For modal overlay? Or simple alert based editing

    // Simple manual edit state
    const [editBalanceId, setEditBalanceId] = useState(null);
    const [newBalance, setNewBalance] = useState('');

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleStatusToggle = (u) => {
        const newStatus = u.status === 'active' ? 'locked' : 'active';
        if (confirm(`Are you sure you want to ${newStatus.toUpperCase()} this user?`)) {
            updateUserStatus(u.id, newStatus);
            toast.success(`User ${u.email} is now ${newStatus}`);
        }
    };

    const handleBalanceSave = (userId) => {
        if (!newBalance || isNaN(newBalance)) return;
        updateUserBalance(userId, newBalance, 'Manual Admin Adjustment');
        setEditBalanceId(null);
        setNewBalance('');
        toast.success('Balance updated');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">User Management</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-[#0a0a0a] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-red-500/50 w-64"
                    />
                </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/5 text-xs text-gray-400 uppercase tracking-wider">
                            <th className="p-4">User</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Role</th>
                            <th className="p-4 text-right">Balance</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 flex items-center justify-center text-xs font-bold text-white">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${user.status === 'active'
                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                            : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                        <Shield size={12} /> {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-right font-mono text-white">
                                    {editBalanceId === user.id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <input
                                                autoFocus
                                                type="number"
                                                value={newBalance}
                                                onChange={(e) => setNewBalance(e.target.value)}
                                                className="w-24 bg-black border border-red-500/50 rounded px-2 py-1 text-right text-sm"
                                                placeholder={user.balance}
                                            />
                                            <button onClick={() => handleBalanceSave(user.id)} className="text-green-500 text-xs hover:underline">Save</button>
                                            <button onClick={() => setEditBalanceId(null)} className="text-gray-500 text-xs hover:underline">Cancel</button>
                                        </div>
                                    ) : (
                                        <span onClick={() => { setEditBalanceId(user.id); setNewBalance(user.balance); }} className="cursor-pointer hover:text-red-400 border-b border-transparent hover:border-dashed hover:border-red-400" title="Click to edit">
                                            {formatCurrency(user.balance, 'USD')}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleStatusToggle(user)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                        title={user.status === 'active' ? 'Lock User' : 'Unlock User'}
                                    >
                                        {user.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                                    </button>
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white" title="View Details">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white" title="Archive">
                                        <Archive size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">No users found matching "{search}"</div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
