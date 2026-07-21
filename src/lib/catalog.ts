// =============================================================================
// PRIMOTECH LLC - STATIC CATALOG HELPER FUNCTIONS
// =============================================================================
// These helpers work with the static arrays in src/data/catalog.ts.
// They are safe to call even when arrays are empty — they will never throw.
// =============================================================================

import {
  categories,
  subcategories,
  products,
  type Category,
  type SubCategory,
  type Product,
} from '@/data/catalog';

// ---- CATEGORY HELPERS -------------------------------------------------------

/** Returns all published categories sorted by order. */
export function getAllCategories(): Category[] {
  return categories
    .filter((c) => c.status === 'published')
    .sort((a, b) => a.order - b.order);
}

/** Returns a single category matching the given slug, or undefined. */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug && c.status === 'published');
}

// ---- SUBCATEGORY HELPERS ----------------------------------------------------

/** Returns all published subcategories for a given category slug. */
export function getSubcategoriesByCategory(categorySlug: string): SubCategory[] {
  return subcategories.filter(
    (s) => s.categorySlug === categorySlug && s.status === 'published'
  );
}

/** Returns a single subcategory by slug, or undefined. */
export function getSubcategoryBySlug(slug: string): SubCategory | undefined {
  return subcategories.find((s) => s.slug === slug && s.status === 'published');
}

// ---- PRODUCT HELPERS --------------------------------------------------------

/** Returns all published products under a given subcategory slug. */
export function getProductsBySubcategory(subcategorySlug: string): Product[] {
  return products.filter(
    (p) => p.subcategorySlug === subcategorySlug && p.status === 'published'
  );
}

/** Returns a single product by slug, or undefined. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug && p.status === 'published');
}

/** Returns the N most recently added published products. Defaults to 10. */
export function getLatestProducts(limit: number = 10): Product[] {
  return products
    .filter((p) => p.status === 'published')
    .slice(0, limit);
}

/**
 * Returns products in the same category as the given product,
 * excluding the product itself. Useful for "Related Products" sections.
 */
export function getRelatedProducts(
  currentProductSlug: string,
  categorySlug: string,
  limit: number = 8
): Product[] {
  return products
    .filter(
      (p) =>
        p.categorySlug === categorySlug &&
        p.slug !== currentProductSlug &&
        p.status === 'published'
    )
    .slice(0, limit);
}

/** Returns all featured published products. */
export function getFeaturedProducts(limit: number = 4): Product[] {
  return products
    .filter((p) => p.isFeatured && p.status === 'published')
    .slice(0, limit);
}
