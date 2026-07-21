'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Product } from '@/data/catalog';
import RelatedProducts from './RelatedProducts';
import { 
    FaCheckCircle, 
    FaTimes, 
    FaArrowRight, 
    FaChevronRight, 
    FaShareAlt,
    FaCheck,
    FaShieldAlt,
} from 'react-icons/fa';
import Link from 'next/link';

const ProductDetail = ({ product }: { product: Product }) => {
    const categorySlug = product.categorySlug;
    const subcategorySlug = product.subcategorySlug;

    const [activeImage, setActiveImage] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [copied, setCopied] = useState(false);
    const [activeSpecTab, setActiveSpecTab] = useState<string | null>(
        product.technicalSpecs && Object.keys(product.technicalSpecs).length > 0
            ? Object.keys(product.technicalSpecs)[0]
            : null
    );
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleShare = async () => {
        const shareUrl = window.location.href;
        const shareTitle = `${product.name} — PrimoTech LLC`;
        const shareText = `Check out the ${product.name} from PrimoTech LLC — Dubai's authorized security supplier.`;

        if (navigator.share) {
            try {
                await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
                return;
            } catch {
                // fallback
            }
        }
        setShowShare((prev) => !prev);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            const input = document.createElement('input');
            input.value = window.location.href;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // TODO: Connect this form to the required submission service.
    const handleEnquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="w-full bg-[#FAFAFA] font-sans">
            {/* BREADCRUMBS */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-8">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                    <Link href="/" className="hover:text-[#14C8D4] transition-colors">Home</Link>
                    <FaChevronRight className="text-[8px]" />
                    <Link href="/products" className="hover:text-[#14C8D4] transition-colors">Products</Link>
                    <FaChevronRight className="text-[8px]" />
                    <Link href={`/products/${categorySlug}`} className="hover:text-[#14C8D4] transition-colors">{categorySlug?.replace(/-/g, ' ')}</Link>
                    <FaChevronRight className="text-[8px]" />
                    <span className="text-[#001F3F]">{product.name}</span>
                </div>
            </div>

            {/* HERO PRODUCT SECTION (APPLE STYLE) */}
            <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    
                    {/* LEFT: Sticky Interactive Image Gallery */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <div className="w-full relative bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_5px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-4 md:p-6 flex flex-col gap-4 overflow-hidden group">
                                
                                {/* Decorative Corner Shades */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#14C8D4]/15 to-transparent rounded-bl-full pointer-events-none z-20"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#001F3F]/10 to-transparent rounded-tr-full pointer-events-none z-20"></div>

                                {/* Main Display Image */}
                                <div className="w-full relative aspect-[4/3] flex items-center justify-center z-10">
                                    {product.images.length > 0 ? (
                                        <Image 
                                            src={product.images[activeImage]} 
                                            alt={product.name} 
                                            fill
                                            className="object-contain px-4 pb-4 pt-16 relative z-10 transition-transform duration-700 group-hover:scale-125" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm font-bold">No image available</div>
                                    )}
                                </div>

                                {/* Share Button */}
                                <div className="absolute top-6 right-6 z-20">
                                    <button
                                        onClick={handleShare}
                                        className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#001F3F] hover:text-[#14C8D4] hover:scale-110 transition-all"
                                    >
                                        <FaShareAlt />
                                    </button>

                                    {/* Share Panel */}
                                    {showShare && (
                                        <div className="absolute right-0 top-full mt-3 z-50 bg-white rounded-2xl border border-gray-100 shadow-2xl p-4 w-60 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <button onClick={handleCopyLink} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-left">
                                                <span className="text-sm font-bold text-[#001F3F]">{copied ? 'Link Copied!' : 'Copy Link'}</span>
                                            </button>
                                            <a href={`https://wa.me/?text=${encodeURIComponent(`${product.name}\n${typeof window !== 'undefined' ? window.location.href : ''}`)}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all">
                                                <span className="text-sm font-bold text-[#001F3F]">WhatsApp</span>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnails (Horizontal below main image) */}
                                {product.images.length > 1 && (
                                    <div className="flex gap-4 overflow-x-auto hide-scrollbar mt-8 pb-2 justify-start md:justify-center relative z-10">
                                        {product.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImage(idx)}
                                                onMouseEnter={() => setActiveImage(idx)}
                                                className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white border overflow-hidden transition-all shrink-0 ${
                                                    activeImage === idx ? 'border-[#14C8D4] shadow-md scale-105' : 'border-gray-200 hover:border-gray-300 hover:scale-105 shadow-sm opacity-60 hover:opacity-100'
                                                }`}
                                            >
                                                <Image src={img} alt={`${product.name} - View ${idx + 1}`} fill className="object-contain p-2" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Product Details & CTA */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <span className="text-[#14C8D4] font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                            {product.category} Series
                        </span>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#001F3F] leading-[1.1] mb-6 tracking-tight">
                            {product.name}
                        </h1>

                        {product.subTitle && (
                            <h2 className="text-xl md:text-2xl text-gray-500 font-bold mb-8">
                                {product.subTitle}
                            </h2>
                        )}

                        <p className="text-gray-600 text-lg leading-relaxed mb-10">
                            {product.description}
                        </p>

                        {/* Status Pills */}
                        <div className="flex flex-wrap gap-3 mb-12">
                            <div className="flex items-center gap-2 bg-[#001F3F] text-white px-4 py-2 rounded-full shadow-md">
                                <FaCheckCircle className="text-[#14C8D4] text-sm" />
                                <span className="text-[11px] font-black uppercase tracking-widest">Premium Quality</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white text-[#001F3F] px-4 py-2 rounded-full border border-gray-200">
                                <FaShieldAlt className="text-gray-400 text-sm" />
                                <span className="text-[11px] font-black uppercase tracking-widest">Authorized Dealer</span>
                            </div>
                        </div>

                        {/* CTA Box */}
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                            <h3 className="text-2xl font-black text-[#001F3F] mb-2">Request a Quote</h3>
                            <p className="text-gray-500 text-sm font-medium mb-8">Our security experts are ready to provide pricing and system design assistance.</p>
                            
                            <button 
                                onClick={() => setShowForm(true)}
                                className="w-full py-5 bg-[#001F3F] text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:bg-[#14C8D4] hover:text-[#001F3F] hover:shadow-xl hover:shadow-[#14C8D4]/20 transition-all flex items-center justify-center gap-4 group"
                            >
                                Get Expert Pricing
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* BENTO GRID: KEY FEATURES & HIGHLIGHTS */}
            <section className="bg-white py-24 border-y border-gray-100">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-[#001F3F] mb-6 tracking-tight">Engineered for Excellence</h2>
                        <p className="text-gray-500 text-lg">Discover the advanced capabilities that make the {product.name} a top-tier security choice.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Features List */}
                        <div className={`bg-[#FAFAFA] rounded-[2.5rem] p-10 border border-gray-100 ${product.keyHighlights?.length ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#14C8D4]">
                                    <FaCheckCircle className="text-xl" />
                                </div>
                                <h3 className="text-2xl font-black text-[#001F3F]">Technical Capabilities</h3>
                            </div>
                            
                            {product.keyFeatures.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.keyFeatures.map((feature, idx) => (
                                        <div key={idx} className="flex h-full min-h-[80px] items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-50">
                                            <div className="w-6 h-6 rounded-full bg-[#14C8D4]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <FaCheck className="text-[10px] text-[#14C8D4]" />
                                            </div>
                                            <span className="text-[#001F3F] font-bold text-sm leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 font-medium text-sm">Features will be listed here.</p>
                            )}
                        </div>

                        {/* Highlights Box */}
                        {product.keyHighlights && product.keyHighlights.length > 0 && (
                            <div className="bg-[#001F3F] rounded-[2.5rem] p-10 relative overflow-hidden text-white">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#14C8D4]/20 to-transparent rounded-bl-full pointer-events-none"></div>
                                
                                <div className="flex items-center gap-4 mb-8 relative z-10">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center text-[#14C8D4]">
                                        <FaShieldAlt className="text-xl" />
                                    </div>
                                    <h3 className="text-2xl font-black">Key Advantages</h3>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    {product.keyHighlights.map((highlight, idx) => (
                                        <div key={idx} className="border-l-2 border-[#14C8D4] pl-5">
                                            <span className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest block mb-2">Advantage 0{idx + 1}</span>
                                            <p className="font-bold text-white/90 text-sm leading-relaxed">{highlight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* TECHNICAL SPECIFICATIONS SECTION */}
            {product.technicalSpecs && Object.keys(product.technicalSpecs).length > 0 && (
                <section className="bg-[#FAFAFA] py-24">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
                            
                            {/* Sticky Left Sidebar for Spec Categories */}
                            <div className="w-full md:w-64 shrink-0">
                                <div className="sticky top-32">
                                    <h3 className="text-3xl font-black text-[#001F3F] mb-8">Specifications</h3>
                                    <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar">
                                        {Object.keys(product.technicalSpecs).map((specCategory, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveSpecTab(specCategory)}
                                                className={`text-left px-6 py-4 rounded-2xl font-bold text-sm transition-all whitespace-nowrap md:whitespace-normal ${
                                                    activeSpecTab === specCategory 
                                                        ? 'bg-[#001F3F] text-white shadow-xl' 
                                                        : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-[#001F3F]'
                                                }`}
                                            >
                                                {specCategory}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Content Area for Spec Data */}
                            <div className="flex-1">
                                {activeSpecTab && product.technicalSpecs[activeSpecTab] && (
                                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <h4 className="text-2xl font-black text-[#001F3F] mb-8 pb-6 border-b border-gray-100">{activeSpecTab}</h4>
                                        <div className="grid grid-cols-1 gap-0">
                                            {product.technicalSpecs[activeSpecTab].map((spec, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className={`grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 ${
                                                        idx !== product.technicalSpecs![activeSpecTab].length - 1 ? 'border-b border-gray-50' : ''
                                                    }`}
                                                >
                                                    <div className="sm:col-span-1 font-bold text-[#001F3F]/60 text-sm">
                                                        {spec.label}
                                                    </div>
                                                    <div className="sm:col-span-2 font-bold text-[#001F3F] text-sm leading-relaxed">
                                                        {spec.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </section>
            )}

            {/* RELATED ECOSYSTEM */}
            <div className="bg-white border-t border-gray-100">
                <RelatedProducts currentProductSlug={product.slug} currentCategorySlug={product.categorySlug} />
            </div>

            {/* ENQUIRY MODAL */}
            {showForm && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all duration-500">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#14C8D4]/10 rounded-full -mr-32 -mt-32"></div>
                        
                        <button 
                            onClick={() => setShowForm(false)} 
                            className="absolute top-8 right-8 w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 transition-all z-50"
                        >
                            <FaTimes />
                        </button>
                        
                        <div className="mb-8 relative z-10">
                            <h3 className="text-3xl font-black mb-3 text-[#001F3F] tracking-tight">Request Quote</h3>
                            <p className="text-sm font-bold text-gray-400">For {product.name}</p>
                        </div>
                        
                        {/* TODO: Connect this form to the required submission service. */}
                        <form onSubmit={handleEnquirySubmit} className="space-y-5 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <input name="fullName" required placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14C8D4] outline-none text-sm font-bold transition-all placeholder:text-gray-400" />
                                </div>
                                <div>
                                    <input name="email" type="email" required placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14C8D4] outline-none text-sm font-bold transition-all placeholder:text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <input name="phone" required placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14C8D4] outline-none text-sm font-bold transition-all placeholder:text-gray-400" />
                            </div>
                            <div>
                                <textarea name="message" rows={3} placeholder="Tell us about your requirements..." value={formData.message} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#14C8D4] outline-none text-sm font-bold resize-none transition-all placeholder:text-gray-400" />
                            </div>
                            
                            <button type="submit" className="w-full py-5 bg-[#001F3F] text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all flex items-center justify-center gap-3 active:scale-95">
                                Submit Request <FaArrowRight />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;