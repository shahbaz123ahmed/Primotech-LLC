import { Category, SubCategory } from '../../types';

export const transmissionCategory: Category = {
  id: 'cat-transmission',
  name: 'Transmission',
  slug: 'transmission',
  description1: 'Robust transmission equipment for seamless security data flow.',
  description2: 'Switches, PoE, and networking accessories.',
  image1: '/category/cy4.png',
  image2: '',
  status: 'published',
  order: 4,
  technologies: []
};

export const transmissionSubcategories: SubCategory[] = [
  {
    id: 'sub-network-switches',
    name: 'Network Switches',
    slug: 'network-switches',
    parentCategory: 'Transmission',
    categorySlug: 'transmission',
    description: 'High-performance network switches for reliable data transmission.',
    image: '/category/p5.png',
    status: 'published',
    order: 13
  }
];
