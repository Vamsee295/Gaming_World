import React, { useState } from "react";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { AlertCircle, Mail, FileText, Home, ArrowLeft } from "lucide-react";

export default function RefundPolicyPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmitRefund = () => {
    setMessage("Redirecting you to the Purchase History portal to submit your refund request.");
    setShowMessage(true);
    toast({
      title: "Redirecting...",
      description: "Opening refund request portal.",
    });
    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/profile/purchase-history');
    }, 2000);
  };

  const handleContactSupport = () => {
    setMessage(
      "Opening the Customer Support contact form. Please be ready to provide your account details."
    );
    setShowMessage(true);
    toast({
      title: "Contact Support",
      description: "Opening support contact form.",
    });
    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/support/contact');
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Navigation Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="border-border shadow-2xl">
          {/* Header Section */}
          <CardHeader className="bg-secondary p-6 sm:p-8 rounded-t-xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
              GameVerse Store Refund Policy
            </h1>
            <p className="mt-2 text-muted-foreground text-lg">
              GameVerse: Your satisfaction is important to us. Please review our policy
              guidelines below.
            </p>
          </CardHeader>

          {/* Policy Content */}
          <CardContent className="p-6 sm:p-10 space-y-10">
            {/* 1. Eligibility Requirements */}
            <section className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold mb-3">1. Eligibility Requirements</h2>
              <p className="text-muted-foreground">
                Refunds are generally available for titles purchased directly from the Epic Stream
                Store that meet all required criteria. The item must be requested by the original
                purchaser. Access or usage of the item must not violate our terms of service or
                result from fraudulent activity.
              </p>
            </section>

            {/* 2. Time Limits */}
            <section className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold mb-3">2. Time Limits</h2>
              <p className="text-muted-foreground">
                A refund request must be submitted within <strong>14 days</strong> of the purchase
                date. Requests submitted after this window will be evaluated on a case-by-case basis
                under the Exceptions policy.
              </p>
            </section>

            {/* 3. Playtime Limits */}
            <section className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold mb-3">3. Playtime Limits</h2>
              <p className="text-muted-foreground">
                For game titles, a refund is only available if the total playtime recorded on your
                account for the product is <strong>less than 2 hours</strong>. Once this playtime
                limit is exceeded, the item is considered consumed and is non-refundable.
              </p>
            </section>

            {/* 4. Non-Refundable Items */}
            <section className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold mb-3">4. Non-Refundable Items</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>
                  Virtual currency, in-game items, or consumables that have been used or accessed.
                </li>
                <li>Items marked explicitly as non-refundable at the point of purchase.</li>
                <li>Gifts that have been redeemed by the recipient.</li>
                <li>Products where the playtime limit has been exceeded (over 2 hours).</li>
              </ul>
            </section>

            {/* 5. Regional Refund Rules */}
            <section className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold mb-3">5. Regional Refund Rules</h2>
              <p className="text-muted-foreground">
                In compliance with local consumer protection laws (e.g., EU's Directive on Consumer
                Rights), certain territories may have additional rights or extended cooling-off
                periods that supersede these terms. Residents of these regions should consult their
                local consumer law for details.
              </p>
            </section>

            {/* 6. Chargeback / Fraud Policy */}
            <section className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold mb-3">6. Chargeback / Fraud Policy</h2>
              <p className="text-muted-foreground">
                Initiating a chargeback or dispute with your payment provider before requesting a
                refund from us may result in the suspension of your Epic Stream account. All refund
                requests should first be handled through our official submission process to resolve
                the issue promptly and avoid potential account penalties.
              </p>
            </section>

            {/* 7. Refund Method */}
            <section className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold mb-3">7. Refund Method (How Money Is Returned)</h2>
              <p className="text-muted-foreground">
                Refunds are typically processed back to the <strong>original payment method</strong>{" "}
                used for the purchase (e.g., credit card, PayPal, etc.). If the original payment
                method is no longer available, a credit equal to the purchase price may be applied
                to your Epic Stream Wallet.
              </p>
            </section>

            {/* 8. Refund Processing Time */}
            <section className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold mb-3">8. Refund Processing Time</h2>
              <p className="text-muted-foreground">
                Once a refund request is approved, it may take between <strong>5 to 10 business days</strong>{" "}
                for the funds to appear back in your account, depending on your bank or payment
                provider's policies.
              </p>
            </section>

            {/* 9. How to Submit a Refund Request */}
            <section className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold mb-3">
                9. How to Submit a Refund Request (Steps)
              </h2>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
                <li>
                  Log into your Epic Stream Account and navigate to the "Purchase History" section.
                </li>
                <li>Locate the eligible item you wish to refund.</li>
                <li>Click the "Request Refund" button next to the item.</li>
                <li>Fill out the brief form detailing the reason for the refund.</li>
                <li>Submit the request and await a confirmation email.</li>
              </ol>
            </section>

            {/* 10. Exceptions / Special Cases */}
            <section className="pb-6">
              <h2 className="text-2xl font-bold mb-3">10. Exceptions / Special Cases</h2>
              <p className="text-muted-foreground">
                We may make exceptions for technical issues (e.g., a product is fundamentally broken
                or unplayable) that prevent you from using the content, even if the playtime or time
                limits have been slightly exceeded. These exceptions are granted at the sole
                discretion of Epic Stream Support.
              </p>
            </section>

            {/* 11. Support Contact for Refund Issues & Call to Action */}
            <section className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-3">11. Need Help? Contact Support</h2>
              <p className="text-muted-foreground mb-6">
                If you have questions about the policy or require assistance with a complex refund
                issue, please use the contact button below.
              </p>

              {/* Buttons for interaction */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button onClick={handleSubmitRefund} size="lg" className="flex-1">
                  <FileText className="w-5 h-5 mr-2" />
                  Submit Refund Request
                </Button>

                <Button
                  onClick={handleContactSupport}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
              </div>

              {/* Message Box */}
              {showMessage && (
                <div
                  className="mt-4 p-3 text-sm bg-primary/10 text-primary rounded-lg border border-primary/50 flex items-center gap-2"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4" />
                  {message}
                </div>
              )}
            </section>
          </CardContent>

          {/* Footer Section */}
          <CardFooter className="bg-secondary p-4 sm:p-6 rounded-b-xl text-center text-muted-foreground text-sm">
            &copy; 2025 Epic Stream. All Rights Reserved. Policy last updated: 11/08/2025.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
