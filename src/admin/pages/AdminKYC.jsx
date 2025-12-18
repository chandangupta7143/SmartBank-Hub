import { useAdminStore } from '../store/useAdminStore';
import { Check, X, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const AdminKYC = () => {
    const { kycQueue, approveKYC, rejectKYC } = useAdminStore();

    const handleApprove = (id) => {
        if (confirm('Approve this KYC submission?')) {
            approveKYC(id);
            toast.success('KYC Approved');
        }
    };

    const handleReject = (id) => {
        const reason = prompt('Enter rejection reason:', 'Document blurred');
        if (reason) {
            rejectKYC(id, reason);
            toast.error('KYC Rejected');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                KYC Verification Queue
                <span className="bg-orange-500 text-black text-xs px-2 py-1 rounded-full font-bold">{kycQueue.length}</span>
            </h1>

            {kycQueue.length === 0 ? (
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-12 flex flex-col items-center justify-center text-gray-500">
                    <FileText size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">No pending documents</p>
                    <p className="text-sm">Great job! You've cleared the queue.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {kycQueue.map(kyc => (
                        <div key={kyc.id} className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden shadow-lg group">
                            {/* Mock Document Preview */}
                            <div className="h-48 bg-gray-800 relative flex items-center justify-center overflow-hidden">
                                <FileText size={64} className="text-gray-700" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                    <span className="text-white text-sm font-medium border border-white/30 px-3 py-1 rounded bg-black/50 backdrop-blur">View Document</span>
                                </div>
                                {/* Label */}
                                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white uppercase font-bold tracking-wider border border-white/10">
                                    {kyc.docType}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{kyc.name}</h3>
                                        <p className="text-xs text-gray-500">Submitted {new Date(kyc.submittedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        <AlertCircle size={16} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleReject(kyc.id)}
                                        className="flex items-center justify-center gap-2 py-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors text-sm font-medium"
                                    >
                                        <X size={16} /> Reject
                                    </button>
                                    <button
                                        onClick={() => handleApprove(kyc.id)}
                                        className="flex items-center justify-center gap-2 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20 transition-all text-sm font-medium"
                                    >
                                        <Check size={16} /> Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminKYC;
