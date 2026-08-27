// export interface ProductSpec {
//   label: string;
//   value: string;
// }

// export interface Product {
//   slug: string;
//   name: string;
//   shortName: string;
//   tagline: string;
//   description: string;
//   longDescription?: string;
//   features?: string[];
//   specs?: ProductSpec[];
//   applications?: string[];
//   image?: string;
//   brand?: string;
//   brandOrigin?: string;
//   category: "agitation" | "feeding" | "mixing" | "separation" | "pumping" | "odorizing" | "solution";
// }

// export const products: Product[] = [
//   {
//     slug: "anaerobic-digester-agitation-solution",
//     name: "Anaerobic Digester Agitation Solution",
//     shortName: "Agitation Systems",
//     tagline: "Keep the biology moving. Maximize gas yield.",
//     description:
//       "Proper agitation is critical for anaerobic digestion efficiency. Our agitation systems ensure homogeneous mixing of substrates, preventing stratification and scum formation while maintaining optimal temperature distribution.",
//     longDescription:
//       "ECOCATCH supplies advanced anaerobic digester agitation solutions designed to maintain optimal mixing conditions inside digesters. Proper agitation prevents substrate stratification, eliminates dead zones, ensures uniform temperature distribution, and maximizes biogas yield. Our systems are engineered for continuous or intermittent operation based on digester design and feedstock characteristics.",
//     features: [
//       "Submersible and side-entry mixer options",
//       "Variable speed drives for energy optimization",
//       "Corrosion-resistant stainless steel construction",
//       "Low-shear design to protect microbial cultures",
//       "Retrofit solutions for existing digesters",
//       "Remote monitoring and automation ready",
//     ],
//     applications: [
//       "Agricultural biogas plants",
//       "Food waste digesters",
//       "Municipal sewage treatment",
//       "Industrial effluent digesters",
//     ],
//     brand: "DODA / Custom",
//     category: "agitation",
//   },
//   {
//     slug: "digester-feeding-application",
//     name: "Digester Feeding Application",
//     shortName: "Feeding Systems",
//     tagline: "Precise, continuous, contamination-free feeding.",
//     description:
//       "Automated feeding systems that deliver the right substrate at the right time. From solid waste to liquid manure, our feeding solutions handle diverse feedstocks with precision.",
//     longDescription:
//       "Consistent and accurate feeding is the foundation of efficient biogas production. ECOCATCH's digester feeding application systems handle solid, semi-solid, and liquid substrates with precision dosing. Our systems prevent contamination, ensure continuous operation, and integrate seamlessly with pre-treatment equipment like shredders and separators.",
//     features: [
//       "Precision dosing with load-cell integration",
//       "Handles solid, liquid, and semi-solid substrates",
//       "Contamination detection and rejection",
//       "Automated scheduling and batch control",
//       "Integration with pre-treatment lines",
//       "Hygienic design with CIP compatibility",
//     ],
//     applications: [
//       "Dairy farm digesters",
//       "Food processing waste",
//       "Agricultural residue",
//       "Organic fraction of MSW",
//     ],
//     brand: "DODA / Custom",
//     category: "feeding",
//   },
//   {
//     slug: "digester-mixer-aerator",
//     name: "Digester Mixer & Aerator",
//     shortName: "Mixer & Aerator",
//     tagline: "Dual-function efficiency for aerobic and anaerobic phases.",
//     description:
//       "Versatile mixer-aerator units that provide both gentle mixing and controlled aeration. Ideal for two-stage digestion systems and aerobic pre-treatment.",
//     longDescription:
//       "The Digester Mixer & Aerator combines gentle, low-shear mixing with precise oxygen delivery. This dual-function equipment is essential for plants running two-stage digestion (aerobic hydrolysis followed by anaerobic methanogenesis) or requiring aerobic pre-treatment. The design ensures optimal mass transfer while protecting sensitive microbial communities.",
//     features: [
//       "Combined mixing and aeration in one unit",
//       "Adjustable oxygen transfer rate",
//       "Low-energy impeller design",
//       "Suitable for aerobic and anaerobic zones",
//       "Floating or fixed installation options",
//       "Low maintenance submersible motor",
//     ],
//     applications: [
//       "Two-stage biogas plants",
//       "Aerobic pre-treatment tanks",
//       "Post-digestion polishing",
//       "Composting leachate treatment",
//     ],
//     brand: "DODA",
//     category: "mixing",
//   },
//   {
//     slug: "digester-mixer-chopper-pump",
//     name: "Digester Mixer & Chopper Pump",
//     shortName: "Chopper Pump",
//     tagline: "Mix, macerate, and pump in one powerful unit.",
//     description:
//       "Heavy-duty chopper pumps that simultaneously mix digester contents and macerate fibrous materials. Prevents clogging and ensures smooth recirculation.",
//     longDescription:
//       "Fibrous materials like straw, manure, and crop residues can clog standard pumps and pipes. The Digester Mixer & Chopper Pump solves this by integrating a high-shear chopping mechanism with a robust mixing impeller. It continuously recirculates and macerates the digestate, preventing blockages and improving hydraulic flow throughout the system.",
//     features: [
//       "Integrated chopping blade for fibrous material",
//       "High-torque mixing impeller",
//       "Recirculation and transfer modes",
//       "Hardened steel cutting elements",
//       "Submersible or dry-pit installation",
//       "Overload protection and variable speed",
//     ],
//     applications: [
//       "Straw-rich agricultural digesters",
//       "Manure-based biogas plants",
//       "Energy crop digestion",
//       "High-fiber food waste",
//     ],
//     brand: "DODA",
//     category: "pumping",
//   },
//   {
//     slug: "doda-bio-separator",
//     name: "DODA BIO Separator",
//     shortName: "BIO Separator",
//     tagline: "Separate solids from digestate with precision.",
//     description:
//       "The DODA BIO Separator efficiently separates solid and liquid fractions of digestate. Produces dry stackable fiber and nutrient-rich liquid fertilizer.",
//     longDescription:
//       "After anaerobic digestion, the digestate must be separated into solid and liquid fractions for optimal reuse. The DODA BIO Separator uses a screw press mechanism to extract maximum dry matter from the solid fraction while preserving nutrients in the liquid phase. The result is a dry, stackable fiber suitable for bedding or composting, and a liquid fertilizer ready for field application.",
//     features: [
//       "Screw press technology with adjustable pressure",
//       "High dry-matter output (up to 30% DM)",
//       "Low energy consumption per ton",
//       "Stainless steel screen and screw",
//       "Continuous operation with minimal supervision",
//       "Compact skid-mounted design",
//     ],
//     specs: [
//       { label: "Capacity", value: "5–40 m³/hour" },
//       { label: "Dry Matter Output", value: "Up to 30%" },
//       { label: "Screen Size", value: "0.5–2.0 mm options" },
//       { label: "Power", value: "5.5–22 kW" },
//     ],
//     applications: [
//       "Digestate dewatering",
//       "Cow manure separation",
//       "Biogas plant effluent",
//       "Compost preparation",
//     ],
//     brand: "DODA",
//     brandOrigin: "Italy",
//     category: "separation",
//   },
//   {
//     slug: "separators",
//     name: "Separators",
//     shortName: "Separators",
//     tagline: "Solid-liquid separation for every scale.",
//     description:
//       "A range of screw press, roller, and mobile separation units for slurry, digestate, and industrial effluents. Engineered for reliability and high throughput.",
//     longDescription:
//       "ECOCATCH supplies a comprehensive range of separators for agricultural and industrial applications. From fixed screw press separators for continuous biogas operation to mobile units that can be deployed directly at slurry storage areas, our separation solutions are designed for reliability, efficiency, and ease of maintenance. CAD-engineered bearing structures ensure long service life under heavy loads.",
//     features: [
//       "Screw press separators (fixed and mobile)",
//       "Compression roller separators for high volume",
//       "Mobile separation units (no fixed plant required)",
//       "CAD-engineered bearing structures",
//       "Various screen sizes for different materials",
//       "Integrated control panels with automation",
//     ],
//     applications: [
//       "Biogas digestate dewatering",
//       "Raw slurry separation",
//       "Industrial effluent treatment",
//       "Composting facilities",
//     ],
//     brand: "DODA",
//     brandOrigin: "Italy",
//     category: "separation",
//   },
//   {
//     slug: "total-solution",
//     name: "Total Solution",
//     shortName: "Total Solution",
//     tagline: "One partner. End-to-end. From concept to commissioning.",
//     description:
//       "ECOCATCH's Total Solution covers every phase of your biogas or environmental project — feasibility, design, equipment supply, installation, commissioning, and after-sales support.",
//     longDescription:
//       "Why coordinate multiple vendors when one partner can deliver everything? ECOCATCH's Total Solution is a comprehensive EPC offering that covers feasibility studies, detailed engineering, equipment procurement from global partners, civil works supervision, mechanical installation, electrical and automation integration, commissioning, and long-term operation support. We are your single point of accountability.",
//     features: [
//       "Feasibility study and feedstock analysis",
//       "Detailed engineering and 3D modeling",
//       "Global equipment procurement (Italy, UK, US, NI)",
//       "Civil, mechanical, and electrical installation",
//       "Automation and SCADA integration",
//       "Commissioning, training, and O&M support",
//     ],
//     applications: [
//       "Greenfield biogas plants",
//       "Brownfield upgrades and retrofits",
//       "Waste-to-energy facilities",
//       "Industrial ETP/STP projects",
//     ],
//     brand: "ECOCATCH EPC",
//     category: "solution",
//   },
// ];

// // Additional product categories shown on /product page
// export const productCategories: Product[] = [
//   {
//     slug: "odorizing-systems",
//     name: "AMAG RETI Odorizing Systems",
//     shortName: "Odorizing",
//     tagline: "Italian precision for safe gas distribution.",
//     description:
//       "Predesigned, ready-to-install odorizing systems for BioCNG, CNG, and LPG. Installed by principal-trained technicians with Pan-India sell & service support.",
//     features: [
//       "THT odorizing: 10mg to 200mg per SCM",
//       "Tank capacities: 100L to 260L",
//       "Manual and automatic flow control",
//       "Pipeline odorizing options available",
//       "Experienced technician installation",
//     ],
//     brand: "AMAG RETI",
//     brandOrigin: "Italy",
//     category: "odorizing",
//   },
//   {
//     slug: "low-pressure-pumps",
//     name: "DODA Low Pressure Pumps",
//     shortName: "Low Pressure Pumps",
//     tagline: "Reliable transfer for agricultural and biogas applications.",
//     description:
//       "DODA low pressure pumps are designed for gentle transfer of slurry, digestate, and agricultural effluents. Robust construction with high abrasion resistance.",
//     brand: "DODA",
//     brandOrigin: "Italy",
//     category: "pumping",
//   },
//   {
//     slug: "high-pressure-pumps",
//     name: "DODA High Pressure Pumps",
//     shortName: "High Pressure Pumps",
//     tagline: "Chopper pumps for thick and non-homogeneous slurry.",
//     description:
//       "High pressure chopper pumps that can treat thick, fibrous, and non-homogeneous slurry. Available with PTO, diesel, or electric motor drives.",
//     brand: "DODA",
//     brandOrigin: "Italy",
//     category: "pumping",
//   },
//   {
//     slug: "high-flow-water-pumps",
//     name: "DODA High Flow Water Pumps",
//     shortName: "High Flow Pumps",
//     tagline: "Irrigation and drainage at scale.",
//     description:
//       "GP series pumps for irrigation, drainage, and flood control. High flow rates with frame-mounted tractor PTO or independent engine drives.",
//     brand: "DODA",
//     brandOrigin: "Italy",
//     category: "pumping",
//   },
//   {
//     slug: "drag-injectors",
//     name: "DODA Drag Injectors & Flat Hose",
//     shortName: "Drag Injectors",
//     tagline: "Direct soil injection with zero environmental impact.",
//     description:
//       "Drag injectors that place slurry directly into the soil without surface spreading. Eliminates odor, reduces nutrient loss, and complies with environmental regulations.",
//     brand: "DODA",
//     brandOrigin: "Italy",
//     category: "feeding",
//   },
// ];

// export const allProducts: Product[] = [...products, ...productCategories];

// export function getProductBySlug(slug: string) {
//   return allProducts.find((p) => p.slug === slug);
// }