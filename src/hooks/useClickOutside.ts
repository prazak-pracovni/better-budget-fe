import { useEffect, RefObject } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement> | RefObject<HTMLElement>[], handler: (e: Event) => void) => {
  useEffect(() => {
    const listener = (e: Event) => {
      const refs = Array.isArray(ref) ? ref : [ref];
      if (refs.some(singleRef => !singleRef.current || singleRef.current.contains(e.target as HTMLElement))) {
        return;
      }

      handler(e);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
