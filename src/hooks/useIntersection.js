
import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (callback) => {
  const [observationTarget, setObservationTarget] = useState(null);
  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        callback();
      },
      { threshold: 1 }
    )
  );

  useEffect(() => {
    const currentTarget = observationTarget;
    const currentObserver = observer.current;
    if (currentTarget) {
      currentObserver.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        currentObserver.unobserve(currentTarget);
      }
    };
  }, [observationTarget]);

  return setObservationTarget;
};

export default useIntersectionObserver;

// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// function useScroll(searchItem, page) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [list, setList] = useState([]);

//   const sendQuery = useCallback(async () => {
//     try {
//        setLoading(true);
//        setError(false);
//     const res = await axios.get(`/search/${searchItem}/${page}`);
//        setList((prev) => [...prev, ...res.data]);
//       setLoading(false);
//     } catch (err) {
//       setError(err);
//     }
//   }, [searchItem, page]);

//   useEffect(() => {
//     sendQuery(searchItem);
//   }, [searchItem, sendQuery, page]);

//   return { loading, error, list };
// }

// export default useScroll;