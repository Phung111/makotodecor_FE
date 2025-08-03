// BaseModal.js
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';

export default function BaseModal({ children, onClose, backgroundColor = 'bg-white/20', id = 'modal' }) {
  const dispatch = useDispatch();
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = (e) => {
    if (isClosing && e.animationName.includes('fadeOut')) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      id={id}
      className={`fixed w-full h-full z-10 ${backgroundColor} backdrop-blur-xs animate__animated animate__faster ${
        isClosing ? 'animate__fadeOutUp' : 'animate__fadeInDown'
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className='flex w-full justify-center flex-col items-center gap-10 mt-10'>
        <div onClick={handleClose} className='cursor-pointer hover:text-primary'>
          <X />
        </div>
        {children}
      </div>
    </div>
  );
}
