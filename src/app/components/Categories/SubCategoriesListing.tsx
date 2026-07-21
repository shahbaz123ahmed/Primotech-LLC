'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type SubCategory } from '@/data/catalog';

const SubCategoryCard = ({ subcategory, categorySlug }: { subcategory: SubCategory; categorySlug: string }) => {
    return (
        <Link href={`/products/${categorySlug}/${subcategory.slug}`} className="group block">
            <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 aspect-[4/3] overflow-hidden p-6 flex items-center justify-center">
                    {subcategory.image ? (
                        <Image
                            src={subcategory.image}
                            alt={subcategory.name}
                            fill
                            className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5E6470]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="bg-[#1DB5A5] text-[#5E6470] px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                            Explore Series
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="p-8 text-center">
                    <h3 className="font-black text-2xl text-[#5E6470] mb-3 group-hover:text-[#1DB5A5] transition-colors">
                        {subcategory.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {subcategory.description || `Explore our high-performance range of ${subcategory.name} solutions designed for advanced security needs.`}
                    </p>
                </div>
            </div>
        </Link>
    );
};

const SubCategoriesListing = ({
    categoryName,
    categorySlug,
    initialSubcategories = [],
}: {
    categoryName: string;
    categorySlug: string;
    initialSubcategories?: SubCategory[];
}) => {
    const [filteredSubcategories, setFilteredSubcategories] = useState<SubCategory[]>(initialSubcategories);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = initialSubcategories.filter(sub =>
            sub.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSubcategories(filtered);
    };

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <div className="text-center mb-16">
                <h2 className="text-[10px] font-black text-[#1DB5A5] uppercase tracking-[0.2em] mb-4">
                    Product Series
                </h2>
                <h3 className="text-4xl md:text-5xl font-black text-[#5E6470] mb-6">
                    Select a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E6470] to-[#1DB5A5]">Sub-Category</span>
                </h3>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#5E6470] to-[#1DB5A5] mx-auto rounded-full mb-8"></div>
                
                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-12 relative group">
                    <input 
                        type="text" 
                        placeholder={`Search in ${categoryName}...`}
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[#5E6470] focus:outline-none focus:border-[#1DB5A5] transition-all shadow-sm focus:shadow-xl focus:shadow-[#1DB5A5]/5"
                    />
                    <svg className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1DB5A5] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Browse through our specialized {categoryName} series to find the perfect solution.
                </p>
            </div>

            {filteredSubcategories.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-300">
                    {searchQuery ? (
                        <p className="text-gray-500 font-black text-xs uppercase tracking-widest">No product series match your search.</p>
                    ) : (
                        <>
                            <p className="text-gray-500 font-black text-xs uppercase tracking-widest mb-2">No Sub-Categories Yet</p>
                            <p className="text-gray-400 text-sm">Sub-categories for this section are being configured.</p>
                        </>
                    )}
                </div>
            )}

            {filteredSubcategories.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSubcategories.map((sub) => (
                        <SubCategoryCard key={sub.id} subcategory={sub} categorySlug={categorySlug} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default SubCategoriesListing;
