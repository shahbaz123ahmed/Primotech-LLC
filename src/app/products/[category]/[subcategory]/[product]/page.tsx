import ProductDetail from '@/app/components/Products/ProductDetail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/catalog';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const { product } = await params;
    const productData = getProductBySlug(product);

    if (!productData) {
        return { title: 'Product Not Found' };
    }

    return {
        title: `${productData.name} | ${productData.subTitle || 'Premium Security Product'} - PrimoTech LLC`,
        description: productData.description.substring(0, 160),
        keywords: [
            `${productData.name} UAE`, `${productData.name} Price Dubai`, `${productData.name} Supplier Middle East`,
            `${productData.name} Specification`, `${productData.name} Features`, `${productData.name} Manual`,
            `${productData.subCategory} Solutions`, "PrimoTech LLC Security", "Professional CCTV Camera UAE",
            "Enterprise Surveillance Dubai", "Industrial Monitoring Systems", "AI Powered Security Cameras",
            "4K Surveillance Dubai", "Security System Integration", "High Definition Security UAE",
            "IP Camera Supplier UAE", "NVR Systems Dubai", "Wireless Security Kits UAE",
        ],
        alternates: {
            canonical: `/products/${productData.categorySlug}/${productData.subcategorySlug}/${product}`,
        },
    };
}

const ProductPage = async ({ params }: { params: any }) => {
    const { product } = await params;
    const productData = getProductBySlug(product);

    if (!productData) {
        notFound();
    }

    // Product Schema (AEO/GEO)
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productData.name,
        "image": productData.images,
        "description": productData.description,
        "sku": productData.slug,
        "brand": {
            "@type": "Brand",
            "name": "PrimoTech LLC"
        },
        "manufacturer": "PrimoTech LLC",
        "category": productData.category
    };

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <ProductDetail product={productData} />
        </main>
    );
};

export default ProductPage;
