import { useCallback } from 'react';
import { scroller } from 'react-scroll';

const useScrollTo = () => {
    const scrollTo = useCallback((id, duration = 500) => {
        scroller.scrollTo(id, {
            duration: duration,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    }, []);

    return scrollTo;
};

export default useScrollTo;
