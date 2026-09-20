import { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
    title: "Cookie Policy — EcoCatch Energy Solutions",
    description: "Learn how EcoCatch Energy Solutions uses cookies and similar technologies on ecocatch.in.",
    alternates: {
        canonical: "/cookie-policy",
    },
};

export default function CookiePolicyPage() {
    return (
        <>
            <main className="min-h-screen bg-[#FAF9F6] dark:bg-[#0A0A0A] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <article className="mx-auto max-w-4xl bg-white dark:bg-[#111] p-8 sm:p-12 rounded-3xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 shadow-sm space-y-8 text-[#1A1A1A] dark:text-[#E5E5E5]">
                    <header className="border-b border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 pb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Cookie Policy</h1>
                        <p className="text-sm text-[#86868b] mt-2">Last Updated: September 2026</p>
                    </header>

                    <section className="space-y-4 text-sm sm:text-base leading-relaxed text-[#1A1A1A]/80 dark:text-[#E5E5E5]/80">
                        <p>
                            This Cookie Policy explains how EcoCatch Energy Solutions Pvt. Ltd. (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies and similar storage technologies on{" "}
                            <a href="https://ecocatch.in" className="text-[#2D5A3D] dark:text-[#4ADE80] underline">ecocatch.in</a>.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">1. What Are Cookies</h2>
                        <p>
                            Cookies are small text files placed on your device by websites you visit. They are widely used to make websites function correctly, remember your preferences, and provide site owners with information about how the site is used.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">2. Cookies We Use</h2>
                        <p>We currently use a limited set of essential technologies:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <span className="font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">Strictly Necessary Cookies:</span> A secure, HTTP-only authentication cookie (<code>admin_token</code>) is set only for logged-in administrators to access the internal admin dashboard. This cookie is not set for regular website visitors.
                            </li>
                            <li>
                                <span className="font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">Local Storage (Preferences):</span> We use your browser&apos;s local storage — not a cookie — to remember your light/dark theme preference. This never leaves your device and is not accessible to us.
                            </li>
                        </ul>
                        <p>
                            We do not currently use third-party advertising, tracking, or analytics cookies. If this changes in the future — for example, if we add analytics tools to understand site traffic — we will update this policy and, where required by law, request your consent first.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">3. Managing Cookies</h2>
                        <p>
                            Most browsers let you refuse or delete cookies through their settings. Since we only use a strictly necessary cookie for admin authentication, disabling cookies will not affect your experience browsing the public website, but administrators will not be able to log in without it.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">4. Changes to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in the technologies we use. Please check back periodically for the latest version.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">5. Contact Us</h2>
                        <p>If you have questions about this Cookie Policy, contact us at:</p>
                        <p className="font-medium">
                            EcoCatch Energy Solutions Pvt. Ltd.<br />
                            Email: <span className="text-[#2D5A3D] dark:text-[#4ADE80]">info@ecocatch.in</span><br />
                            Mumbai, Maharashtra, India
                        </p>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    );
}