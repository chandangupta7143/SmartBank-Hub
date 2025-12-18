import { Activity, Play, Pause, AlertTriangle, CheckCircle } from 'lucide-react';

const AdminActivity = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="text-gray-500" /> Job Activity & Workers
            </h1>

            {/* Worker Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 animate-pulse">
                        <Play size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Transaction Worker</p>
                        <p className="text-lg font-bold text-white">Running</p>
                    </div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 animate-pulse">
                        <Play size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Email Worker</p>
                        <p className="text-lg font-bold text-white">Running</p>
                    </div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
                        <Pause size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Recon Worker</p>
                        <p className="text-lg font-bold text-white">Paused</p>
                    </div>
                </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">Background Jobs</h3>
                    <span className="text-xs text-gray-500">Live Stream (Mock)</span>
                </div>
                <div className="divide-y divide-white/5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <span className={`text-xs font-mono px-2 py-1 rounded ${i === 3 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                    {i === 3 ? 'FAILED' : 'COMPLETED'}
                                </span>
                                <div>
                                    <p className="text-sm text-white font-medium">ProcessTransaction_0x{8392 + i}A</p>
                                    <p className="text-xs text-gray-500">Queue: High-Priority • {i}s execution time</p>
                                </div>
                            </div>
                            <div className="text-right text-xs text-gray-500">
                                {new Date().toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminActivity;
