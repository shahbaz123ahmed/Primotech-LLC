import { Product } from '../../../types';

export const networkSwitchesProducts: Product[] = [
  {
    id: 'prod-sw-2106-p',
    name: 'SW-2106-P',
    subTitle: '6-Port PoE Switch',
    slug: 'sw-2106-p',
    category: 'Transmission',
    categorySlug: 'transmission',
    subCategory: 'Network Switches',
    subcategorySlug: 'network-switches',
    description: 'The SW-2106-P is a compact 6-Port Fast Ethernet PoE Switch designed to provide reliable network connectivity and power delivery for IP cameras, wireless access points, IP phones, and other PoE-enabled devices. Featuring 4 PoE ports, 2 uplink ports, 65W total PoE budget, and support for up to 250m transmission in surveillance mode, it offers an efficient and cost-effective networking solution for security and business applications.',
    images: ['/category/p5.png'],
    keyFeatures: [
      '6 × 10/100Mbps RJ45 ports, including 4 IEEE 802.3af/at PoE ports.',
      '2 dedicated uplink ports for stable network connectivity.',
      'Maximum PoE budget of 65W, with up to 30W per PoE port.',
      'Supports IEEE 802.3, 802.3u, 802.3az, 802.3x, 802.3af, and 802.3at standards.',
      '1.2Gbps switching capacity with 0.90Mpps forwarding performance.',
      'Surveillance (Extend) Mode supports transmission distances of up to 250 meters.',
      'Secure Mode isolates downlink ports for enhanced network security.',
      'Plug-and-play operation with no configuration required.',
      'All-metal housing for improved durability and heat dissipation.',
      'Fanless design for silent and energy-efficient operation.'
    ],
    keyHighlights: [
      'Power & Data Over One Cable: Simplifies installation by delivering both power and network connectivity through a single Ethernet cable.',
      'Extended PoE Transmission: Supports up to 250m in surveillance mode, ideal for large security deployments.',
      'Reliable PoE Performance: Provides up to 65W total power for multiple PoE devices.',
      'Enhanced Network Security: Secure mode prevents communication between downlink ports, improving network isolation.',
      'Easy Deployment: Plug-and-play design requires no software configuration.',
    ],
    status: 'published',
    isFeatured: false
  },
  {
    id: 'prod-sw-2110-p',
    name: 'SW-2110-P',
    subTitle: '10-Port PoE Switch',
    slug: 'sw-2110-p',
    category: 'Transmission',
    categorySlug: 'transmission',
    subCategory: 'Network Switches',
    subcategorySlug: 'network-switches',
    description: 'The SW-2110-P is a reliable 10-Port PoE Switch designed for professional surveillance networks. It features 8 PoE ports for powering IP cameras and access points, and 2 uplink ports for connecting to NVRs or core networks. With a sturdy metal housing and advanced transmission modes, it is perfect for expanding business security systems.',
    images: ['/category/p5.png'],
    keyFeatures: [
      '10 × 10/100Mbps RJ45 ports, including 8 IEEE 802.3af/at PoE ports.',
      '2 dedicated uplink ports for stable and reliable network backhaul.',
      'Generous PoE power budget with up to 30W output per PoE port.',
      'Surveillance (Extend) Mode supports transmission distances of up to 250 meters.',
      'Secure Mode isolates downlink ports to prevent network storms and improve security.',
      'Plug-and-play installation requires no configuration.',
      'Supports IEEE 802.3, 802.3u, and 802.3x network standards.',
      'High-speed switching capacity for smooth video transmission.',
      'Durable all-metal housing ensures efficient heat dissipation.',
      'Fanless design provides silent operation for any environment.'
    ],
    keyHighlights: [
      'Power & Data Over One Cable: Simplifies installation by delivering both power and network connectivity through a single Ethernet cable.',
      'Extended PoE Transmission: Supports up to 250m in surveillance mode, ideal for large security deployments.',
      'Robust Network Security: Secure mode prevents communication between downlink ports, improving network isolation.',
      'Easy Deployment: Plug-and-play design requires no software configuration.',
    ],
    status: 'published',
    isFeatured: false
  }
];
