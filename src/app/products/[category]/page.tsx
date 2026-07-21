import CategoryContent from './CategoryContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getSubcategoriesByCategory } from '@/lib/catalog';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const { category } = await params;
    const categoryData = getCategoryBySlug(category);

    if (!categoryData) {
        return { title: 'Category Not Found' };
    }

    return {
        title: `${categoryData.name} | Advanced Security Solutions - PrimoTech LLC`,
        description: categoryData.description1 || `Explore our professional range of ${categoryData.name} solutions. High-performance security technology from PrimoTech LLC.`,
        keywords: [
            `${categoryData.name} UAE`, `${categoryData.name} Dubai`, `Professional ${categoryData.name}`,
            "Security Solutions", "PrimoTech LLC", "CCTV Supplier Middle East",
            "Industrial Security UAE", "Enterprise CCTV Dubai", "Smart Surveillance UAE",
            "Hikvision Partner UAE", "Uniarch Products Dubai", "Security System Integration",
            "Advanced Monitoring Solutions", "Integrated Security Dubai", "Professional CCTV Dubai",
            "Security Hardware UAE", "Surveillance Technology Middle East", "CCTV Installation Dubai",
            "Business Security UAE", "Residential Surveillance Dubai", "AI Powered Security",
            "4K Security Cameras UAE", "Access Control Dubai", "Video Intercom UAE",
            "SIRA Approved Security Dubai", "DPS Certified CCTV UAE", "Security Hardware Supplier",
            "Electronic Security UAE", "Advanced Surveillance Tech Dubai", "CCTV Maintenance UAE",
            "Network Security Dubai", "Digital Video Recorders UAE", "Remote Monitoring Dubai",
            "Security Consultation UAE", "IoT Security Dubai", "Smart Surveillance UAE",
        ],
        alternates: {
            canonical: `/products/${category}`,
        },
    };
}

const CategoryPage = async ({ params }: { params: any }) => {
    const { category } = await params;

    const categoryData = getCategoryBySlug(category);

    if (!categoryData) {
        notFound();
    }

    const subcategories = getSubcategoriesByCategory(category);

    // CollectionPage Schema
    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": categoryData.name,
        "description": categoryData.description1 || `High-performance security solutions in the ${categoryData.name} category.`,
        "url": `https://primotech-llc.com/products/${category}`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": subcategories.map((sub, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://primotech-llc.com/products/${category}/${sub.slug}`,
                "name": sub.name
            }))
        }
    };

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <CategoryContent
                categoryData={categoryData}
                initialSubcategories={subcategories}
            />
        </main>
    );
};

export default CategoryPage;