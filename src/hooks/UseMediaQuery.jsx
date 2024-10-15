import { useEffect, useState } from "react";

function useMediaQuery(media) {

  
    const [isLargeScreen, setIsLargeScreen] = useState(false); 
    useEffect(() => {
      setIsLargeScreen(window.matchMedia(media).matches);
  
      const handleResize = (e) => {
        setIsLargeScreen(e.matches);
      };
  
      const mediaQuery = window.matchMedia(media);
  
      mediaQuery.addEventListener('change', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        mediaQuery.removeEventListener('change', handleResize);
      };
    }, [media]);
  
    return (  //скобки круглые - иначе если фигурные, то получаем на выходе объект, а нам надо true или false
      isLargeScreen 
    )
  };
  
  export {useMediaQuery};
 