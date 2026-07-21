import { Product } from '../../../types';

export const ptCamerasProducts: Product[] = [
  {
    id: 'prod-ipc-p413-x20k',
    name: 'IPC-P413-X20K',
    subTitle: '3MP 20X Network PTZ Dome Camera',
    slug: 'ipc-p413-x20k',
    category: 'IP & VR Solutions',
    categorySlug: 'ip-and-vr-solutions',
    subCategory: 'PT Cameras',
    subcategorySlug: 'pt-cameras',
    description: 'The IPC-P413-X20K is a high-performance 3MP Network PTZ Dome Camera engineered for professional surveillance in commercial, industrial, and public environments. Equipped with 20× optical zoom, intelligent PTZ functionality, 120dB WDR, and 100m Smart IR, it delivers exceptional image clarity and long-range monitoring. Its rugged IP66-rated housing and PoE+ support make it ideal for both indoor and outdoor security applications.',
    images: ['/category/ptcamera.png'],
    keyFeatures: [
      '3MP high-definition imaging delivers sharp and detailed surveillance footage.',
      'Powerful 20× optical zoom enables long-distance monitoring with exceptional clarity.',
      'Intelligent PTZ functionality provides 360° panoramic coverage and precise target tracking.',
      'Smart intrusion prevention with human and vehicle false alarm filtering.',
      'Face capture technology with automatic best-shot selection.',
      'People counting and crowd density analysis for advanced business intelligence.',
      'Smart IR technology delivers clear night vision up to 100 m.',
      '120 dB True WDR ensures excellent image quality in challenging lighting conditions.',
      'Supports PoE+ for simplified installation and reduced cabling.',
      'IP66-rated weatherproof housing for reliable outdoor operation.'
    ],
    keyHighlights: [
      'Resolution: 3MP (2304 × 1296) @ 30fps.',
      'Optical Zoom: 20× motorized zoom (5–100 mm AF lens).',
      'Video Compression: H.265, H.264, MJPEG.',
      'Night Vision: Smart IR up to 100 m.',
      'Storage: Supports MicroSD cards up to 256 GB.',
      'Protection: IP66 weatherproof with PoE+ (IEEE 802.3at).'
    ],
    status: 'published',
    isFeatured: false
  },
  {
    id: 'prod-uho-s2',
    name: 'Uho-S2',
    subTitle: '2MP Smart Indoor Pan & Tilt Wi-Fi Camera',
    slug: 'uho-s2',
    category: 'IP & VR Solutions',
    categorySlug: 'ip-and-vr-solutions',
    subCategory: 'PT Cameras',
    subcategorySlug: 'pt-cameras',
    description: 'The Uho-S2 is a compact 2MP Smart Indoor Pan & Tilt Wi-Fi Camera designed for home, office, and small business surveillance. With 360° pan coverage, real-time two-way audio, intelligent motion and human detection, auto tracking, and HD infrared night vision, it provides reliable indoor monitoring from anywhere using the Uniarch mobile app.',
    images: ['/category/p2.jpg'],
    keyFeatures: [
      '2MP Full HD (1920 × 1080) progressive CMOS sensor.',
      '360° Pan & Tilt design for comprehensive room coverage.',
      'Ultra 265, H.265 & H.264 video compression.',
      'IR Night Vision with up to 10m (33ft) viewing distance.',
      'Built-in Microphone & Speaker supporting two-way audio communication.',
      'Motion Detection, Human Detection, Audio Detection & Auto Tracking for intelligent monitoring.',
      'Dual-stream video for efficient remote viewing.',
      '2.4GHz Wi-Fi connectivity for quick wireless setup.',
      'MicroSD card support up to 256GB for local video storage.',
      'Compatible with the Uniarch App for remote live view, playback, and alerts.'
    ],
    keyHighlights: [
      'Complete Room Coverage: Pan & Tilt functionality minimizes blind spots.',
      'Smart AI Detection: Human, motion, and sound detection reduce false alarms.',
      'Clear Day & Night Monitoring: HD infrared night vision ensures reliable surveillance around the clock.',
      'Real-Time Communication: Two-way audio allows instant interaction with family members, visitors, or pets.',
      'Simple Wireless Installation: Wi-Fi connectivity eliminates the need for network cabling.',
    ],
    status: 'published',
    isFeatured: false
  }
];
