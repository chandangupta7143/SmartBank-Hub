import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../hooks/useAuth';
import { useStore } from '../store/useStore';
import { Copy, Share2, Wallet } from 'lucide-react';
import { toast } from 'sonner';

const QR = () => {
    const { user } = useAuth();
    const { wallet } = useStore();

    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    // Payload Format: fusion://pay?pa=ADDRESS&pn=NAME&am=AMOUNT&cu=CURRENCY&tn=NOTE
    const payload = `fusion://pay?pa=${user?.walletId || '0x71...9A23'}&pn=${encodeURIComponent(user?.name || 'User')}&am=${amount || '0'}&cu=INR&tn=${encodeURIComponent(note)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(payload);
        toast.success('QR Payload copied to clipboard');
    };

    return (
        <div className="p-4 md:p-8 pt-24 max-w-4xl mx-auto flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">Receive Payment</h1>

            <div className="bg-[#0A0F1C] p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center gap-8 max-w-sm w-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-brand-primary/10 transition-colors"></div>

                {/* QR Container */}
                <div className="bg-white p-4 rounded-2xl shadow-inner relative z-10">
                    <QRCodeSVG
                        value={payload}
                        size={240}
                        level="Q"
                        includeMargin={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                        <Wallet className="text-black" size={80} />
                    </div>
                </div>

                {/* Amount Input */}
                <div className="w-full space-y-4 relative z-10">
                    <div>
                        <label className="text-xs font-bold text-app-text-muted uppercase tracking-wider block mb-2">Amount (INR)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors text-lg"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-app-text-muted uppercase tracking-wider block mb-2">Note (Optional)</label>
                        <input
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Payment for..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                        />
                    </div>
                </div>

                <div className="flex gap-4 w-full relative z-10">
                    <button onClick={handleCopy} className="flex-1 btn-secondary flex items-center justify-center gap-2">
                        <Copy size={18} /> Copy Link
                    </button>
                    <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                        <Share2 size={18} /> Share
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center text-app-text-muted text-sm max-w-md">
                <p>Scan this QR code with any Fusion Finance compatible wallet to receive {amount ? `₹${parseFloat(amount).toFixed(2)}` : 'payments'}.</p>
                <p className="mt-2 opacity-50 text-xs">Payment Address: {user?.walletId || '0x71...9A23'}</p>
            </div>
        </div>
    );
};

export default QR;
