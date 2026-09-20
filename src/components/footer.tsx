'use client'
import { Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Sustainability Report", href: "#" },
    { label: "Contact Us", href: "/#contact" }
  ],
  Solutions: [
    { label: "BioGAS Plants", href: "#" },
    { label: "Water Treatment", href: "#" },
    { label: "Agriculture", href: "#" },
    { label: "EPC Consulting", href: "#" }
  ],
  Resources: [
    { label: "Case Studies", href: "#" },
    { label: "Blog", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Documentation", href: "#" }
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Sitemap", href: "/sitemap.xml" }
  ],
};

export function Footer() {
  const pathname = usePathname();
  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  return (
    <footer className="border-t border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-[#FAF9F6] dark:bg-[#0A0A0A] px-4 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2D5A3D] dark:bg-[#4ADE80]">
                <Leaf className="h-4 w-4 text-white dark:text-[#0A0A0A]" />
              </div>
              <span className="text-lg font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">EcoCatch</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#86868b] mb-6">
              Catching the ECO factor and spreading awareness from farm to factory since 2016. A small step can make a bigger footprint.
            </p>
            <div className="flex gap-3">
              {[FaLinkedin, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1A1A]/5 dark:bg-[#E5E5E5]/5 text-[#86868b] hover:bg-[#2D5A3D] hover:text-white dark:hover:bg-[#4ADE80] dark:hover:text-[#0A0A0A] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-[#1A1A1A] dark:text-[#E5E5E5]">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      onClick={(e) => {
                        if (link.href === "/#contact") {
                          handleQuoteClick(e);
                        }
                      }}
                      className="text-sm text-[#86868b] hover:text-[#2D5A3D] dark:hover:text-[#4ADE80] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 pt-8 sm:flex-row">
          <p className="text-md text-[#86868b]">
            &copy; {new Date().getFullYear()} EcoCatch Energy Solutions Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-[#86868b]">
            Made with care in Mumbai, India
          </p>
        </div>
      </div>
    </footer>
  );
}