import { MetadataRoute } from 'next';
import { getAllCategories, getSubcategoriesByCategory, getProductsBySubcategory } from '@/lib/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://primotech-llc.com';
  
  const categories = getAllCategories();

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/products',
    '/support',
    '/support/faq',
    '/support/video',
    '/partner',
    '/tips',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/products' ? 0.9 : route === '/contact' ? 0.9 : 0.8,
  }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const subcategoryRoutes = categories.flatMap((cat) =>
    getSubcategoriesByCategory(cat.slug).map((sub) => ({
      url: `${baseUrl}/products/${cat.slug}/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  );

  const productRoutes = categories.flatMap((cat) =>
    getSubcategoriesByCategory(cat.slug).flatMap((sub) =>
      getProductsBySubcategory(sub.slug).map((prod) => ({
        url: `${baseUrl}/products/${cat.slug}/${sub.slug}/${prod.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))
    )
  );

  return [...staticRoutes, ...categoryRoutes, ...subcategoryRoutes, ...productRoutes];
}
