import { useState, useEffect } from 'react';
import ArrowUp from './icons/ArrowUp';
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const isVisible = scrollPosition > 300;
    setIsVisible(isVisible);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`${
        isVisible ? 'block' : 'hidden'
      } fixed bottom-20 right-4 p-2 bg-primary text-light rounded-full`}
      onClick={scrollToTop}
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
