import { useState, useRef, useEffect } from "react";

const useThrottle = (value: string, delay: number = 1000) => {
  const [throttledValue, setThrottledValue] = useState<string>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timeout = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [value, delay]);

  return throttledValue;
};

export default useThrottle;
