import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockTransactions } from '../api/mock/transactions';
import { useStore } from '../store/useStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const TransferModal = ({ isOpen, onClose }) => {
    const { setBalance, wallet, addTransaction } = useStore();

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('idle'); // idle | processing | success | error
    const [msg, setMsg] = useState('');

    const handleTransfer = async (e) => {
        if (e) e.preventDefault();

        if (!amount || !recipient) return;

        const transferAmount = parseFloat(amount);

        if (transferAmount > wallet.balance) {
            setMsg('Insufficient funds');
            return;
        }

        setStatus('processing');
        try {
            const res = await mockTransactions.transfer(transferAmount, recipient);

            if (res.status === 'COMPLETED') {
                setStatus('success');
                setMsg('Transfer successful!');
            }
        } catch (err) {
            setStatus('error');
            setMsg(err.message);
        }
    };



    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-app-surface w-full max-w-md p-6 rounded-2xl border border-white/10 shadow-2xl"
                    >
                        <h3 className="text-xl font-bold mb-4">Send Money</h3>

                        {status === 'success' ? (
                            <div className="text-center py-8">
                                <div className="mx-auto w-16 h-16 bg-status-success/20 text-status-success rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h4 className="text-xl font-bold mb-2">Transfer Sent!</h4>
                                <p className="text-app-text-muted mb-6">Your transaction has been processed securely.</p>
                                <Button onClick={() => { setStatus('idle'); setAmount(''); setRecipient(''); onClose(); }} className="w-full">
                                    Done
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleTransfer}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-app-text-muted mb-1 block">Recipient</label>
                                        <Input
                                            value={recipient}
                                            onChange={e => setRecipient(e.target.value)}
                                            placeholder="@johndoe"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-app-text-muted mb-1 block">Amount (INR)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-app-text-muted text-sm font-medium">
                                                ₹
                                            </span>
                                            <Input
                                                type="number"
                                                value={amount}
                                                onChange={e => setAmount(e.target.value)}
                                                placeholder="0.00"
                                                className="pl-8"
                                            />
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-3 bg-status-error/10 border border-status-error/20 rounded-lg text-status-error text-xs flex items-center">
                                            <AlertTriangle size={16} className="mr-2" />
                                            {msg}
                                        </div>
                                    )}

                                    <div className="pt-2">
                                        <Button type="submit" isLoading={status === 'processing'} className="w-full h-12">
                                            Send Funds
                                        </Button>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-app-text-muted hover:text-white"
                                >
                                    ✕
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TransferModal;
