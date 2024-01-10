import { useState, useRef, useEffect } from "react";

const useClickOutside = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => setIsVisible((isVisible) => !isVisible);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  return { ref, isVisible, setIsVisible, handleToggle };
};

export default useClickOutside;
