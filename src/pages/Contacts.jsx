import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useWallet } from '../hooks/useWallet';
import { mockTransactions } from '../api/mock/transactions';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, User, Send, Undo2, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner'; // We'll just mock toast behavior again if not installed

// Contacts Data
const MOCK_CONTACTS = []; // Empty start

const Contacts = () => {
    const { wallet, setBalance } = useWallet();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [amount, setAmount] = useState('');
    const [undoVisible, setUndoVisible] = useState(false);
    const [lastTxId, setLastTxId] = useState(null);

    // Filter Contacts
    const contacts = MOCK_CONTACTS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    // Optimistic Mutation
    const transferMutation = useMutation({
        mutationFn: async ({ contact, amount }) => {
            // Simulate network
            await new Promise(r => setTimeout(r, 1000));
            return mockTransactions.transfer(amount, contact.name, `contact-${Date.now()}`);
        },
        onMutate: async ({ contact, amount }) => {
            await queryClient.cancelQueries(['wallet']);

            const previousBalance = wallet.balance;

            // Optimistically update balance
            setBalance(wallet.balance - parseFloat(amount));

            // Show Undo option
            setUndoVisible(true);
            setLastTxId(`temp-${Date.now()}`); // Mock ID

            // Auto-hide undo after 5s (simulating standard undo window)
            setTimeout(() => setUndoVisible(false), 5000);

            return { previousBalance };
        },
        onError: (err, newTodo, context) => {
            setBalance(context.previousBalance);
            toast.error("Transfer Failed", { description: err.message });
        },
        onSuccess: () => {
            // In real app, invalidate queries
            setSelectedContact(null);
            setAmount('');
            toast.success("Transfer sent successfully");
        }
    });

    const handleSend = (e) => {
        e.preventDefault();
        if (!selectedContact || !amount) return;
        transferMutation.mutate({ contact: selectedContact, amount });
    };

    const handleUndo = () => {
        // Mock Revert
        const context = transferMutation.variables;
        if (context) {
            setBalance(wallet.balance + parseFloat(context.amount));
            setUndoVisible(false);
            toast.info("Transaction Undone", { description: "Funds returned to wallet" });
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
            {/* Contacts List */}
            <div className="bg-app-surface border border-white/5 rounded-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/5">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-app-text-muted" size={18} />
                        <Input
                            placeholder="Search contacts..."
                            className="pl-10"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {contacts.map(contact => (
                        <div
                            key={contact.id}
                            onClick={() => setSelectedContact(contact)}
                            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-colors ${selectedContact?.id === contact.id ? 'bg-brand-primary/20 border-brand-primary/30 border' : 'hover:bg-white/5 border border-transparent'}`}
                        >
                            <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full bg-white/10" />
                            <div>
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-xs text-app-text-muted">{contact.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Area */}
            <div className="flex flex-col justify-center">
                {selectedContact ? (
                    <div className="bg-app-surface border border-white/5 rounded-2xl p-8 max-w-sm mx-auto w-full relative">
                        <div className="text-center mb-8">
                            <img src={selectedContact.avatar} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-app-surface shadow-xl" />
                            <h2 className="text-xl font-bold">Pay {selectedContact.name}</h2>
                            <p className="text-app-text-muted">{selectedContact.email}</p>
                        </div>

                        {transferMutation.isPending ? (
                            <div className="text-center py-8">
                                <Loader2 className="animate-spin mx-auto text-brand-primary mb-4" size={40} />
                                <p>Sending...</p>
                            </div>
                        ) : undoVisible ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-status-success/20 text-status-success rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check size={32} />
                                </div>
                                <p className="font-bold text-lg mb-4">Sent!</p>
                                <Button variant="ghost" onClick={handleUndo} className="w-full text-app-text-muted hover:text-white">
                                    <Undo2 className="mr-2" size={16} /> Undo Transfer
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSend} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-app-text-muted mb-1 block">Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-2.5 text-lg font-bold text-app-text-muted">$</span>
                                        <Input
                                            type="number"
                                            className="pl-8 text-lg font-bold"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <Button className="w-full h-12 text-base shadow-lg shadow-brand-primary/25">
                                    <Send className="mr-2" size={18} /> Send Money
                                </Button>
                            </form>
                        )}

                        {!undoVisible && (
                            <button
                                onClick={() => setSelectedContact(null)}
                                className="absolute top-4 right-4 text-app-text-muted hover:text-white"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-app-text-muted">
                        <User size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Select a contact to start</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contacts;
