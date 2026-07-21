'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaArrowRight, FaBoxOpen, FaInfoCircle } from 'react-icons/fa';
import { type Product } from '@/data/catalog';

const ProductCard = ({ product, categorySlug, subcategorySlug }: { product: Product; categorySlug: string; subcategorySlug: string }) => {
    return (
        <Link href={`/products/${categorySlug}/${subcategorySlug}/${product.slug}`} className="group block h-full">
            <div className="relative h-full bg-white rounded-[2.5rem] px-8 py-6 overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(20,200,212,0.1)] transition-all duration-700 flex flex-col group">
                
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1DB5A5]/5 rounded-bl-[5rem] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                {/* Circular Image Container */}
                <div className="relative aspect-square mb-6 -mx-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-full border border-gray-100 shadow-inner group-hover:border-[#1DB5A5]/30 transition-colors duration-500"></div>
                    <div className="absolute inset-2 rounded-full overflow-hidden flex items-center justify-center bg-white p-4 shadow-sm">
                        {product.images.length > 0 ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-200">
                                <FaBoxOpen className="text-4xl" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-0.5 bg-[#1DB5A5] rounded-full group-hover:w-12 transition-all duration-500"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.subCategory}</span>
                    </div>
                    
                    <h3 className="font-black text-2xl text-[#5E6470] mb-4 group-hover:text-[#1DB5A5] transition-colors line-clamp-2 leading-tight">
                        {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4 flex-1">
                        {product.description || 'Explore the technical specifications and advanced features of this premium security solution.'}
                    </p>

                    <div className="flex items-center justify-start gap-4 pt-4 border-t border-gray-50">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5E6470] flex items-center gap-2 group-hover:text-[#1DB5A5] transition-colors">
                            Explore Detail
                            <FaArrowRight className="text-[10px] transition-all duration-500" />
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#5E6470] transition-all duration-500">
                            <FaInfoCircle className="text-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const SubcategoryProductsListing = ({
    subcategoryName,
    categorySlug,
    subcategorySlug,
    initialProducts = [],
}: {
    subcategoryName: string;
    categorySlug: string;
    subcategorySlug: string;
    initialProducts?: Product[];
}) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = initialProducts.filter(prod =>
            prod.name.toLowerCase().includes(query.toLowerCase()) ||
            prod.description?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            
            {/* Sophisticated Header & Search Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-24">
                <div className="max-w-2xl relative">
                    <div className="absolute -left-8 top-0 w-1 h-24 bg-gradient-to-b from-[#1DB5A5] to-transparent hidden md:block"></div>
                    <h2 className="text-[10px] font-black text-[#1DB5A5] uppercase tracking-[0.4em] mb-4">Product Ecosystem</h2>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#5E6470] mb-6 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E6470] via-[#1DB5A5] to-[#5E6470] bg-[length:200%_auto] animate-gradient">Inventory</span>
                    </h3>
                    <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                        Deep dive into our high-performance {subcategoryName} range, engineered for elite security and precision monitoring.
                    </p>
                </div>

                {/* Premium Search Component */}
                <div className="w-full lg:w-[450px] relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1DB5A5]/20 to-[#5E6470]/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-white border-2 border-gray-100 rounded-[2rem] p-2 flex items-center transition-all duration-500 group-hover:border-[#1DB5A5]/30 group-focus-within:border-[#1DB5A5] shadow-sm group-focus-within:shadow-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-focus-within:bg-[#5E6470] group-focus-within:text-[#1DB5A5] transition-all duration-500">
                            <FaSearch />
                        </div>
                        <input 
                            type="text" 
                            placeholder={`Search ${subcategoryName} devices...`}
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="flex-1 bg-transparent border-none py-4 px-6 text-sm font-bold text-[#5E6470] focus:outline-none placeholder:text-gray-300"
                        />
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-40 bg-gradient-to-b from-gray-50 to-white rounded-[4rem] border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1DB5A5] to-transparent"></div>
                    <div className="relative z-10">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl border border-gray-50 group-hover:scale-110 transition-transform duration-700">
                            <FaBoxOpen className="text-5xl text-gray-200 group-hover:text-[#1DB5A5] transition-colors" />
                        </div>
                        {searchQuery ? (
                            <>
                                <h3 className="text-3xl font-black text-[#5E6470] mb-4 tracking-tight">No Results Found</h3>
                                <p className="text-gray-400 max-w-md mx-auto font-medium leading-relaxed mb-12">
                                    No {subcategoryName} products match &ldquo;{searchQuery}&rdquo;. Try a different search term.
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-3xl font-black text-[#5E6470] mb-4 tracking-tight">No Products Synchronized</h3>
                                <p className="text-gray-400 max-w-md mx-auto font-medium leading-relaxed mb-12">
                                    We haven&apos;t cataloged any {subcategoryName} models yet. Please check back shortly or explore our other security solutions.
                                </p>
                            </>
                        )}
                        <div className="flex justify-center gap-4">
                            <Link href="/products" className="px-8 py-4 bg-[#5E6470] text-[#1DB5A5] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#1DB5A5] hover:text-[#5E6470] transition-all shadow-xl">
                                Browse All Categories
                            </Link>
                            <Link href="/contact" className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-[#1DB5A5] hover:text-[#5E6470] transition-all">
                                Request Catalog
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Results Grid */}
            {filteredProducts.length > 0 && (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {filteredProducts.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            categorySlug={categorySlug} 
                            subcategorySlug={subcategorySlug} 
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default SubcategoryProductsListing;
