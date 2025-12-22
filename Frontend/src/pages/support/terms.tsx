import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleAgree = () => {
    toast({
      title: "Agreement Successful!",
      description: "You have accepted the Terms and Conditions. Proceeding to the main service...",
    });
    // In a real app, you would redirect here: router.push('/home');
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const handleBack = () => {
    toast({
      title: "Returning Home",
      description: "You are navigating back to the previous page/homepage.",
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary">Terms and Conditions</h1>
        <p className="text-lg text-muted-foreground mt-2">Effective Date: November 8, 2025</p>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto">
        <Card className="border-primary/50">
          <CardContent className="p-6 md:p-10">
            {/* Section 1: Introduction / Agreement */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="agreement">
                1. Introduction / Agreement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to GameVerse. By accessing or using our services, games,
                applications, or website (the "Service"), you agree to be bound by these Terms and
                Conditions. <strong>If you do not agree to these terms, you may not use the Service.</strong>{" "}
                These terms constitute a legally binding agreement between you and the platform.
              </p>
            </section>

            {/* Section 2: Account Requirements */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="account">
                2. Account Requirements
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Age Requirement:</strong> You must be at least 13 years old to create an
                  account. If you are under 18, you must have permission from a parent or legal
                  guardian.
                </li>
                <li>
                  <strong>Account Security:</strong> You are responsible for maintaining the
                  confidentiality of your password and account details.
                </li>
                <li>
                  <strong>Responsibility for Activity:</strong> You are responsible for all
                  activities, actions, and purchases that occur under your account.
                </li>
              </ul>
            </section>

            {/* Section 3: User Rights / License */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="license">
                3. User Rights / License
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>License Granted:</strong> We grant you a limited, non-exclusive, personal,
                  and <strong>non-commercial license</strong> to use the platform and access its
                  content and games.
                </li>
                <li>
                  <strong>No Ownership:</strong> This license does not grant you ownership of the
                  software, games, intellectual property, or any other proprietary material of the
                  platform.
                </li>
              </ul>
            </section>

            {/* Section 4: Purchases / Payments */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="payments">
                4. Purchases / Payments
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>All Purchases are Final:</strong> All purchases of games, virtual items,
                  and subscriptions are considered final, except where a refund policy explicitly
                  applies.
                </li>
                <li>
                  <strong>Taxes:</strong> You are responsible for any applicable taxes, duties, or
                  government charges associated with your purchases.
                </li>
                <li>
                  <strong>Pricing Changes:</strong> We reserve the right to change pricing for any
                  product or service at any time without prior notice.
                </li>
              </ul>
            </section>

            {/* Section 5: Gift Cards / Codes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="gifts">
                5. Gift Cards / Codes
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>No Resale:</strong> Codes and gift cards cannot be sold, resold, or used
                  for unauthorized commercial purposes.
                </li>
                <li>
                  <strong>Expiration and Region Limits:</strong> Codes may have expiration dates,
                  region-specific restrictions, or be limited to certain services as determined by
                  the platform.
                </li>
              </ul>
            </section>

            {/* Section 6: Restrictions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="restrictions">
                6. Restrictions
              </h2>
              <p className="text-muted-foreground mb-2">
                You agree not to engage in the following prohibited activities:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Reverse Engineering:</strong> Attempting to decompile, reverse engineer,
                  disassemble, or derive source code from the Service.
                </li>
                <li>
                  <strong>Cheating / Exploiting:</strong> Using any unauthorized programs, bots, or
                  tools that alter the game experience, or exploiting bugs/glitches.
                </li>
                <li>
                  <strong>Bypassing Security:</strong> Attempting to bypass any security systems or
                  digital rights management (DRM) features.
                </li>
                <li>
                  <strong>Unauthorized Resale:</strong> Reselling accounts, digital items, or
                  in-game currency without explicit, written permission from the platform.
                </li>
              </ul>
            </section>

            {/* Section 7: Content Ownership */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="ownership">
                7. Content Ownership
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Platform IP:</strong> The platform owns all copyrights, trademarks, and
                  content related to the Service, including graphics, code, and game assets.
                </li>
                <li>
                  <strong>User Content:</strong> Any content you upload, post, or transmit ("User
                  Content") remains yours, but you grant the platform a worldwide, royalty-free
                  license to use, display, and distribute that content according to the Service
                  rules. Your User Content must follow all platform guidelines.
                </li>
              </ul>
            </section>

            {/* Section 8: Refund Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="refunds">
                8. Refund Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Refunds for purchases will be processed strictly in accordance with the official{" "}
                <strong>GameVerse Store Refund Rules</strong> published on our dedicated policy page (linked
                below). Certain items, such as used virtual currency or non-transferable digital
                goods, may be explicitly non-refundable.
              </p>
              <div className="mt-4">
                <Link
                  href="/support/refund-policy"
                  className="text-primary hover:text-primary/80 transition duration-150 underline"
                >
                  View Full Store Refund Policy
                </Link>
              </div>
            </section>

            {/* Section 9: Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="termination">
                9. Termination
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Platform Right:</strong> We may temporarily suspend or permanently ban
                  your account immediately and without notice for any violation of these Terms.
                </li>
                <li>
                  <strong>User Right:</strong> You are free to close your account at any time by
                  following the account closure procedures provided within the Service.
                </li>
              </ul>
            </section>

            {/* Section 10: Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="liability">
                10. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, the platform shall not be liable for any
                direct, indirect, incidental, special, or consequential losses, including but not
                limited to loss of profits, data, or goodwill, resulting from your misuse of the
                Service, technical downtimes, or inability to access the platform.
              </p>
            </section>

            {/* Section 11: Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="privacy">
                11. Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your personal data and information are handled under a separate, comprehensive{" "}
                <strong>Privacy Policy</strong>. By using the Service, you acknowledge that you have
                read and agree to the terms of the Privacy Policy.
              </p>
              <div className="mt-4">
                <Link
                  href="/settings/privacy"
                  className="text-primary hover:text-primary/80 transition duration-150 underline"
                >
                  View Our Full Privacy Policy
                </Link>
              </div>
            </section>

            {/* Section 12: Updates to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="updates">
                12. Updates to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to update or modify these Terms and Conditions at any time.
                When updates happen, we will notify users through the Service, email, or other
                appropriate means. Your continued use of the Service after the effective date of the
                new Terms constitutes your acceptance of the changes.
              </p>
            </section>

            {/* Section 13: Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="law">
                13. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the
                State of <strong>[Your State/Country Here]</strong>, excluding its conflict of law
                principles.
              </p>
            </section>

            {/* Section 14: Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary" id="contact">
                14. Contact
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions regarding these Terms or need to contact our support for
                legal issues, please reach out via:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-muted-foreground mt-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:legal@epicstream.com"
                    className="text-primary hover:text-primary/80 transition duration-150"
                  >
                    legal@gameverse.com
                  </a>
                </li>
                <li>
                  <strong>Mail:</strong> [Company Name], Attn: Legal Department, [Full Address]
                </li>
              </ul>
            </section>

            {/* Action Buttons */}
            <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              {/* I Agree Button */}
              <Button
                onClick={handleAgree}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 transform hover:scale-105 transition duration-300"
                size="lg"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                I Have Read and I Agree to the Terms
              </Button>

              {/* Decline/Back Button */}
              <Button
                onClick={handleBack}
                variant="outline"
                className="w-full sm:w-auto"
                size="lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
