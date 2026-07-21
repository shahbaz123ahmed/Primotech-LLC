export interface Technology {
  title: string;
  icon: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description1: string;
  description2: string;
  image1: string;
  image2: string;
  status: 'published' | 'draft';
  order: number;
  technologies: Technology[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  parentCategory: string;
  categorySlug: string;
  image?: string;
  status: 'published' | 'draft';
  order?: number;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  subCategory: string;
  subcategorySlug: string;
  subTitle?: string;
  description: string;
  images: string[];
  keyFeatures: string[];
  keyHighlights?: string[];
  status: 'published' | 'draft';
  isFeatured: boolean;
  technicalSpecs?: Record<string, SpecItem[]>;
  metaTitle?: string;
  metaDescription?: string;
}
