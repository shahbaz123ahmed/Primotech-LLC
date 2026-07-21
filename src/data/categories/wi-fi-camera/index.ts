import { Category, SubCategory } from '../../types';

export const wifiCameraCategory: Category = {
  id: 'cat-wifi-camera',
  name: 'Wi-Fi Camera',
  slug: 'wi-fi-camera',
  description1: 'Explore our range of Wi-Fi cameras for flexible, wireless security solutions.',
  description2: 'High-quality wireless monitoring for home and business.',
  image1: '/category/cy1.png',
  image2: '',
  status: 'published',
  order: 1,
  technologies: []
};

export const wifiCameraSubcategories: SubCategory[] = [
  {
    id: 'sub-panda-p-series',
    name: 'Panda P Series',
    slug: 'panda-p-series',
    parentCategory: 'Wi-Fi Camera',
    categorySlug: 'wi-fi-camera',
    description: 'Professional PTZ cameras with advanced tracking and high-resolution imaging',
    image: '/category/cy1.png',
    status: 'published',
    order: 1
  },
  {
    id: 'sub-panda-s-series',
    name: 'Panda S Series',
    slug: 'panda-s-series',
    parentCategory: 'Wi-Fi Camera',
    categorySlug: 'wi-fi-camera',
    description: 'Smart security cameras with AI-powered detection and cloud connectivity',
    image: '/category/panda-s-series.png',
    status: 'published',
    order: 2
  },
  {
    id: 'sub-panda-b-series',
    name: 'Panda B Series',
    slug: 'panda-b-series',
    parentCategory: 'Wi-Fi Camera',
    categorySlug: 'wi-fi-camera',
    description: 'Versatile bullet cameras for outdoor weather resistance',
    image: '/category/panda-B-series.png',
    status: 'published',
    order: 3
  },
  {
    id: 'sub-indoor-security-camera',
    name: 'Indoor Security Camera',
    slug: 'indoor-security-camera',
    parentCategory: 'Wi-Fi Camera',
    categorySlug: 'wi-fi-camera',
    description: 'Compact indoor cams with audio and app control',
    image: '/category/indoor.png',
    status: 'published',
    order: 4
  },
  {
    id: 'sub-outdoor-security-camera',
    name: 'Outdoor Security Camera',
    slug: 'outdoor-security-camera',
    parentCategory: 'Wi-Fi Camera',
    categorySlug: 'wi-fi-camera',
    description: 'Weather-resistant outdoor cameras with night vision capabilities',
    image: '/category/outdoor.png',
    status: 'published',
    order: 5
  }
];
