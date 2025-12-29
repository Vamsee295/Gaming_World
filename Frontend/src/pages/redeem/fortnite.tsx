import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import {
  CheckCircle,
  Gift,
  Wallet,
  History,
  Loader2,
  AlertCircle,
} from "lucide-react";

const VALID_CODE_LENGTH = 14; // XXXX-XXXX-XXXX format
const RATE_LIMIT_MS = 5000; // 5 seconds between redemption attempts

// Mock gift card codes and their values
const VALID_CODES: Record<string, number> = {
  "25ACCCDDDEEE": 25.0,
  "50ACCCDDDEEE": 50.0,
  "REGIONLOCKUS": 10.0, // Region-locked code
};

const INVALID_CODES: Record<string, string> = {
  AAAAAABBBBBB: "Card value not readable or corrupt code. Please contact support.",
  EXPIREDCARD1: "This gift card has expired and cannot be redeemed.",
  ALREADYUSED1: "This gift card has already been redeemed and used.",
};

const STORAGE_KEY_BALANCE = "gw_wallet_balance";
const INITIAL_BALANCE = 15.5;

export default function RedeemFortnitePage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [previewValue, setPreviewValue] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [redeemedValue, setRedeemedValue] = useState<number>(0);
  const lastRedeemAttempt = useRef<number>(0);

  // Load balance from localStorage
  useEffect(() => {
    if (!user?.id) return;

    try {
      const storedBalance = localStorage.getItem(`${STORAGE_KEY_BALANCE}_${user.id}`);
      if (storedBalance) {
        setBalance(parseFloat(storedBalance));
      }
    } catch (error) {
      console.error("Error loading balance:", error);
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

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format code input (XXXX-XXXX-XXXX)
  const formatCode = (value: string): string => {
    // Auto uppercase and remove non-alphanumeric
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    // Format with hyphens
    let formatted = "";
    for (let i = 0; i < cleaned.length && i < 12; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += "-";
      }
      formatted += cleaned[i];
    }

    return formatted;
  };

  // Handle code input
  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCode(e.target.value);
    setCode(formatted);
    setErrorMessage("");

    // Update preview based on code
    updateBalancePreview(formatted);
  };

  // Handle paste
  const handleCodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("Text")
      .toUpperCase()
      .trim()
      .replace(/[^A-Z0-9-]/g, "");

    const cleaned = pastedData.replace(/-/g, "").substring(0, 12);
    const formatted = formatCode(cleaned);
    setCode(formatted);
    setErrorMessage("");

    updateBalancePreview(formatted);
  };

  // Update balance preview
  const updateBalancePreview = (formattedCode: string) => {
    const codeWithoutHyphens = formattedCode.replace(/-/g, "");

    // Check if code matches a valid pattern
    if (codeWithoutHyphens.startsWith("25A") && formattedCode.length === VALID_CODE_LENGTH) {
      setPreviewValue(25.0);
    } else if (codeWithoutHyphens.startsWith("50B") && formattedCode.length === VALID_CODE_LENGTH) {
      setPreviewValue(50.0);
    } else {
      setPreviewValue(null);
    }
  };

  // Display error message
  const displayError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 10000);
  };

  // Clear form
  const clearForm = () => {
    setCode("");
    setPreviewValue(null);
    setErrorMessage("");
  };

  // Handle redemption
  const handleRedeem = async () => {
    const codeWithoutHyphens = code.replace(/-/g, "").trim();
    const now = Date.now();

    // Rate limit check
    if (now < lastRedeemAttempt.current + RATE_LIMIT_MS) {
      const remaining = Math.ceil(
        (lastRedeemAttempt.current + RATE_LIMIT_MS - now) / 1000
      );
      displayError(`Rate limit exceeded. Please wait ${remaining} seconds before trying again.`);
      return;
    }

    // Validate code length
    if (codeWithoutHyphens.length !== 12) {
      displayError("Please enter a valid 12-character code.");
      return;
    }

    setIsRedeeming(true);
    setErrorMessage("");
    lastRedeemAttempt.current = now;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let success = false;
    let redeemValue = 0.0;

    // Check for invalid codes
    if (INVALID_CODES[codeWithoutHyphens]) {
      displayError(INVALID_CODES[codeWithoutHyphens]);
      setIsRedeeming(false);
      return;
    }

    // Check for region-locked code
    if (codeWithoutHyphens === "REGIONLOCKUS") {
      // In a real app, you'd check the user's region
      // For now, we'll assume US region is valid
      success = true;
      redeemValue = 10.0;
    }
    // Check for valid codes
    else if (VALID_CODES[codeWithoutHyphens]) {
      success = true;
      redeemValue = VALID_CODES[codeWithoutHyphens];
    } else {
      displayError("Invalid gift card code. Please check your entry.");
      setIsRedeeming(false);
      return;
    }

    setIsRedeeming(false);

    if (success) {
      // Update balance
      const newBalance = balance + redeemValue;
      setBalance(newBalance);
      setRedeemedValue(redeemValue);

      // Clear form
      clearForm();

      // Show success modal
      setIsSuccessModalOpen(true);

      toast({
        title: "Redemption Successful!",
        description: `${formatCurrency(redeemValue)} has been added to your wallet.`,
      });
    }
  };

  const accountName = user?.name || "EpicGamerBro";
  const region = "United States (USD)";
  const conversionRate = "1 USD ≈ 0.93 EUR";

  return (
    <>
      <Head>
        <title>Redeem Fortnite Gift Card - Gaming World</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-primary/50 hover:border-primary transition-all duration-500 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center tracking-wider">
              Redeem Gift Card
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Account Status */}
            <div className="p-4 bg-secondary rounded-lg border-l-4 border-primary">
              <p className="text-sm text-muted-foreground">Connected Account:</p>
              <p className="text-xl font-semibold mb-2 flex items-center text-foreground">
                {accountName}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-muted-foreground">Current Wallet Balance:</p>
                  <p className="text-2xl font-bold text-foreground transition-all duration-300">
                    {formatCurrency(balance)}
                  </p>
                </div>
                {previewValue !== null && (
                  <div className="opacity-100 transition-opacity duration-500">
                    <p className="text-sm text-muted-foreground">Redeem Preview:</p>
                    <p className="text-xl font-bold text-emerald-400">
                      + {formatCurrency(previewValue)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Redemption Form */}
            <div className="space-y-4">
              <label htmlFor="gift-card-code" className="block text-sm font-medium text-foreground">
                Enter Code (XXXX-XXXX-XXXX format)
              </label>
              <Input
                id="gift-card-code"
                type="text"
                maxLength={14}
                placeholder="AAAA-BBBB-CCCC"
                value={code}
                onChange={handleCodeInput}
                onPaste={handleCodePaste}
                className="text-lg text-center tracking-widest uppercase focus:border-primary transition-colors"
              />

              {/* Region/Currency Info */}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Region: {region}</span>
                <span className="italic">{conversionRate}</span>
              </div>

              {/* Error Message Display */}
              {errorMessage && (
                <div className="min-h-[40px] p-2 rounded-lg bg-destructive/20 text-destructive text-center transition-all duration-300 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errorMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-2">
                <Button
                  id="redeem-button"
                  onClick={handleRedeem}
                  disabled={isRedeeming || code.length !== VALID_CODE_LENGTH}
                  className="flex-1 text-lg font-bold"
                >
                  {isRedeeming ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Redeem"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearForm}
                  disabled={isRedeeming}
                  className="px-6"
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Footer Links and Legal */}
            <div className="text-center pt-4 border-t border-border">
              <Link
                href="/profile/balance"
                className="text-sm font-medium text-primary hover:text-primary/80 transition duration-200 inline-flex items-center"
              >
                <History className="w-4 h-4 mr-1" />
                View Wallet Activity
              </Link>
              <p className="text-[10px] text-muted-foreground mt-2">
                By clicking "Redeem," you agree to the Epic Games Gift Card Terms and Conditions.
                All codes are subject to regional validation and may expire.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Success Confirmation Modal */}
        <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
          <DialogContent className="max-w-sm text-center border-t-4 border-emerald-500">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-emerald-500 animate-pulse" />
              </div>
              <DialogTitle className="text-2xl font-semibold">Redemption Successful!</DialogTitle>
              <DialogDescription className="mt-2">
                <span className="text-3xl font-extrabold text-emerald-400 block mt-1">
                  {formatCurrency(redeemedValue)}
                </span>
                has been added to your wallet.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full text-lg font-bold"
              >
                Awesome!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
