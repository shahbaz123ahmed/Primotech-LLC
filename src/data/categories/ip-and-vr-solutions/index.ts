import { Category, SubCategory } from '../../types';

export const ipVrSolutionsCategory: Category = {
  id: 'cat-ip-vr-solutions',
  name: 'IP & VR Solutions',
  slug: 'ip-and-vr-solutions',
  description1: 'Advanced IP and VR solutions for comprehensive security infrastructure.',
  description2: 'Enterprise-grade networking and recording systems.',
  image1: '/category/cy2.png',
  image2: '',
  status: 'published',
  order: 2,
  technologies: []
};

export const ipVrSolutionsSubcategories: SubCategory[] = [
  {
    id: 'sub-dual-light-rainbow',
    name: 'Dual Light Rainbow',
    slug: 'dual-light-rainbow',
    parentCategory: 'IP & VR Solutions',
    categorySlug: 'ip-and-vr-solutions',
    description: 'Professional cameras with dual light technology for superior night vision',
    image: '/category/cy2.png',
    status: 'published',
    order: 6
  },
  {
    id: 'sub-pt-cameras',
    name: 'PT Cameras',
    slug: 'pt-cameras',
    parentCategory: 'IP & VR Solutions',
    categorySlug: 'ip-and-vr-solutions',
    description: 'PTZ cameras with advanced tracking, zoom, and remote control features',
    image: '/category/ptcamera.png',
    status: 'published',
    order: 7
  },
  {
    id: 'sub-vari-focal-cameras',
    name: 'Vari-focal Cameras',
    slug: 'vari-focal-cameras',
    parentCategory: 'IP & VR Solutions',
    categorySlug: 'ip-and-vr-solutions',
    description: 'Cameras with adjustable focal length for flexible and versatile installation',
    image: '/category/p3.png',
    status: 'published',
    order: 8
  },
  {
    id: 'sub-fixed-lens-cameras',
    name: 'Fixed Lens Cameras',
    slug: 'fixed-lens-cameras',
    parentCategory: 'IP & VR Solutions',
    categorySlug: 'ip-and-vr-solutions',
    description: 'Fixed lens cameras for consistent coverage',
    image: '/category/fixed-lense.png',
    status: 'published',
    order: 9
  },
  {
    id: 'sub-nvr-systems',
    name: 'NVR Systems',
    slug: 'nvr-systems',
    parentCategory: 'IP & VR Solutions',
    categorySlug: 'ip-and-vr-solutions',
    description: 'Network Video Recorders for centralized management',
    image: '/category/nvr.png',
    status: 'published',
    order: 10
  },
  {
    id: 'sub-xvr-systems',
    name: 'XVR Systems',
    slug: 'xvr-systems',
    parentCategory: 'IP & VR Solutions',
    categorySlug: 'ip-and-vr-solutions',
    description: 'Hybrid video recorders with multi-tech support',
    image: '/category/xvr (1).png',
    status: 'published',
    order: 11
  }
];
