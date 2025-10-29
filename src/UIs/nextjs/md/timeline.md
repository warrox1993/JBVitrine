import React, { useState, useRef, useEffect } from 'react';

const TIMELINE_ITEMS = [
{
year: '2020',
title: 'Les Débuts',
text: 'Le commencement d\'une aventure passionnante dans le monde du développement.',
accent: '#FF6B35'
},
{
year: '2021',
title: 'Première Expertise',
text: 'Développement de compétences solides en design et développement frontend.',
accent: '#FF8849'
},
{
year: '2022',
title: 'Expansion',
text: 'Élargissement vers de nouvelles technologies et frameworks modernes.',
accent: '#FFA55C'
},
{
year: '2023',
title: 'Innovation',
text: 'Création de solutions innovantes et amélioration continue des compétences.',
accent: '#FFB870'
},
{
year: '2024',
title: 'Excellence',
text: 'Maîtrise complète et contribution significative aux projets d\'envergure.',
accent: '#FF6B35'
},
{
year: '2025',
title: 'Futur',
text: 'Nouvelles perspectives et défis passionnants à venir.',
accent: '#FF9055'
}
];

export default function Timeline() {
const [activeIndex, setActiveIndex] = useState(0);
const [scrollProgress, setScrollProgress] = useState(0);
const containerRef = useRef(null);
const itemRefs = useRef([]);

useEffect(() => {
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
const index = itemRefs.current.indexOf(entry.target);
if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
setActiveIndex(index);
}
});
},
{
threshold: [0, 0.3, 0.6, 1],
rootMargin: '-15% 0px -15% 0px'
}
);

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
}, []);

useEffect(() => {
const handleScroll = () => {
if (!containerRef.current) return;
const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
setScrollProgress(Math.min(progress, 100));
};

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
}, []);

const currentItem = TIMELINE_ITEMS[activeIndex];

return (
<div className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: '#2B2D42' }}>
{/* Subtle background glow */}
<div
className="fixed inset-0 opacity-10 transition-all duration-1000 pointer-events-none"
style={{
background: `radial-gradient(circle at 50% 50%, ${currentItem.accent}, transparent 60%)`
}}
/>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-16">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-none">
            Mon Histoire
          </h1>
          <div className="flex items-center gap-4 mt-4 md:mt-6">
            <div 
              className="h-0.5 w-16 md:w-24 rounded-full transition-all duration-700"
              style={{ backgroundColor: currentItem.accent }}
            />
            <p className="text-gray-400 text-sm md:text-base font-light tracking-[0.25em] uppercase">
              Parcours Smidjan
            </p>
          </div>
        </div>
      </div>

      {/* Timeline dots - vertical */}
      <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="relative h-[50vh]">
          {/* Vertical line */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-px h-full"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          />
          
          {/* Progress line */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-0.5 top-0 transition-all duration-700"
            style={{ 
              height: `${(activeIndex / (TIMELINE_ITEMS.length - 1)) * 100}%`,
              backgroundColor: currentItem.accent
            }}
          />

          {/* Dots */}
          {TIMELINE_ITEMS.map((item, index) => (
            <div
              key={index}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
              style={{ top: `${(index / (TIMELINE_ITEMS.length - 1)) * 100}%` }}
            >
              <div 
                className={`
                  rounded-full border-2 transition-all duration-500
                  ${index === activeIndex ? 'w-3 h-3' : 'w-2 h-2'}
                `}
                style={{
                  borderColor: '#2B2D42',
                  backgroundColor: index <= activeIndex ? item.accent : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: index === activeIndex ? `0 0 20px ${item.accent}` : 'none'
                }}
              />
              {index === activeIndex && (
                <div className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap">
                  <span className="text-gray-400 text-xs font-medium tracking-wider">
                    {item.year}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        <div className="h-screen" />

        {TIMELINE_ITEMS.map((item, index) => (
          <div
            key={item.year}
            ref={(el) => (itemRefs.current[index] = el)}
            className="min-h-screen snap-center flex items-center justify-center relative px-4 md:px-8 py-20"
          >
            <div className="max-w-6xl w-full mx-auto">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                
                {/* Left - Year Display (2 cols) */}
                <div 
                  className={`
                    lg:col-span-2 transition-all duration-1000 ease-out
                    ${activeIndex === index 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-20'
                    }
                  `}
                >
                  <div className="relative">
                    {/* Large year number */}
                    <div 
                      className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none tracking-tighter select-none"
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: `2px ${item.accent}`,
                        opacity: 0.2
                      }}
                    >
                      {item.year}
                    </div>

                    {/* Floating accent elements */}
                    <div 
                      className="absolute top-1/4 -right-8 w-24 h-24 rounded-full opacity-20 blur-2xl transition-all duration-1000"
                      style={{ 
                        backgroundColor: item.accent,
                        transform: activeIndex === index ? 'scale(1)' : 'scale(0.5)'
                      }}
                    />
                    <div 
                      className="absolute bottom-1/4 -left-4 w-32 h-32 rounded-full opacity-10 blur-3xl transition-all duration-1000 delay-200"
                      style={{ 
                        backgroundColor: item.accent,
                        transform: activeIndex === index ? 'scale(1)' : 'scale(0.5)'
                      }}
                    />
                  </div>
                </div>

                {/* Right - Content (3 cols) */}
                <div 
                  className={`
                    lg:col-span-3 transition-all duration-1000 delay-300 ease-out
                    ${activeIndex === index 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-20'
                    }
                  `}
                >
                  <div className="space-y-6 md:space-y-8">
                    {/* Index number */}
                    <div className="flex items-center gap-4">
                      <span 
                        className="text-5xl md:text-6xl font-bold tracking-tight"
                        style={{ color: item.accent }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div 
                        className="flex-1 h-px"
                        style={{ backgroundColor: `${item.accent}40` }}
                      />
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                      {item.title}
                    </h2>

                    {/* Decorative line */}
                    <div className="flex items-center gap-2 py-2">
                      <div 
                        className="w-12 h-0.5 rounded-full"
                        style={{ backgroundColor: item.accent }}
                      />
                      <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.accent, opacity: 0.6 }}
                      />
                      <div 
                        className="w-6 h-0.5 rounded-full"
                        style={{ backgroundColor: item.accent, opacity: 0.4 }}
                      />
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed font-light max-w-2xl">
                      {item.text}
                    </p>

                    {/* Progress indicator */}
                    <div className="pt-6 space-y-3">
                      <div className="flex items-center justify-between text-gray-500 text-xs md:text-sm font-medium tracking-wider uppercase">
                        <span>Étape</span>
                        <span>{index + 1} / {TIMELINE_ITEMS.length}</span>
                      </div>
                      <div 
                        className="h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${((index + 1) / TIMELINE_ITEMS.length) * 100}%`,
                            backgroundColor: item.accent
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}

        <div className="h-screen" />
      </div>

      {/* Scroll indicator */}
      <div 
        className={`
          fixed bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-40 transition-all duration-700
          ${scrollProgress > 5 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-gray-500 text-xs tracking-widest uppercase font-light">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center p-1">
            <div 
              className="w-1 h-2 rounded-full animate-bounce"
              style={{ backgroundColor: currentItem.accent }}
            />
          </div>
        </div>
      </div>
    </div>
);
}