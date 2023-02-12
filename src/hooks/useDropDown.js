import { useEffect, useState, useRef } from "react";

const useDropDown = (defaultState) => {
  const [isOpen, setIsOpen] = useState(defaultState);
  const ref = useRef(null);

  const removeHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsOpen(!isOpen);
        }
    };

    if(isOpen) {
        window.addEventListener("click", onClick);
    }

    return () => {
        window.removeEventListener("click", onClick);
    };
  }, [isOpen]);
  return [isOpen, ref, removeHandler];

};

export default useDropDown;