"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const Features = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-white py-24 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                
                {/* Header Section */}
                <div className={`flex flex-col items-center text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-4 h-4 rounded-full border-2 border-[#1DB5A5] flex items-center justify-center p-[2px]">
                            <div className="w-full h-full bg-[#1DB5A5] rounded-full"></div>
                        </div>
                        <span className="text-[#78828D] text-sm font-bold tracking-widest uppercase">
                            Company Facts
                        </span>
                    </div>
                    <h2 className="text-[#0B1B3D] text-4xl md:text-5xl lg:text-6xl font-black leading-tight max-w-3xl">
                        Everything You Need<br />To Keep Safe.
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[750px]">
                    
                    {/* Left Large Card - Spans 2 Cols */}
                    <div className={`md:col-span-2 bg-[#F8F9FA] rounded-[40px] p-4 flex flex-col justify-end relative overflow-hidden group min-h-[750px] transition-all duration-[1200ms] ease-out delay-100 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[150px] opacity-0'}`}>
                        {/* The Large Camera Image */}
                        <div className="absolute inset-0 z-0">
                            <Image 
                                src="/shero1.png" 
                                alt="AI-Powered Security Camera"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        
                        {/* Floating Info Card */}
                        <div className={`bg-white/0 backdrop-blur-lg border border-white/20 rounded-[32px] p-8 pt-12 relative shadow-[0_15px_40px_rgba(0,0,0,0.1)] z-10 w-full text-center flex flex-col items-center transition-all duration-1000 ease-out delay-[1000ms] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            {/* Floating Icon */}
                            <div className="absolute -top-8 bg-[#1DB5A5] w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-[#1DB5A5]/30 text-white">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            
                            <h3 className="text-[#0B1B3D] text-2xl font-bold mb-3">AI-Powered Monitoring</h3>
                            <p className="text-[#78828D] text-lg max-w-md mx-auto">
                                Our cameras learn your environment and detect unusual activity instantly.
                            </p>
                        </div>
                    </div>

                    {/* Middle Column - Stacked Cards */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        {/* Top Card - Connected Ecosystem */}
                        <div className={`flex-1 bg-gray-200/50 rounded-[40px] relative overflow-hidden flex flex-col items-center justify-end p-6 group min-h-[350px] transition-all duration-[1200ms] ease-out delay-[300ms] ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[150px] opacity-0'}`}>
                        {/* The Connected Ecosystem Image */}
                        <div className="absolute inset-0 z-0">
                            <Image 
                                src="/shero3.jpeg" 
                                alt="Connected Ecosystem"
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none rounded-[40px]"></div>
                            
                            <div className="relative z-20 border-[1.5px] border-white text-white px-6 py-2.5 rounded-full font-semibold backdrop-blur-sm text-sm">
                                Connected Ecosystem
                            </div>
                        </div>

                        {/* Bottom Card - Solid Teal */}
                        <div className={`flex-1 bg-[#1DB5A5] rounded-[40px] p-6 flex flex-col items-center justify-center text-center text-white min-h-[350px] transition-all duration-[1200ms] ease-out delay-[800ms] ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[150px] opacity-0'}`}>
                            <div className="bg-white text-[#1DB5A5] w-14 h-14 rounded-full flex items-center justify-center mb-5">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold leading-snug">
                                Smart, Safe, And<br />Secure
                            </h3>
                        </div>
                    </div>

                    {/* Right Column - Tall Card */}
                    <div className={`md:col-span-1 bg-gray-200/50 rounded-[40px] relative overflow-hidden flex flex-col items-center justify-between p-8 group min-h-[750px] transition-all duration-[1200ms] ease-out delay-[500ms] ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[150px] opacity-0'}`}>
                        {/* The Tall Camera Image */}
                        <div className="absolute inset-0 z-0">
                            <Image 
                                src="/shero2.jpg" 
                                alt="99% Accuracy Camera"
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10 pointer-events-none rounded-[40px]"></div>
                        
                        <div className="relative z-20 bg-[#1DB5A5] w-14 h-14 rounded-full flex items-center justify-center text-white mt-4">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                        </div>
                        
                        <div className="relative z-20 flex flex-col items-center w-full mb-8">
                            <h3 className="text-white text-5xl lg:text-6xl font-bold mb-1">99%</h3>
                            <span className="text-white text-lg font-semibold">Accuracy</span>
                        </div>
                        
                        <p className="relative z-20 text-gray-200 text-sm leading-relaxed text-center font-medium">
                            Seamless motion detection and instant alert integration with your lifestyle.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;
