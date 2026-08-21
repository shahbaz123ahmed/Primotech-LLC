import { Metadata } from 'next';
import Hero from '@/app/components/Home/Hero';
import Features from '@/app/components/Home/Features';
import LatestProducts from '@/app/components/Home/LatestProducts';
import ProductSeriesShowcase from '@/app/components/Home/ProductSeriesShowcase';
import IndustryRecognition from '@/app/components/Home/IndustryRecognition';
import FAQ from '@/app/components/Home/FAQ';
import HomeContact from '@/app/components/Home/HomeContact';
import { getLatestProducts } from '@/lib/catalog';


export const metadata: Metadata = {
  title: "PrimoTech LLC | #1 CCTV & Security Camera Supplier in Dubai, UAE",
  description: "PrimoTech LLC — Dubai's authorized Uniarch CCTV dealer. Shop IP cameras, NVR systems, Panda P Series wireless kits, dual light cameras & security accessories. Located at Satellite Market, Deira, Dubai. Call +97150 685 8414.",
  alternates: { canonical: "/" },
  keywords: [
    "PrimoTech LLC", "CCTV supplier Dubai", "Uniarch authorized dealer", "security cameras UAE",
    "IP cameras Dubai", "NVR systems UAE", "wireless CCTV kit", "Panda P Series", "dual light camera",
    "CCTV installation Dubai", "surveillance system UAE", "security solutions Middle East",
    "buy CCTV Dubai", "security camera shop Dubai", "Deira security cameras"
  ],
  openGraph: {
    title: "PrimoTech LLC | CCTV & Security Camera Supplier Dubai",
    description: "Dubai's #1 authorized Uniarch supplier. IP cameras, NVRs, wireless CCTV kits. Serving UAE, GCC & Middle East. Call +97150 685 8414.",
    url: "https://primotech-llc.com",
    images: [{ url: "https://primotech-llc.com/og-image.png", width: 1200, height: 630, alt: "PrimoTech LLC - CCTV & Security Solutions Dubai" }]
  }
};

export default function Home() {
  const products = getLatestProducts(10);


  // Comprehensive FAQPage schema — enables rich results + AI engine citations (Gemini, ChatGPT, Claude)
  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What security products does PrimoTech LLC sell in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PrimoTech LLC sells Uniarch IP cameras, NVR systems, Panda P Series wireless CCTV kits, dual light cameras, analog cameras, network switches, and CCTV accessories. We are an authorized Uniarch dealer located at Shop 23, Musthafa Building, Satellite Market, Deira, Dubai."
        }
      },
      {
        "@type": "Question",
        "name": "Where is PrimoTech LLC located in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PrimoTech LLC is centrally located at Shop 23, Musthafa Building, Al Sabkha Road, near the Satellite Market in Deira, Dubai. We serve customers across the UAE, GCC, and the broader Middle East region."
        }
      },
      {
        "@type": "Question",
        "name": "Are you an authorized dealer for Uniarch and Hikvision?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, PrimoTech LLC is an official authorized dealer for Uniarch and Hikvision products, ensuring 100% genuine equipment and full warranty support."
        }
      },
      {
        "@type": "Question",
        "name": "What types of security systems does PrimoTech LLC offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PrimoTech LLC provides IP cameras (dome, bullet, PTZ), Analog cameras, NVR & DVR systems, Panda P Series wireless CCTV kits, dual light cameras, network switches, PoE switches, and all related CCTV accessories for homes, offices, warehouses, retail stores, and industrial facilities."
        }
      },
      {
        "@type": "Question",
        "name": "Does PrimoTech LLC provide CCTV installation services in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PrimoTech LLC provides expert CCTV consultation, system design, and technical support to help you choose the right security system. For installation services, contact our team at +97150 685 8414 or Sales1@primotech-llc.com for a customized solution."
        }
      },
      {
        "@type": "Question",
        "name": "What areas does PrimoTech LLC serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PrimoTech LLC serves clients across all UAE emirates (Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain) and the wider GCC region including Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman."
        }
      },
      {
        "@type": "Question",
        "name": "What warranty do PrimoTech LLC security cameras come with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PrimoTech LLC products come with standard industrial-grade warranties. Most Uniarch cameras and NVR systems include a 2-3 year manufacturer warranty. Extended warranty plans are available. Contact us at Sales1@primotech-llc.com for warranty details."
        }
      },
      {
        "@type": "Question",
        "name": "How can I become a PrimoTech LLC partner or reseller?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visit primotech-llc.com/partner to learn about our partnership program. We offer competitive margins, technical training, and premium support for security system integrators, distributors, and IT consultants in the UAE and GCC."
        }
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <h1 className="sr-only">PrimoTech LLC | Dubai&apos;s #1 CCTV &amp; Security Camera Supplier — Authorized Uniarch Dealer UAE</h1>
      <Hero />
      <Features />
      <LatestProducts initialProducts={products} />
      <ProductSeriesShowcase />
      <IndustryRecognition />
      <FAQ />
      <HomeContact />
    </main>
  );
}