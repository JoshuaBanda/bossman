import { useState, useEffect } from 'react';

// Improved useScreenWidth with debouncing
const useScreenWidth = (debounceDelay = 100) => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenWidth(window.innerWidth);
      }, debounceDelay);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [debounceDelay]);

  return screenWidth;
};

const useBreakpoint = () => {
  const screenWidth = useScreenWidth();
  //console.log('screen width',screenWidth)
  
  return {
    isMobile: screenWidth < 600,
    isTablet: screenWidth >= 600 && screenWidth < 1024,
    isDesktop: screenWidth >= 1024,
    isLargeScreen: screenWidth >= 800
  };
};
export default useBreakpoint;