import { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
    title: "Terms of Service — EcoCatch Energy Solutions",
    description: "Terms and conditions governing the use of EcoCatch Energy Solutions website and services.",
};

export default function TermsOfServicePage() {
    return (
        <>
            <main className="min-h-screen bg-[#FAF9F6] dark:bg-[#0A0A0A] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <article className="mx-auto max-w-4xl bg-white dark:bg-[#111] p-8 sm:p-12 rounded-3xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 shadow-sm space-y-8 text-[#1A1A1A] dark:text-[#E5E5E5]">
                    <header className="border-b border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 pb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Terms of Service</h1>
                        <p className="text-sm text-[#86868b] mt-2">Last Updated: August 2026</p>
                    </header>

                    <section className="space-y-4 text-sm sm:text-base leading-relaxed text-[#1A1A1A]/80 dark:text-[#E5E5E5]/80">
                        <p>
                            Welcome to EcoCatch Energy Solutions. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">1. Use of Website</h2>
                        <p>
                            The content provided on this website is for general informational purposes relating to our BioGAS engineering, EPC consulting, and sustainable energy equipment. You agree not to misuse the website or attempt to compromise its security.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">2. Intellectual Property</h2>
                        <p>
                            All trademarks, logos, brand names, product documentation, animations, and website design elements are the proprietary intellectual property of EcoCatch Energy Solutions Pvt. Ltd. and are protected under applicable copyright laws.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">3. Limitation of Liability</h2>
                        <p>
                            While we strive to ensure technical specifications and data are accurate, all plant feasibility calculations, estimates, and project specifications provided through preliminary web inquiries are subject to formal site assessment and contractual confirmation.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">4. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of the Republic of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                        </p>

                        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] pt-4">5. Contact Information</h2>
                        <p>
                            For legal inquiries or questions regarding our terms, reach out to us at:
                        </p>
                        <p className="font-medium">
                            EcoCatch Energy Solutions Pvt. Ltd.<br />
                            Email: <span className="text-[#2D5A3D] dark:text-[#4ADE80]">legal@ecocatch.in</span><br />
                            Mumbai, Maharashtra, India
                        </p>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    );
}