import { Category, SubCategory } from '../../types';

export const accessoriesCategory: Category = {
  id: 'cat-accessories',
  name: 'Accessories',
  slug: 'accessories',
  description1: 'Essential accessories to complete your security setup.',
  description2: 'Mounts, cables, power supplies, and more.',
  image1: '/category/cy5.png',
  image2: '',
  status: 'published',
  order: 5,
  technologies: []
};

export const accessoriesSubcategories: SubCategory[] = [
  {
    id: 'sub-mounting-brackets',
    name: 'Mounting Brackets',
    slug: 'mounting-brackets',
    parentCategory: 'Accessories',
    categorySlug: 'accessories',
    description: 'Durable mounting brackets and hardware for secure camera installation.',
    image: '/category/p6.png',
    status: 'published',
    order: 14
  }
];
