"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Leaf, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Product } from "@/types/admin";

const mainLinks = [
  { label: "Overview", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
];

export function Navbar({ solutions }: { solutions: Product[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Dynamically map the database solutions passed from the layout
  const productLinks = solutions.map((p) => ({
    label: p.shortName,
    href: `/product/${p.slug}`,
    desc: p.tagline,
  }));

  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    setScrolled(window.scrollY > 20);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setProductsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[#FAF9F6]/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2D5A3D] dark:bg-[#4ADE80] transition-colors">
            <Leaf className="h-4 w-4 text-white dark:text-[#0A0A0A]" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5]">
            EcoCatch
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-[#1A1A1A]/70 dark:text-[#E5E5E5]/70 hover:text-[#2D5A3D] dark:hover:text-[#4ADE80] transition-colors rounded-md hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5"
            >
              {link.label}
            </Link>
          ))}

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname.startsWith("/product")
                ? "text-[#2D5A3D] dark:text-[#4ADE80] bg-[#1A1A1A]/5 dark:bg-[#E5E5E5]/5"
                : "text-[#1A1A1A]/70 dark:text-[#E5E5E5]/70 hover:text-[#2D5A3D] dark:hover:text-[#4ADE80] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5"
                }`}
            >
              Products
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Mega Dropdown */}
            <div
              className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all ${productsOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
            >
              <div className="w-[640px] rounded-2xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/5 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold tracking-wider text-[#86868b] uppercase">
                    Our Solutions
                  </p>
                  <Link
                    href="/product"
                    className="text-xs font-medium text-[#2D5A3D] dark:text-[#4ADE80] hover:underline"
                  >
                    View all →
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {productLinks.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="group rounded-xl px-3 py-2.5 transition-colors hover:bg-[#F0F0F0] dark:hover:bg-[#111]"
                    >
                      <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#E5E5E5] group-hover:text-[#2D5A3D] dark:group-hover:text-[#4ADE80] transition-colors">
                        {p.label}
                      </p>
                      <p className="text-[11px] text-[#86868b] leading-snug mt-0.5 line-clamp-1">
                        {p.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ml-2 flex items-center gap-2">
            <ThemeToggle />
            <Button

              size="sm"
              className="rounded-full cursor-pointer bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] dark:text-[#0A0A0A] dark:hover:bg-[#3ec46e] transition-colors font-medium"
            >
              <Link href="/#contact" onClick={handleQuoteClick}>
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            {/* Style the SheetTrigger directly like a button to avoid nesting conflicts */}
            <SheetTrigger className="inline-flex items-center justify-center h-9 w-9 rounded-full hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5 transition-colors cursor-pointer" aria-label="Open menu">
              <Menu className="h-5 w-5 text-[#1A1A1A] dark:text-[#E5E5E5]" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] bg-[#FAF9F6] dark:bg-[#0A0A0A] border-l border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 overflow-y-auto"
            >
              <div className="flex flex-col gap-1 mt-8">
                {mainLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-[#1A1A1A] dark:text-[#E5E5E5] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Products Expandable */}
                <div className="mt-2">
                  <p className="px-3 text-xs font-bold tracking-wider text-[#86868b] uppercase mb-2">
                    Products
                  </p>
                  <div className="space-y-1">
                    <Link
                      href="/product"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-[#2D5A3D] dark:text-[#4ADE80] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5"
                    >
                      All Products →
                    </Link>
                    {productLinks.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-[#86868b] hover:bg-[#1A1A1A]/5 dark:hover:bg-[#E5E5E5]/5 hover:text-[#1A1A1A] dark:hover:text-[#E5E5E5] transition-colors"
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-6 px-3">
                  <Button className="w-full rounded-full bg-[#2D5A3D] text-white hover:bg-[#1e3d29] dark:bg-[#4ADE80] dark:text-[#0A0A0A] dark:hover:bg-[#3ec46e] font-medium">
                    <Link href="/#contact" onClick={handleQuoteClick}>
                      Get a Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}