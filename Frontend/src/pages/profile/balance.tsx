import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Wallet,
  DollarSign,
  Plus,
  History,
  CreditCard,
  Code,
  Lock,
  CheckCircle,
  Clock,
  TrendingUp,
  Download,
  Zap,
  Gift,
  Loader2,
  Home,
  ChevronRight,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  method: string;
  amount: number;
  status: "Completed" | "Failed" | "Pending";
}

const STORAGE_KEY_BALANCE = "gw_wallet_balance";
const STORAGE_KEY_TRANSACTIONS = "gw_wallet_transactions";
const INITIAL_BALANCE = 1200.0;

const presetAmounts = [
  { amount: 320, description: "Minimum Fund Level" },
  { amount: 640, description: "Standard Top-Up" },
  { amount: 1600, description: "Recommended" },
  { amount: 3200, description: "Pro Gamer Pack" },
  { amount: 6400, description: "Ultimate Value" },
];

const paymentOptions = [
  { key: "upi", name: "PhonePe / UPI", icon: Zap },
  { key: "card", name: "Credit / Debit Card", icon: CreditCard },
  { key: "gift", name: "Gift Card / Wallet Code", icon: Code },
];

export default function BalancePage() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  // Wallet State
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleString());

  // UI State
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<"addFunds" | "history">("addFunds");
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    if (!user?.id) return;

    try {
      const storedBalance = localStorage.getItem(`${STORAGE_KEY_BALANCE}_${user.id}`);
      const storedTransactions = localStorage.getItem(`${STORAGE_KEY_TRANSACTIONS}_${user.id}`);

      if (storedBalance) {
        setBalance(parseFloat(storedBalance));
      }

      if (storedTransactions) {
        const parsed = JSON.parse(storedTransactions);
        setTransactions(
          parsed.map((tx: any) => ({
            ...tx,
            date: new Date(tx.date),
          }))
        );
      }
    } catch (error) {
      console.error("Error loading wallet data:", error);
    }
  }, [user?.id]);

  // Persist balance to localStorage
  useEffect(() => {
    if (user?.id) {
      try {
        localStorage.setItem(`${STORAGE_KEY_BALANCE}_${user.id}`, balance.toString());
      } catch (error) {
        console.error("Error saving balance:", error);
      }
    }
  }, [balance, user?.id]);

  // Persist transactions to localStorage
  useEffect(() => {
    if (user?.id && transactions.length > 0) {
      try {
        localStorage.setItem(
          `${STORAGE_KEY_TRANSACTIONS}_${user.id}`,
          JSON.stringify(transactions)
        );
      } catch (error) {
        console.error("Error saving transactions:", error);
      }
    }
  }, [transactions, user?.id]);

  // Calculate total added funds
  const totalAddedFunds = useMemo(() => {
    return transactions
      .filter((tx) => tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  // Update last transaction
  useEffect(() => {
    if (transactions.length > 0) {
      setLastTransaction(transactions[0]);
    }
  }, [transactions]);

  // Handle preset amount selection - Navigate to transaction page
  const handleSelectAmount = (amount: number) => {
    // Navigate to transaction page with wallet funding mode
    router.push(`/transaction?mode=wallet&amount=${amount}`);
  };

  // Handle payment confirmation
  const handlePaymentConfirmation = async () => {
    if (!selectedAmount || isProcessing) return;

    setIsProcessing(true);
    setIsPaymentDialogOpen(false);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const newTransaction: Transaction = {
        id: crypto.randomUUID(),
        date: new Date(),
        description: `Added Funds - ₹${selectedAmount.toLocaleString("en-IN")} via ${paymentOptions.find((p) => p.key === paymentMethod)?.name || paymentMethod}`,
        method: paymentMethod,
        amount: selectedAmount,
        status: "Completed",
      };

      setBalance((prev) => prev + selectedAmount);
      setTransactions((prev) => [newTransaction, ...prev]);
      setLastTransaction(newTransaction);
      setLastUpdated(new Date().toLocaleString());
      setIsSuccessDialogOpen(true);

      toast({
        title: "Funds Added Successfully",
        description: `₹${selectedAmount.toLocaleString("en-IN")} has been added to your wallet.`,
      });
    } catch (error) {
      console.error("Failed to process payment:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setSelectedAmount(null);
      setPaymentMethod("upi");
    }
  };

  // Render Page Header
  const renderPageHeader = (title: string, subtitle: string, breadcrumbEnd: string) => (
    <header className="mb-8 p-4 bg-card rounded-xl border border-border shadow-lg">
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Home className="w-4 h-4 mr-1 text-primary" />
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link href="/settings/account" className="hover:text-primary">
          Account
        </Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="text-foreground font-semibold">{breadcrumbEnd}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-1">{title}</h1>
      <p className="text-muted-foreground text-lg">{subtitle}</p>
    </header>
  );

  // Render Preset Fund Options
  const renderPresetOptions = () => (
    <Card className="hover:border-primary transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold">
          <DollarSign className="w-5 h-5 mr-3 text-primary" />
          Choose Amount
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          Select one of the preset amounts for a quick top-up.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {presetAmounts.map(({ amount, description }) => (
            <Card
              key={amount}
              className="bg-secondary border-border hover:border-primary transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              <CardContent className="p-5">
                <div>
                  <p className="text-4xl font-extrabold text-foreground mb-1">
                    ₹{amount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-sm text-primary mb-4">{description}</p>
                </div>
                <Button
                  onClick={() => handleSelectAmount(amount)}
                  disabled={isProcessing}
                  className="mt-4 w-full"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Funds
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {isProcessing && (
          <div className="mt-8 p-4 text-center bg-primary/10 rounded-lg flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin mr-3 text-primary" />
            <span className="text-primary">Processing payment... Please wait.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Render Wallet Summary Card
  const renderWalletSummaryCard = () => (
    <Card className="sticky top-4 h-fit hover:border-primary transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold">
          <Wallet className="w-5 h-5 mr-3 text-primary" />
          Wallet Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-secondary rounded-lg flex items-center">
          <DollarSign className="w-5 h-5 mr-3 text-emerald-400 flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-muted-foreground truncate">Current Wallet Balance</span>
            <span className="text-sm font-semibold text-foreground truncate">
              ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="p-3 bg-secondary rounded-lg flex items-center">
          <Clock className="w-5 h-5 mr-3 text-emerald-400 flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-muted-foreground truncate">Last Transaction</span>
            <span className="text-sm font-semibold text-foreground truncate">
              {lastTransaction
                ? `₹${lastTransaction.amount.toLocaleString("en-IN")} added on ${lastTransaction.date.toLocaleDateString()}`
                : "N/A"}
            </span>
          </div>
        </div>

        <div className="p-3 bg-secondary rounded-lg flex items-center">
          <TrendingUp className="w-5 h-5 mr-3 text-emerald-400 flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-muted-foreground truncate">Total Added Funds</span>
            <span className="text-sm font-semibold text-foreground truncate">
              ₹{totalAddedFunds.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </CardContent>
      <CardContent className="pt-0">
        <div className="mt-6 pt-4 border-t border-border space-y-3">
          <Button
            variant="ghost"
            onClick={() => setViewMode("history")}
            className="w-full text-center text-primary hover:text-primary/80 font-medium text-sm"
          >
            <History className="w-4 h-4 mr-2" /> View Transaction History
          </Button>
          <Button
            variant="ghost"
            className="w-full text-center text-emerald-400 hover:text-emerald-300 font-medium text-sm"
          >
            <Code className="w-4 h-4 mr-2" /> Redeem Gift Card
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Render Transaction History
  const renderTransactionHistory = () => (
    <div className="lg:col-span-8">
      {renderPageHeader(
        "Transaction History",
        "Review all your past wallet activity, including purchases and fund additions.",
        "Transaction History"
      )}

      <Button
        variant="ghost"
        onClick={() => setViewMode("addFunds")}
        className="mb-6 flex items-center text-primary hover:text-primary/80 transition duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Add Funds
      </Button>

      <Card className="hover:border-primary transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-semibold">
            <History className="w-5 h-5 mr-3 text-primary" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">Showing {transactions.length} transactions.</p>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              <Download className="w-4 h-4 mr-1" /> Export History (CSV)
            </Button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-secondary/50 transition duration-150">
                      <TableCell className="text-muted-foreground">
                        {tx.date.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{tx.description}</TableCell>
                      <TableCell className="text-muted-foreground">{tx.method}</TableCell>
                      <TableCell
                        className={`font-bold ${tx.amount > 0 ? "text-emerald-400" : "text-destructive"
                          }`}
                      >
                        {tx.amount > 0
                          ? `+ ₹${tx.amount.toFixed(2)}`
                          : `- ₹${Math.abs(tx.amount).toFixed(2)}`}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tx.status === "Completed"
                              ? "default"
                              : tx.status === "Failed"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No transactions found. Make your first purchase or add funds!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Add Funds View
  const renderAddFundsView = () => (
    <>
      {renderPageHeader(
        "Add Funds to Your Wallet",
        "Select an amount to add to your wallet. Funds can be used for any in-store purchase.",
        "Add Funds"
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">{renderPresetOptions()}</div>
        <div className="lg:col-span-4">{renderWalletSummaryCard()}</div>
      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>Wallet Balance - Gaming World</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground font-sans p-4 sm:p-8">
        {/* User ID Display */}
        {user && (
          <div className="text-muted-foreground text-sm mb-4 border-b border-border pb-2">
            <span className="font-semibold text-primary">User ID:</span> {user.id}
          </div>
        )}

        <main className="max-w-7xl mx-auto space-y-8">
          {/* Conditional Rendering of Views */}
          {viewMode === "addFunds" && renderAddFundsView()}
          {viewMode === "history" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {renderTransactionHistory()}
              <div className="lg:col-span-4">{renderWalletSummaryCard()}</div>
            </div>
          )}

          {/* Security Note */}
          <footer className="mt-8 text-center text-muted-foreground text-sm pt-4 border-t border-border">
            <Lock className="w-4 h-4 inline mr-1 text-emerald-500" /> All payments are securely
            processed and encrypted.
          </footer>
        </main>

        {/* Payment Method Selection Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Choose Payment Method</DialogTitle>
              <DialogDescription>
                You are adding{" "}
                <span className="text-emerald-400 font-bold">
                  ₹{selectedAmount?.toLocaleString("en-IN")}
                </span>{" "}
                to your wallet.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mb-8">
              {paymentOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.key}
                    onClick={() => setPaymentMethod(option.key)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg transition duration-200 border-2 ${paymentMethod === option.key
                      ? "border-primary bg-primary/10"
                      : "border-border bg-secondary hover:bg-secondary/80"
                      }`}
                  >
                    <span className="flex items-center text-foreground font-medium">
                      <Icon className="w-5 h-5 mr-3 text-primary" />
                      {option.name}
                    </span>
                    {paymentMethod === option.key && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePaymentConfirmation} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Proceed to Pay (₹${selectedAmount?.toLocaleString("en-IN")})`
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-emerald-500" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center">Success!</DialogTitle>
              <DialogDescription className="text-center mt-2">
                <p className="text-xl font-semibold text-foreground mb-2">
                  Funds Added Successfully!
                </p>
                <p className="text-muted-foreground">
                  <span className="font-bold text-2xl text-emerald-400">
                    ₹{lastTransaction?.amount.toLocaleString("en-IN") || "N/A"}
                  </span>{" "}
                  has been added to your wallet.
                </p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccessDialogOpen(false);
                  setViewMode("history");
                }}
                className="w-full sm:w-auto"
              >
                <Wallet className="w-4 h-4 mr-2" /> View Wallet
              </Button>
              <Button
                onClick={() => setIsSuccessDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> Continue Shopping
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
