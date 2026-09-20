import { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata : Metadata = {
    title: "Privacy Policy — EcoCatch Energy Solutions",
    description: "Learn how EcoCatch Energy Solutions collects, uses, and protects your personal data.",
};


export default function PrivacyPolicyPage() {
    return (
        <>
            <main className="min-h-screen bg-[#FAF9F6] dark:bg-[#0A0A0A] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <article className="mx-auto max-w-4xl bg-white dark:bg-[#111] p-8 sm:p-12 rounded-3xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 shadow-sm space-y-8 text-[#1A1A1A] dark:text-[#E5E5E5]">
                    <header className="border-b border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 pb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Privacy Policy</h1>
                        <p className="text-sm text-[#86868b] mt-2">Last Updated: August 2026</p>
                    </header>

                    <section className="space-y-4 text-sm sm:text-base leading-relaxed text-[#1A1A1A]/80 dark:text-[#E5E5E5]/80">
                        <p>
                            EcoCatch Energy Solutions Pvt. Ltd. (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you visit our website at{" "}
                            <a href="https://ecocatch.in" className="text-[#2D5A3D] dark:text-[#4ADE80] underline">ecocatch.in</a> or interact with our services.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">1. Information We Collect</h2>
                        <p>We may collect personal information that you voluntarily provide to us when you fill out contact or inquiry forms, including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Full Name</li>
                            <li>Email Address</li>
                            <li>Phone Number and Location</li>
                            <li>Project requirements and message contents</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">2. How We Use Your Information</h2>
                        <p>We use the collected information for purposes including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Responding directly to your inquiries and consultation requests.</li>
                            <li>Providing engineering, EPC, and BioGAS plant project estimates.</li>
                            <li>Improving website performance, customer experience, and service delivery.</li>
                            <li>Complying with applicable legal obligations.</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">3. Data Protection & Security</h2>
                        <p>
                            We implement industry-standard technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We do not sell, trade, or rent your personal data to third parties.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">4. Google API Services User Data Policy</h2>
                        <p>
                            Our internal administrative tools may use Google APIs (such as the Gmail API) strictly for authorized administrative personnel to reply directly to customer service inquiries. We adhere to the{" "}
                            <a
                                href="https://developers.google.com/terms/api-services-user-data-policy"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#2D5A3D] dark:text-[#4ADE80] underline"
                            >
                                Google API Services User Data Policy
                            </a>
                            , including the Limited Use requirements.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">5. Contact Us</h2>
                        <p>
                            If you have any questions or concerns regarding this Privacy Policy, contact us at:
                        </p>
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