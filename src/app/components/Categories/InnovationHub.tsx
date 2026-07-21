'use client';

import { FaWifi, FaBell, FaCloudUploadAlt, FaMicrochip, FaShieldAlt, FaEye } from 'react-icons/fa';

interface Technology {
    _id?: string;
    title: string;
    icon: string;
    description: string;
}

const getIcon = (iconName: string, title: string) => {
    const t = title.toLowerCase();
    if (t.includes('wireless') || t.includes('connectivity') || iconName.includes('wifi')) return <FaWifi />;
    if (t.includes('motion') || t.includes('detection') || t.includes('alert') || iconName.includes('bell')) return <FaBell />;
    if (t.includes('cloud') || t.includes('storage') || t.includes('backup') || iconName.includes('cloud')) return <FaCloudUploadAlt />;
    if (t.includes('ai') || t.includes('smart') || t.includes('chip') || iconName.includes('microchip')) return <FaMicrochip />;
    if (t.includes('security') || t.includes('encryption') || iconName.includes('shield')) return <FaShieldAlt />;
    if (t.includes('night') || t.includes('vision') || t.includes('view') || iconName.includes('eye')) return <FaEye />;
    return <FaMicrochip />; // Default
};

const InnovationHub = ({ technologies, categoryName }: { technologies: Technology[], categoryName: string }) => {
    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#5E6470]/5 rounded-full mb-6">
                    <span className="text-[#5E6470] font-black uppercase tracking-[0.3em] text-[9px]">Innovation Hub</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#5E6470] mb-6 tracking-tight">
                    Powered by <span className="text-[#1DB5A5]">Next-Gen Tech</span>
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto font-medium">
                    Our {categoryName} range utilizes the latest breakthroughs in imaging and processing to ensure your safety.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {technologies.map((tech, idx) => (
                    <div key={idx} className="group relative p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-[0_30px_60px_rgba(0,31,63,0.08)] transition-all duration-500 hover:-translate-y-4">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1DB5A5]/5 rounded-bl-[5rem] -z-10 transition-colors group-hover:bg-[#1DB5A5]/10"></div>
                        
                        <div className="w-20 h-20 rounded-[2rem] bg-[#5E6470] flex items-center justify-center mb-8 shadow-2xl shadow-[#5E6470]/20 group-hover:bg-[#1DB5A5] group-hover:text-[#5E6470] transition-all duration-500">
                            <span className="text-white group-hover:text-[#5E6470] text-3xl transition-colors duration-500">
                                {getIcon(tech.icon, tech.title)}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-black text-[#5E6470] mb-4 group-hover:text-[#1DB5A5] transition-colors">
                            {tech.title}
                        </h3>
                        <p className="text-gray-500 leading-relaxed font-medium">
                            {tech.description}
                        </p>
                        
                        <div className="mt-8 flex items-center gap-2 text-[#1DB5A5] font-black uppercase tracking-widest text-[9px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            Advanced Feature <div className="w-8 h-px bg-[#1DB5A5]"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InnovationHub;
