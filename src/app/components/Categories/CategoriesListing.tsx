'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type Category } from '@/data/catalog';

const CategoryCard = ({ category }: { category: Category }) => {
    return (
        <Link href={`/products/${category.slug}`} className="group block h-full">
            <div className="relative h-full bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_30px_60px_rgba(0,31,63,0.12)] transition-all duration-700 hover:-translate-y-3 flex flex-col">
                {/* Image Container with sophisticated hover */}
                <div className="relative bg-gradient-to-br from-slate-50 to-slate-200 aspect-[4/3] overflow-hidden">
                    <Image
                        src={category.image1 || '/api/placeholder/400/300'}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 group-hover:rotate-1"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Multi-layered Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5E6470]/80 via-[#5E6470]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur-md text-[#5E6470] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl border border-white/20">
                            Enterprise Ready
                        </span>
                    </div>

                    {/* View Details Badge */}
                    <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <span className="bg-[#1DB5A5] text-[#5E6470] px-6 py-3 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-black shadow-2xl flex items-center gap-3">
                            Explore
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="w-8 h-[2px] bg-[#1DB5A5]"></div>
                        <span className="text-[#1DB5A5] text-[9px] font-black uppercase tracking-widest">Category</span>
                    </div>
                    <h3 className="font-black text-2xl text-[#5E6470] mb-4 group-hover:text-[#1DB5A5] transition-colors leading-tight">
                        {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6 flex-1">
                        {category.description1}
                    </p>
                    
                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#5E6470] transition-colors">View Series</span>
                        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#5E6470] group-hover:bg-[#5E6470] group-hover:text-white transition-all duration-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const CategoriesListing = ({ initialCategories = [] }: { initialCategories?: Category[] }) => {
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(initialCategories);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = initialCategories.filter(cat => 
            cat.name.toLowerCase().includes(query.toLowerCase()) ||
            cat.description1.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1DB5A5]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#5E6470]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Container */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#1DB5A5]/10 rounded-full mb-6 border border-[#1DB5A5]/20">
                            <span className="text-[#1DB5A5] font-black uppercase tracking-[0.3em] text-[9px]">Our Portfolio</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#5E6470] mb-8 leading-[1.1] tracking-tight">
                            Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E6470] to-[#1DB5A5]">Security Solutions</span>
                        </h3>
                        <p className="text-lg text-gray-500 leading-relaxed font-medium">
                            Explore our diverse range of security and networking solutions tailored for enterprise, commercial, and residential needs.
                        </p>
                    </div>

                    {/* Enhanced Search Bar */}
                    <div className="w-full lg:w-[400px] relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5E6470] to-[#1DB5A5] rounded-3xl blur opacity-0 group-focus-within:opacity-10 transition-opacity duration-500"></div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search our solutions..." 
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full bg-white border-2 border-gray-100 rounded-[1.5rem] py-5 pl-16 pr-8 text-sm font-bold text-[#5E6470] focus:outline-none focus:border-[#1DB5A5] transition-all shadow-sm focus:shadow-2xl focus:shadow-[#1DB5A5]/10"
                            />
                            <div className="absolute left-6 top-1/2 -translate-y-1/2">
                                <svg className="w-6 h-6 text-gray-300 group-focus-within:text-[#1DB5A5] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>

                {filteredCategories.length === 0 && (
                    <div className="text-center py-32 bg-gray-50 rounded-[4rem] border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-400">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        {searchQuery ? (
                            <>
                                <h4 className="text-2xl font-black text-[#5E6470] mb-2">No Matching Solutions</h4>
                                <p className="text-gray-500 font-medium max-w-md mx-auto">We couldn&apos;t find any categories matching your search criteria. Try a different keyword.</p>
                            </>
                        ) : (
                            <>
                                <h4 className="text-2xl font-black text-[#5E6470] mb-2">Categories Coming Soon</h4>
                                <p className="text-gray-500 font-medium max-w-md mx-auto">Our product catalog is being configured. Please check back shortly.</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoriesListing;