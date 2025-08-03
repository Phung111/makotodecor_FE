import React, { useState } from 'react';
import { BadgeCheck, ShoppingCart, Plus, Minus } from 'lucide-react';

const QuantitySelector = ({ initialQuantity = 1, onQuantityChange, min = 1, max = 99 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || min;
    if (value >= min && value <= max) {
      setQuantity(value);
      onQuantityChange?.(value);
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <button onClick={handleDecrease} disabled={quantity <= min} className='active:bg-red-300 w-6 aspect-square rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer'>
        <Minus className='w-4 h-4' />
      </button>

      <input type='text' value={quantity} onChange={handleInputChange} min={min} max={max} className='w-6 aspect-square text-center text-[14px] text-gray-6' />

      <button onClick={handleIncrease} disabled={quantity >= max} className='active:bg-green-300 w-6 aspect-square rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer'>
        <Plus className='w-4 h-4' />
      </button>
    </div>
  );
};

export default QuantitySelector;
