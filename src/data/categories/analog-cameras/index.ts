import { Category, SubCategory } from '../../types';

export const analogCamerasCategory: Category = {
  id: 'cat-analog-cameras',
  name: 'Analog Cameras',
  slug: 'analog-cameras',
  description1: 'Reliable and cost-effective analog cameras for standard surveillance.',
  description2: 'High-definition analog systems that are easy to deploy.',
  image1: '/category/cy3.png',
  image2: '',
  status: 'published',
  order: 3,
  technologies: []
};

export const analogCamerasSubcategories: SubCategory[] = [
  {
    id: 'sub-analog-cameras-main',
    name: 'Analog Cameras',
    slug: 'analog-cameras',
    parentCategory: 'Analog Cameras',
    categorySlug: 'analog-cameras',
    description: 'High-definition analog cameras with excellent performance',
    image: '/category/p4.png',
    status: 'published',
    order: 12
  }
];
