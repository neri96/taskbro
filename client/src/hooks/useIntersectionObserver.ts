import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useIntersectionObserver = (limit: number) => {
  const [fetchCount, setFetchCount] = useState<number>(0);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setFetchCount((prevState) => prevState + 1);
    }
  }, [inView]);

  return {
    ref,
    inView,
    limit,
    fetchCount,
  };
};

export default useIntersectionObserver;
