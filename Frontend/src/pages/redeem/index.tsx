import React, { useState, useEffect, useRef } from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  HelpCircle,
  Gift,
  CheckCircle2,
  MapPin,
  History,
  Loader2,
} from "lucide-react";

const CODE_FORMAT_REGEX = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
const RATE_LIMIT_SECONDS = 10;

export default function RedeemCodePage() {
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"info" | "error" | "success" | "warning">("info");
  const [showItemPreview, setShowItemPreview] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTooltipModal, setShowTooltipModal] = useState(false);
  const [redeemedItem, setRedeemedItem] = useState("");
  const lastRedeemAttempt = useRef<number>(0);

  // Format code input (XXXX-XXXX-XXXX)
  const formatCode = (value: string): string => {
    // Auto uppercase and remove non-alphanumeric
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    let formatted = "";

    for (let i = 0; i < cleaned.length && i < 12; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += "-";
      }
      formatted += cleaned[i];
    }

    return formatted;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCode(e.target.value);
    setCode(formatted);

    const valid = CODE_FORMAT_REGEX.test(formatted);
    setIsValid(valid);

    if (valid) {
      setShowItemPreview(true);
      setStatusMessage("Code format correct. Press Redeem to claim the item.");
      setStatusType("info");
    } else if (formatted.length > 0) {
      setShowItemPreview(false);
      setStatusMessage("Code must be 12 characters (XXXX-XXXX-XXXX).");
      setStatusType("info");
    } else {
      setShowItemPreview(false);
      setStatusMessage("");
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const cleaned = pastedText.replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
    const formatted = formatCode(cleaned);
    setCode(formatted);

    const valid = CODE_FORMAT_REGEX.test(formatted);
    setIsValid(valid);
    setShowItemPreview(valid);

    if (valid) {
      setStatusMessage("Code format correct. Press Redeem to claim the item.");
      setStatusType("info");
    } else {
      setStatusMessage("Code must be 12 characters (XXXX-XXXX-XXXX).");
      setStatusType("info");
    }
  };

  // Update status message
  const updateStatus = (
    message: string,
    type: "info" | "error" | "success" | "warning" = "info"
  ) => {
    setStatusMessage(message);
    setStatusType(type);
  };

  // Determine item from code
  const getItemFromCode = (codeValue: string): string => {
    const lowerCode = codeValue.toLowerCase();
    if (lowerCode.includes("skin")) {
      return "Rare Character Skin";
    }
    return "1,000 V-Bucks Bundle";
  };

  // Redeem code
  const handleRedeem = async () => {
    if (isRedeeming || !isValid) return;

    const now = Date.now();

    // Rate limiting check
    if (now - lastRedeemAttempt.current < RATE_LIMIT_SECONDS * 1000) {
      const remaining = Math.ceil(
        (RATE_LIMIT_SECONDS * 1000 - (now - lastRedeemAttempt.current)) / 1000
      );
      updateStatus(`Rate limited. Try again in ${remaining} seconds.`, "warning");
      toast({
        title: "Rate Limited",
        description: `Please wait ${remaining} seconds before trying again.`,
        variant: "destructive",
      });
      return;
    }

    // Final validation
    if (!CODE_FORMAT_REGEX.test(code)) {
      updateStatus("Wrong format. Code must be XXXX-XXXX-XXXX.", "error");
      return;
    }

    setIsRedeeming(true);
    lastRedeemAttempt.current = now;
    updateStatus("Checking code...", "info");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const lowerCode = code.toLowerCase();
    let response: { status: string; message: string; item?: string };

    if (lowerCode.includes("expired")) {
      response = {
        status: "error",
        message: "The redemption period for this code has expired.",
      };
    } else if (lowerCode.includes("used")) {
      response = {
        status: "error",
        message: "This code has already been used by another account.",
      };
    } else if (lowerCode.includes("region")) {
      response = {
        status: "error",
        message: "Region not supported. This code is restricted to specific territories.",
      };
    } else if (lowerCode.includes("invalid")) {
      response = {
        status: "error",
        message: "Invalid code. Please check the code and try again.",
      };
    } else {
      // Success case
      const item = getItemFromCode(code);
      response = {
        status: "success",
        message: "Code redeemed successfully!",
        item: item,
      };
    }

    setIsRedeeming(false);

    if (response.status === "success") {
      updateStatus(response.message, "success");
      setRedeemedItem(response.item || "Item");
      setShowSuccessModal(true);
      toast({
        title: "Code Redeemed!",
        description: `Successfully redeemed ${response.item}`,
      });
    } else {
      updateStatus(response.message, "error");
      toast({
        title: "Redemption Failed",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  // Clear input
  const handleClear = () => {
    setCode("");
    setIsValid(false);
    setShowItemPreview(false);
    setStatusMessage("Ready to enter a new code.");
    setStatusType("info");
  };

  // Confirm redeem from preview
  const handleConfirmRedeem = () => {
    handleRedeem();
  };

  // Close success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    handleClear();
  };

  // Get status message color
  const getStatusColor = () => {
    switch (statusType) {
      case "error":
        return "text-destructive";
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4 sm:p-8">
      {/* Back Button */}
      <div className="w-full max-w-2xl mb-4">
        <BackButton />
      </div>

      <div className="w-full max-w-2xl">
        <Card className="border-primary/50">
          <CardContent className="p-6 sm:p-10">
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-2">
              Redeem Code
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Enter your 12-digit promotional code below to claim your reward.
            </p>

            {/* Tooltip Button */}
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTooltipModal(true)}
                className="text-primary hover:text-primary/90"
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                Where to find my code?
              </Button>
            </div>

            {/* Redemption Input Area */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="code-input" className="text-lg font-medium">
                  Enter Code (e.g., XXXX-XXXX-XXXX)
                </Label>
                <Input
                  id="code-input"
                  type="text"
                  value={code}
                  onChange={handleInputChange}
                  onPaste={handlePaste}
                  maxLength={14}
                  placeholder="Paste or type your code here"
                  className="w-full p-4 text-xl tracking-widest font-mono uppercase mt-2"
                  autoComplete="off"
                />
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className={`h-8 text-center text-sm font-semibold ${getStatusColor()}`}>
                  {statusMessage}
                </div>
              )}

              {/* Item Preview Section */}
              {showItemPreview && (
                <Card className="border-primary/70 bg-secondary">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-primary mb-2 flex items-center">
                      <Gift className="w-5 h-5 mr-2" />
                      Reward Confirmation
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      You are about to redeem the following item:
                    </p>
                    <div className="mt-2 p-3 bg-background rounded-md flex items-center">
                      <div className="w-10 h-10 rounded mr-4 bg-primary flex items-center justify-center text-2xl">
                        💎
                      </div>
                      <span className="font-bold text-xl text-green-500">
                        {getItemFromCode(code)}
                      </span>
                    </div>
                    <Button
                      onClick={handleConfirmRedeem}
                      disabled={isRedeeming}
                      className="mt-4 w-full bg-green-600 hover:bg-green-500"
                    >
                      Confirm and Redeem
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-2">
                <Button
                  variant="outline"
                  onClick={handleClear}
                  className="flex-1"
                  disabled={isRedeeming}
                >
                  Clear
                </Button>
                <Button
                  onClick={handleRedeem}
                  disabled={!isValid || isRedeeming}
                  className="flex-1"
                >
                  {isRedeeming ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Redeem"
                  )}
                </Button>
              </div>
            </div>

            {/* Divider and History Section */}
            <hr className="border-border my-10" />

            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <History className="w-6 h-6 mr-2" />
              Redeem History (Future Feature)
            </h2>
            <Card className="bg-secondary">
              <CardContent className="p-4 h-32 overflow-y-auto">
                <p className="text-muted-foreground">
                  Your previous redemption history will appear here, showing successful claims and
                  items received.
                </p>
                <p className="mt-1 text-sm italic text-muted-foreground">
                  This tab will track codes, dates, and redeemed items.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center">Code Redeemed!</DialogTitle>
            <DialogDescription className="text-center">
              <p className="mt-3">
                Congratulations! The item,{" "}
                <span className="font-bold text-green-500">{redeemedItem}</span>, has been
                successfully added to your account.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={closeSuccessModal} className="w-full">
              Awesome!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tooltip Modal */}
      <Dialog open={showTooltipModal} onOpenChange={setShowTooltipModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-primary" />
              Where to Find Your Code
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-4 mt-4">
                <p>
                  Your 12-digit redemption code can typically be found in one of these locations:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <span className="font-semibold text-primary">Email Receipt:</span> Look for an
                    email from the game vendor or digital store after purchase.
                  </li>
                  <li>
                    <span className="font-semibold text-primary">Physical Card:</span> Scratch the
                    silver coating on your physical retail card.
                  </li>
                  <li>
                    <span className="font-semibold text-primary">Promotional Event:</span> Provided
                    directly by a streamer or event organizer via chat or a private message.
                  </li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowTooltipModal(false)}>Got It</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
