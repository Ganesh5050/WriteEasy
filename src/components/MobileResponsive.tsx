import React from 'react';
import { useMediaQuery } from '@/hooks/usePerformance';

// Mobile-first responsive utilities
export const useResponsive = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isLargeScreen = useMediaQuery('(min-width: 1440px)');

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    breakpoint: isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : 'large'
  };
};

// Mobile-optimized navigation
export const MobileNavigation = () => {
  const { isMobile } = useResponsive();
  
  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        <button className="flex flex-col items-center gap-1 p-2 text-white">
          <div className="w-6 h-6 bg-white rounded"></div>
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span className="text-xs">Editor</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span className="text-xs">Dashboard</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span className="text-xs">More</span>
        </button>
      </div>
    </div>
  );
};

// Responsive grid component
export const ResponsiveGrid = ({ 
  children, 
  mobileCols = 1, 
  tabletCols = 2, 
  desktopCols = 3 
}: {
  children: React.ReactNode;
  mobileCols?: number;
  tabletCols?: number;
  desktopCols?: number;
}) => {
  return (
    <div className={`
      grid gap-4
      grid-cols-${mobileCols}
      md:grid-cols-${tabletCols}
      lg:grid-cols-${desktopCols}
    `}>
      {children}
    </div>
  );
};

// Mobile-optimized card
export const MobileCard = ({ children, className = "" }: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isMobile } = useResponsive();
  
  return (
    <div className={`
      ${isMobile ? 'mx-2 mb-4' : 'mb-6'}
      ${className}
    `}>
      {children}
    </div>
  );
};
