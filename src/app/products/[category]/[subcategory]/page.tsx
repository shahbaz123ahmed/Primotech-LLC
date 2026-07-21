import SubcategoryContent from './SubcategoryContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubcategoryBySlug, getProductsBySubcategory } from '@/lib/catalog';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const { category, subcategory } = await params;
    const subcategoryData = getSubcategoryBySlug(subcategory);

    if (!subcategoryData) {
        return { title: 'Sub-Category Not Found' };
    }

    return {
        title: `${subcategoryData.name} | Professional Security Equipment - PrimoTech LLC`,
        description: subcategoryData.description || `Explore our specialized ${subcategoryData.name} range in the ${category} category. High-performance, enterprise-grade security solutions from PrimoTech LLC.`,
        keywords: [
            `${subcategoryData.name} UAE`, `${subcategoryData.name} Dubai`, `Professional ${subcategoryData.name}`,
            `${subcategoryData.name} Price UAE`, `${subcategoryData.name} Installation`,
            "Security Equipment", "PrimoTech LLC", "CCTV Middle East", "Surveillance Solutions Dubai",
            "Industrial Security Camera", "IP Surveillance UAE", "NVR Systems Dubai", "4K Security Camera UAE",
            "Professional Surveillance Tech", "Security Hardware Supplier Dubai", "Advanced Monitoring UAE",
            "Business Security Systems", "Residential CCTV Dubai", "AI Surveillance Technology",
        ],
        alternates: {
            canonical: `/products/${category}/${subcategory}`,
        },
    };
}

const SubcategoryPage = async ({ params }: { params: any }) => {
    const { category, subcategory } = await params;

    const subcategoryData = getSubcategoryBySlug(subcategory);

    if (!subcategoryData) {
        notFound();
    }

    const products = getProductsBySubcategory(subcategory);

    // CollectionPage Schema
    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": subcategoryData.name,
        "description": subcategoryData.description || `Specialized security solutions from the ${subcategoryData.name} series.`,
        "url": `https://primotech-llc.com/products/${category}/${subcategory}`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": products.map((prod, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://primotech-llc.com/products/${category}/${subcategory}/${prod.slug}`,
                "name": prod.name
            }))
        }
    };

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <SubcategoryContent
                subcategoryData={subcategoryData}
                categorySlug={category}
                initialProducts={products}
            />
        </main>
    );
};

export default SubcategoryPage;
