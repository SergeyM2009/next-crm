import { useEffect, useState } from "react";
import { res } from "@/src/components/Navigation";

function UseHeightQuery() {
  const [height, setHeight] = useState(""); 

    useEffect(() => {
      const updateHeight = () => {
        if (res.current) {
          setHeight(res.current.offsetHeight);
        }
      };
    
      // Устанавливаем начальную высоту
      updateHeight();
    
      // Добавляем обработчик события
      window.addEventListener('resize', updateHeight);
    
      // Убираем обработчик при размонтировании
      return () => {
        window.removeEventListener('resize', updateHeight);
      };
    }, []); // Пустой массив зависимостей
    return height
  };
  export {UseHeightQuery};