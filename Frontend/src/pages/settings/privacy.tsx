import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Mail, FileText, Shield, Settings } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen antialiased">
      {/* Header Section */}
      <header className="bg-card shadow-xl sticky top-0 z-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight">EpicStream Network</h1>
          <a href="#contact-info">
            <Button>
              <Mail className="w-4 h-4 mr-2" />
              Contact Privacy Support
            </Button>
          </a>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Privacy Policy Title Card */}
        <Card className="mb-12 border-border">
          <CardContent className="p-8 sm:p-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Privacy Policy</h2>
            <p className="text-lg text-muted-foreground mt-4">Last Updated: November 8, 2025</p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Welcome to EpicStream Network. Your privacy is critically important to us. This policy
              outlines how we collect, use, and protect your personal data when you use our game
              streaming platform and related services.
            </p>
          </CardContent>
        </Card>

        {/* Policy Sections */}
        <div className="space-y-10">
          {/* Section 1: Information We Collect */}
          <Card className="border-border">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-3xl font-bold text-primary mb-4">1. Information We Collect</h3>
              <p className="mb-4 text-muted-foreground">
                We collect information that allows us to provide, maintain, and improve our
                services. This includes:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Account Data:</strong> Username, email address (used for login and
                  recovery), and encrypted password.
                </li>
                <li>
                  <strong>Usage Data:</strong> Streaming activity (games played, hours viewed),
                  interaction data (likes, comments, follows), IP address, and device information
                  (OS, browser type).
                </li>
                <li>
                  <strong>Financial Data:</strong> If you make purchases or subscriptions, we
                  collect billing details and transaction history. Note: We do not store full credit
                  card numbers.
                </li>
                <li>
                  <strong>Optional Content:</strong> Profile picture and any biographical
                  information you choose to provide publicly.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 2: How We Use Your Data */}
          <Card className="border-border">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-3xl font-bold text-primary mb-4">2. How We Use Your Data</h3>
              <p className="mb-4 text-muted-foreground">
                Your data is used primarily for the following purposes:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Service Provision:</strong> To operate, maintain, and personalize the
                  streaming platform.
                </li>
                <li>
                  <strong>Security:</strong> To detect and prevent fraud, abuse, and security
                  incidents.
                </li>
                <li>
                  <strong>Communication:</strong> To send you service announcements, security alerts,
                  and support messages.
                </li>
                <li>
                  <strong>Improvement:</strong> To monitor and analyze trends, usage, and
                  activities to improve the user experience and develop new features.
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/support/terms">
                  <Button>
                    <FileText className="w-4 h-4 mr-2" />
                    Review Terms of Service
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Cookies & Tracking */}
          <Card className="border-border">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-3xl font-bold text-primary mb-4">3. Cookies & Tracking</h3>
              <p className="mb-4 text-muted-foreground">
                We use cookies and similar tracking technologies (like web beacons and pixels) to
                track activity on our service and hold certain information.
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for the website to function (e.g.,
                  maintaining your login session).
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Used to remember your preferences (e.g.,
                  language or volume settings).
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Used to understand how you interact with the
                  service, helping us measure and improve performance.
                </li>
              </ul>
              <div className="mt-6">
                <Button variant="outline" className="border-primary text-primary">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Cookie Preferences
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is
                being sent. However, if you do not accept cookies, you may not be able to use some
                portions of our Service.
              </p>
            </CardContent>
          </Card>

          {/* Section 4 & 5: Data Sharing / External Links */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  4. Data Sharing With Third Parties
                </h3>
                <p className="mb-4 text-muted-foreground">
                  We do not sell your Personal Data. We may share data with third parties only in
                  the following limited circumstances:
                </p>
                <ul className="list-disc ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>
                    With Service Providers performing tasks on our behalf (e.g., payment processing,
                    hosting, analytics).
                  </li>
                  <li>For Legal Obligations (e.g., responding to court orders or government requests).</li>
                  <li>With Your Consent.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  5. Third Party Services / External Links
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Our Service may contain links to other sites that are not operated by us (e.g.,
                  external game stores or content creator pages). If you click on a third-party
                  link, you will be directed to that third party's site.
                </p>
                <p className="text-sm text-muted-foreground">
                  We strongly advise you to review the Privacy Policy of every site you visit. We
                  have no control over and assume no responsibility for the content or privacy
                  practices of any third-party sites or services.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Section 6: Data Retention */}
          <Card className="border-border">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-3xl font-bold text-primary mb-4">
                6. Data Retention (How long we store data)
              </h3>
              <p className="mb-4 text-muted-foreground">
                We retain your Personal Data only for as long as is necessary for the purposes set
                out in this Privacy Policy. This means:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Account Data:</strong> Retained for the duration your account is active.
                </li>
                <li>
                  <strong>Deactivated Accounts:</strong> Retained for a grace period of 90 days for
                  recovery, after which it is anonymized or deleted, unless required by law.
                </li>
                <li>
                  <strong>Usage Data:</strong> Anonymized after 12 months for historical trend
                  analysis.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 7: Data Security Protection */}
          <Card className="border-border">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-3xl font-bold text-primary mb-4">7. Data Security Protection</h3>
              <p className="mb-4 text-muted-foreground">
                The security of your data is paramount. We implement commercially acceptable
                technical and organizational measures designed to protect your Personal Data against
                unauthorized access, disclosure, alteration, or destruction, including:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>Encryption of data both in transit (SSL/TLS) and at rest.</li>
                <li>Regular security audits and vulnerability testing.</li>
                <li>Access controls and multi-factor authentication for internal systems.</li>
              </ul>
              <div className="mt-6">
                <Button variant="outline" className="border-primary text-primary">
                  <Shield className="w-4 h-4 mr-2" />
                  View Security Whitepaper (Internal Link)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section 8 & 9: User Rights / Data Removal */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  8. User Rights (access / edit / delete)
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Depending on your location, you have rights regarding your personal data:
                </p>
                <ul className="list-disc ml-4 space-y-1 text-muted-foreground text-sm">
                  <li>
                    <strong>Right to Access:</strong> Request a copy of the data we hold about you.
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> Request correction of inaccurate or
                    incomplete data.
                  </li>
                  <li>
                    <strong>Right to Erasure ("Right to be forgotten"):</strong> Request deletion of
                    your Personal Data.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  9. Data Removal Request Process
                </h3>
                <p className="mb-4 text-muted-foreground">
                  To exercise your right to removal, please follow these steps:
                </p>
                <ol className="list-decimal ml-6 space-y-1 text-muted-foreground text-sm">
                  <li>Log in to your account and navigate to the Account Settings page.</li>
                  <li>Click the "Request Data Deletion" option.</li>
                  <li>Complete the verification process.</li>
                  <li>A confirmation email will be sent upon successful deletion.</li>
                </ol>
                <p className="mt-4 text-xs text-destructive">
                  Note: Deletion is permanent and cannot be reversed.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Section 10 & 11: Changes / Contact Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  10. Changes to Privacy Policy (updates)
                </h3>
                <p className="mb-4 text-muted-foreground">
                  We may update our Privacy Policy from time to time. We will notify you of any
                  changes by posting the new Privacy Policy on this page and updating the "Last
                  Updated" date at the top.
                </p>
                <p className="text-sm text-muted-foreground">
                  You are advised to review this Privacy Policy periodically for any changes.
                  Changes are effective when they are posted on this page.
                </p>
              </CardContent>
            </Card>

            <Card id="contact-info" className="bg-primary text-primary-foreground border-primary">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold mb-4 border-b border-primary-foreground/50 pb-2">
                  11. Contact Information for Privacy Support
                </h3>
                <p className="mb-4 font-light">
                  If you have any questions about this Privacy Policy, our practices, or need to
                  exercise your user rights, please contact our Data Protection Officer:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:privacy@epicstream.net"
                      className="underline hover:no-underline"
                    >
                      privacy@epicstream.net
                    </a>
                  </p>
                  <p>
                    <strong>Mail:</strong> [Your Company Address Here], Attn: Data Protection
                    Officer
                  </p>
                </div>
                <a href="mailto:privacy@epicstream.net">
                  <Button className="mt-6 bg-background text-primary hover:bg-background/90">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Privacy Inquiry Email
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card mt-12 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>
            &copy; 2025 EpicStream Network. All rights reserved. |{" "}
            <Link href="/support/terms" className="hover:text-foreground transition duration-300">
              Terms of Service
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
