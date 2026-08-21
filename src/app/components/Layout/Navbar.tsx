'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa';
import { getAllCategories, getSubcategoriesByCategory, getLatestProducts } from '@/lib/catalog';

interface Technology {
    title: string;
    icon: string;
    description: string;
}

interface CategoryData {
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
}

interface SubCategoryData {
    id: string;
    name: string;
    slug: string;
    parentCategory: string;
    image?: string;
    status: 'published' | 'draft';
}

interface ProductData {
    id: string;
    name: string;
    slug: string;
    category: string;
    categorySlug: string;
    subcategorySlug: string;
    description: string;
    images: string[];
    status: 'published' | 'draft';
}

interface ProductCategoryMenuItem {
    title: string;
    slug: string;
    icon: string;
    image?: string;
    description: string;
    items: SubCategoryData[];
}

interface SupportMenuItem {
    title: string;
    icon: string;
    shortTitle: string;
    description: string;
    href: string;
}

interface NavItem {
    label: string;
    href: string;
    submenu?: ProductCategoryMenuItem[] | SupportMenuItem[];
    kind?: 'products' | 'support';
}

interface MobileHistoryItem {
    level: 'main' | 'submenu' | 'products';
    label: string;
    category?: ProductCategoryMenuItem;
}

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [mobileMenuLevel, setMobileMenuLevel] = useState<'main' | 'submenu' | 'products'>('main');
    const [mobileMenuHistory, setMobileMenuHistory] = useState<MobileHistoryItem[]>([]);
    const [categories] = useState<CategoryData[]>(() => getAllCategories() as CategoryData[]);
    const [products] = useState<ProductData[]>(() => getLatestProducts(20) as ProductData[]);
    const [subcategories] = useState<SubCategoryData[]>(() => {
        const cats = getAllCategories();
        return cats.flatMap(cat => getSubcategoriesByCategory(cat.slug)) as SubCategoryData[];
    });
    const [loadingMenuData] = useState(false);
    const [menuDataError] = useState(false);
    const [activeProductCategorySlug, setActiveProductCategorySlug] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // Refs for stable dropdown behavior
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isHoveringRef = useRef<boolean>(false);
    const lastInteractionTimeRef = useRef<number>(Date.now());

    const supportMenuItems: SupportMenuItem[] = [
        {
            title: 'Knowledge Base & FAQ',
            icon: '❓',
            shortTitle: 'FAQ',
            description: 'Find instant answers to common security questions and setup guides.',
            href: '/support/faq',
        },
        {
            title: 'Technical Video Library',
            icon: '🎬',
            shortTitle: 'Video',
            description: 'Watch step-by-step visual demonstrations for system configuration.',
            href: '/support/video',
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Data is now loaded statically from the catalog — no useEffect fetch needed

    const visibleCategories = categories.filter((category) => category.status === 'published');
    const visibleProducts = products.filter((product) => product.status === 'published');

    const visibleSubcategories = subcategories.filter((sub) => sub.status === 'published');

    const productMenuItems: ProductCategoryMenuItem[] = visibleCategories.map((category) => ({
        title: category.name,
        slug: category.slug,
        icon: category.technologies?.[0]?.icon || 'fa-camera',
        image: category.image1 || '',
        description: category.description1 || category.description2 || 'Explore our high-quality solutions.',
        items: visibleSubcategories.filter((sub) => sub.parentCategory === category.name).slice(0, 6),
    }));

    useEffect(() => {
        if (!productMenuItems.length) {
            setActiveProductCategorySlug(null);
            return;
        }

        const hasActiveCategory = productMenuItems.some((category) => category.slug === activeProductCategorySlug);
        if (!hasActiveCategory) {
            setActiveProductCategorySlug(productMenuItems[0].slug);
        }
    }, [activeProductCategorySlug, productMenuItems]);

    const navItems: NavItem[] = [
        {
            label: 'Products',
            href: '/products',
            kind: 'products',
            submenu: productMenuItems,
        },
        {
            label: 'Support',
            href: '/support',
            kind: 'support',
            submenu: supportMenuItems,
        },
        {
            label: 'Partner',
            href: '/partner',
        },
        {
            label: 'Tips & Guides',
            href: '/tips',
        },
    ];

    const activeProductCategory = productMenuItems.find((category) => category.slug === activeProductCategorySlug) || productMenuItems[0];

    // Timeout management helpers
    const clearDropdownTimeout = useCallback(() => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
            dropdownTimeoutRef.current = null;
        }
    }, []);

    const setDropdownTimeout = useCallback((callback: () => void, delay: number) => {
        clearDropdownTimeout();
        dropdownTimeoutRef.current = setTimeout(() => {
            callback();
            dropdownTimeoutRef.current = null;
        }, delay);
    }, [clearDropdownTimeout]);

    const handleMouseEnter = useCallback((index: number) => {
        clearDropdownTimeout();
        setActiveDropdown(index);

        if (navItems[index]?.kind === 'products' && productMenuItems.length > 0) {
            setActiveProductCategorySlug((current) => current || productMenuItems[0].slug);
        }
    }, [clearDropdownTimeout, navItems, productMenuItems]);

    const handleMouseLeave = useCallback(() => {
        setDropdownTimeout(() => {
            setActiveDropdown(null);
        }, 200); // 200ms delay prevents flickering when moving to dropdown
    }, [setDropdownTimeout]);

    // Mobile menu handlers
    const openMobileMenu = () => {
        setIsMobileMenuOpen(true);
        setMobileMenuLevel('main');
        setMobileMenuHistory([]);
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileMenuLevel('main');
        setMobileMenuHistory([]);
        document.body.style.overflow = 'unset';
    };

    const navigateToSubmenu = (item: NavItem, index: number) => {
        setMobileMenuHistory([...mobileMenuHistory, { level: mobileMenuLevel, label: item.label }]);
        setActiveDropdown(index);
        setMobileMenuLevel('submenu');

        if (item.kind === 'products' && productMenuItems.length > 0) {
            setActiveProductCategorySlug(productMenuItems[0].slug);
        }
    };

    const navigateToProductCategory = (category: ProductCategoryMenuItem) => {
        setMobileMenuHistory([...mobileMenuHistory, { level: mobileMenuLevel, label: category.title, category }]);
        setActiveProductCategorySlug(category.slug);
        setMobileMenuLevel('products');
    };

    const goBack = () => {
        if (mobileMenuHistory.length > 0) {
            const previous = mobileMenuHistory[mobileMenuHistory.length - 1];
            setMobileMenuLevel(previous.level as 'main' | 'submenu' | 'products');
            setMobileMenuHistory(mobileMenuHistory.slice(0, -1));

            if (previous.category) {
                setActiveProductCategorySlug(previous.category.slug);
            }
        } else {
            setMobileMenuLevel('main');
        }
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            clearDropdownTimeout();
        };
    }, [clearDropdownTimeout]);

    return (
        <>
            {/* Top Announcement Bar - Two Tone Design */}
            <div className={`fixed top-0 left-0 right-0 z-[101] flex items-stretch h-[36px] overflow-hidden transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
                {/* Left Side: Deep Blue Branding */}
                <div className="bg-[#5E6470] flex-grow flex items-center relative overflow-hidden">
                    <div className="flex items-center gap-12 whitespace-nowrap animate-marquee-rtl py-2">
                        {/* Group 1 */}
                        <div className="flex items-center gap-12">
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                #1 CCTV Supplier in Middle East
                            </span>
                            <span className="text-[#1DB5A5]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                #1 Uniarch Products
                            </span>
                            <span className="text-[#1DB5A5]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                UAE's Most Trusted Security Partner
                            </span>
                            <span className="text-[#1DB5A5]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                24/7 Advanced Surveillance Technology
                            </span>
                            <span className="text-[#1DB5A5]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                Authorized Hikvision & Uniarch Dealer
                            </span>
                            <span className="text-[#1DB5A5]/30 font-bold">/</span>
                        </div>
                        {/* Group 2 (Duplicate for seamless loop) */}
                        <div className="flex items-center gap-12">
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                #1 CCTV Supplier in Middle East
                            </span>
                            <span className="text-[#1DB5A5]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                #1 Uniarch Products
                            </span>
                            <span className="text-[#1DB5A5]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                UAE's Most Trusted Security Partner
                            </span>
                            <span className="text-[#1DB5A5]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                24/7 Advanced Surveillance Technology
                            </span>
                            <span className="text-[#1DB5A5]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                Authorized Hikvision & Uniarch Dealer
                            </span>
                            <span className="text-[#1DB5A5]/30 font-bold">/</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Info */}
                <div className="bg-[#1DB5A5] flex items-center px-6 md:px-8 relative shrink-0 z-20 h-full ml-[-12px] [clip-path:polygon(12px_0,100%_0,100%_100%,0%_100%)]">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-6 relative z-20 whitespace-nowrap pl-2">
                        <a href="mailto:sales@primotech-llc.com" className="flex text-white text-[8px] md:text-[13px] font-bold hover:text-white/80 transition-colors duration-200 items-center gap-1 md:gap-2 leading-none md:leading-normal">
                            <svg className="w-2.5 h-2.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            sales@primotech-llc.com
                        </a>
                        <span className="hidden lg:block text-white/30 font-bold">|</span>

                        <a href="tel:+971528796664" className="flex text-white text-[9px] md:text-[13px] font-bold hover:text-white/80 transition-colors duration-200 items-center gap-1 md:gap-2 leading-none md:leading-normal">
                            <svg className="w-2.5 h-2.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +97150 685 8414
                        </a>
                    </div>
                </div>
            </div>

            {/* Desktop Navbar */}
            <div className={`hidden md:flex fixed z-[100] left-1/2 -translate-x-1/2 transition-all duration-300 w-[96%] max-w-[1500px] rounded-full bg-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-gray-100/50 ${isScrolled ? 'top-0' : 'top-[68px]'}`}>
                <nav className="flex items-center justify-between w-full px-8 py-5">
                    {/* Logo - Left Side */}
                    <div
                        className="flex items-center space-x-3 flex-shrink-0 cursor-pointer group"
                        onClick={() => window.location.href = '/'}
                    >
                        <div className="relative w-40 h-10 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Primo Tech Logo"
                                fill
                                sizes="(max-width: 768px) 144px, 192px"
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Navigation Items - Centered */}
                    <div className="flex items-center space-x-10">
                        {navItems.map((item, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <a
                                    href={item.href}
                                    className={`relative group text-[14px] font-bold transition-all duration-300 py-3 flex items-center gap-1.5 ${activeDropdown === index ? 'text-[#1DB5A5]' : 'text-[#5E6470] hover:text-[#1DB5A5]'
                                        }`}
                                    onClick={(e) => {
                                        if (item.submenu) e.preventDefault();
                                    }}
                                >
                                    {item.label}
                                    {item.submenu && (
                                        <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#1DB5A5] transition-all duration-300 ${activeDropdown === index ? 'w-full' : 'group-hover:w-1/2'}`}></span>
                                </a>

                                {/* Mega Menus */}
                                {item.submenu && activeDropdown === index && (
                                    <div
                                        ref={dropdownRef}
                                        className={`absolute top-[calc(100%+2px)] ${item.label === 'Support' ? 'left-1/2 -translate-x-1/2 w-[700px]' : 'left-0 w-[950px] lg:w-[1100px]'} max-w-[95vw] rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.15)] animate-fadeInUp z-[100] overflow-hidden before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:bg-transparent`}
                                    >
                                        {item.label === 'Products' ? (
                                            loadingMenuData ? (
                                                <div className="flex min-h-[400px] items-center justify-center">
                                                    <div className="w-12 h-12 border-4 border-[#1DB5A5] border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            ) : (
                                                <div className="flex w-full bg-white">
                                                    {/* Left Sidebar - Categories */}
                                                    <div className="w-[280px] flex-shrink-0 bg-gray-50/50 border-r border-gray-100 p-5 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.01)]">
                                                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 px-2">Solutions & Categories</h2>
                                                        <div className="space-y-2">
                                                            {item.submenu.map((subItem, subIndex) => {
                                                                const isProductItem = 'slug' in subItem && 'items' in subItem;
                                                                if (!isProductItem) return null;
                                                                const isActive = subItem.slug === activeProductCategorySlug;
                                                                const categoryImage = 'image' in subItem ? subItem.image : null;

                                                                return (
                                                                    <button
                                                                        key={subIndex}
                                                                        onMouseEnter={() => setActiveProductCategorySlug(subItem.slug)}
                                                                        className={`w-full flex items-center justify-between p-3 rounded-[1.25rem] text-left transition-all duration-300 relative group/btn ${isActive
                                                                            ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 z-10'
                                                                            : 'hover:bg-white/60 text-gray-600 hover:text-[#5E6470]'
                                                                            }`}
                                                                    >
                                                                        <div className="flex items-center gap-4">
                                                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 overflow-hidden bg-[#1DB5A5] text-white ${isActive
                                                                                ? 'shadow-lg shadow-[#1DB5A5]/20'
                                                                                : 'shadow-sm group-hover/btn:shadow-md'
                                                                                }`}>
                                                                                {categoryImage ? (
                                                                                    <img
                                                                                        src={categoryImage}
                                                                                        alt={subItem.title}
                                                                                        onError={(e) => {
                                                                                            e.currentTarget.style.display = 'none';
                                                                                            const iconEl = e.currentTarget.nextElementSibling;
                                                                                            if (iconEl) iconEl.classList.remove('hidden');
                                                                                        }}
                                                                                        className="w-full h-full object-cover"
                                                                                    />
                                                                                ) : null}
                                                                                <i className={`fas ${subItem.icon || 'fa-camera'} text-lg ${categoryImage ? 'hidden' : ''}`} />
                                                                            </div>
                                                                            <div>
                                                                                <span className={`block font-extrabold text-[15px] transition-colors ${isActive ? 'text-[#1DB5A5]' : ''}`}>{subItem.title}</span>
                                                                                {isActive && <span className="text-xs font-bold text-[#1DB5A5] mt-0.5 block">View Products</span>}
                                                                            </div>
                                                                        </div>
                                                                        <FaChevronRight className={`w-3.5 h-3.5 transition-all duration-300 ${isActive
                                                                            ? 'text-[#1DB5A5] translate-x-0 opacity-100'
                                                                            : 'text-gray-300 -translate-x-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0'
                                                                            }`} />
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>

                                                        <div className="mt-4 pt-4 border-t border-gray-100/50">
                                                            <a
                                                                href="/products"
                                                                className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#5E6470] text-white font-black text-xs uppercase tracking-widest hover:bg-[#1DB5A5] hover:text-[#5E6470] transition-all duration-300 shadow-xl shadow-[#5E6470]/10 hover:shadow-[#1DB5A5]/20 group"
                                                            >
                                                                View All Products
                                                                <FaChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                            </a>
                                                        </div>
                                                    </div>

                                                    {/* Right Content - Product Grid */}
                                                    <div className="flex-1 p-5 bg-white">
                                                        {activeProductCategory ? (
                                                            <div className="h-full flex flex-col">
                                                                <div className="grid grid-cols-3 gap-2">
                                                                    {activeProductCategory.items.map((subcategory, sIdx) => (
                                                                        <a
                                                                            key={sIdx}
                                                                            href={`/products/${activeProductCategory.slug}/${subcategory.slug}`}
                                                                            className="group relative bg-white border border-gray-100 rounded-[1.5rem] p-3 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-[#1DB5A5] block"
                                                                        >
                                                                            <div className="aspect-[4/3] bg-gray-50/80 rounded-xl mb-2.5 flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:bg-[#f0fdfe]">
                                                                                <img
                                                                                    src={subcategory.image || '/api/placeholder/400/300'}
                                                                                    alt={subcategory.name}
                                                                                    onError={(e) => { e.currentTarget.src = '/api/placeholder/400/300'; }}
                                                                                    className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                                                                                />
                                                                            </div>
                                                                            <div className="px-1.5">
                                                                                <h3 className="font-extrabold text-[#5E6470] text-sm mb-0.5 group-hover:text-[#1DB5A5] transition-colors line-clamp-1">{subcategory.name}</h3>
                                                                                <p className="text-gray-500 text-[12px] line-clamp-1 leading-tight mb-2">
                                                                                    Explore our high-performance range of {subcategory.name} solutions designed for advanced security needs.
                                                                                </p>
                                                                                <div className="inline-flex items-center gap-1.5 text-[#1DB5A5] font-black uppercase tracking-widest text-[9px] group-hover:translate-x-1 transition-transform">
                                                                                    Explore Series <FaChevronRight className="text-[7px]" />
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-gray-400 font-medium">
                                                                Select a category to discover our products
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            /* SUPPORT DROPDOWN */
                                            <div className="p-8 bg-white/95 backdrop-blur-md">
                                                <div className="grid grid-cols-2 gap-8">
                                                    {item.submenu?.map((subItem, sIdx) => {
                                                        const isSupport = 'href' in subItem;
                                                        if (!isSupport) return null;
                                                        return (
                                                            <a
                                                                key={sIdx}
                                                                href={subItem.href}
                                                                className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-8 overflow-hidden"
                                                            >
                                                                <div className="flex items-start gap-6 relative z-10">
                                                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100/50">
                                                                        {subItem.shortTitle === 'FAQ' ? (
                                                                            <svg className="w-8 h-8 text-[#1DB5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                            </svg>
                                                                        ) : (
                                                                            <svg className="w-8 h-8 text-[#1DB5A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="text-xl font-black text-[#5E6470] mb-3">{subItem.title}</h3>
                                                                        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">{subItem.description}</p>
                                                                        <div className="inline-flex items-center gap-2 text-[#1DB5A5] font-black uppercase tracking-widest text-[10px]">
                                                                            Explore Resource <FaChevronRight className="text-[8px]" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Hamburger Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Get In Touch Button */}
                        <a
                            href="/contact"
                            className="hidden lg:block bg-transparent text-[#5E6470] px-5 py-2 rounded-full font-bold text-[14px] transition-all duration-300 hover:text-[#1DB5A5]"
                        >
                            Contact Us
                        </a>

                        <button
                            onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                            className="w-12 h-12 bg-[#1DB5A5] hover:bg-[#1DB5A5] text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#1DB5A5]/30 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Navbar */}
            <div className={`md:hidden w-full px-6 py-4 flex items-center justify-between fixed left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'top-0 bg-white shadow-md' : 'top-[36px] bg-white'}`}>
                {/* Logo */}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
                    <div className="relative w-36 h-10">
                        <Image
                            src="/logo.png"
                            alt="Primo Tech Logo"
                            fill
                            sizes="(max-width: 768px) 144px, 192px"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Hamburger / Close Button */}
                <button
                    onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                    className="text-[#1DB5A5] focus:outline-none p-2"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Sidebar Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[110] flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={closeMobileMenu}
                    />

                    {/* Sidebar Panel */}
                    <div className="relative w-full max-w-sm md:max-w-md h-full bg-[#5E6470] text-white shadow-2xl animate-slideInRight overflow-y-auto">
                        <div className="p-8 flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/20">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white rounded-full p-2">
                                        <svg className="w-6 h-6 text-[#5E6470]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold tracking-tight">PrimoTech</span>
                                </div>
                                <button
                                    onClick={closeMobileMenu}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Navigation Items */}
                            <div className="mb-8 flex-1 overflow-y-auto">
                                <ul className="space-y-5 font-bold text-lg">
                                    {navItems.map((item, idx) => (
                                        <li key={idx} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                                            {item.submenu ? (
                                                <details className="group">
                                                    <summary className="flex items-center justify-between cursor-pointer hover:text-white/80 list-none text-xl font-bold">
                                                        {item.label}
                                                        <FaChevronRight className="w-4 h-4 transition-transform group-open:rotate-90 opacity-70" />
                                                    </summary>
                                                    <ul className="pl-4 mt-4 space-y-4 text-base font-semibold text-white/80">
                                                        {item.submenu.map((sub, sIdx) => {
                                                            const isProduct = 'slug' in sub;
                                                            const href = !isProduct ? (sub as any).href : `/products/${(sub as any).slug}`;
                                                            return (
                                                                <li key={sIdx}>
                                                                    <a href={href} className="block hover:text-[#1DB5A5] transition-colors">
                                                                        {sub.title}
                                                                    </a>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </details>
                                            ) : (
                                                <a href={item.href} className="block hover:text-white/80 text-xl font-bold">
                                                    {item.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-b border-white/20 mb-8" />

                            {/* Contact Us */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                                <div className="space-y-3 text-sm font-medium opacity-90">
                                    <p>United Arab Emirates</p>
                                    <p><a href="mailto:sales@primotech-llc.com" className="hover:underline hover:text-white">sales@primotech-llc.com</a></p>
                                    <p><a href="tel:+971528796664" className="hover:underline hover:text-white">+97150 685 8414</a></p>
                                    <p>Mon-Fri: 8:30am-5:30pm</p>
                                </div>
                            </div>

                            <div className="border-b border-white/20 mb-8" />

                            {/* About Us */}
                            <div>
                                <h3 className="text-xl font-bold mb-4">About Us</h3>
                                <p className="text-sm font-medium leading-relaxed opacity-90">
                                    Keep your home or business safe with CCTV systems designed to provide 24/7 surveillance and peace of mind. Our expert team offers tailored security solutions, from installation to remote monitoring, ensuring your property is always protected.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeInUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(-10px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                }

                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }

                .animate-slideInRight {
                    animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .overflow-y-auto::-webkit-scrollbar {
                    width: 6px;
                }
                .overflow-y-auto::-webkit-scrollbar-track {
                    background: transparent;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #1DB5A5;
                    border-radius: 10px;
                }

                @keyframes marquee-rtl {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }

                .animate-marquee-rtl {
                    display: flex;
                    width: fit-content;
                    animation: marquee-rtl 35s linear infinite;
                }
            `}</style>
        </>
    );
};

export default Navbar;