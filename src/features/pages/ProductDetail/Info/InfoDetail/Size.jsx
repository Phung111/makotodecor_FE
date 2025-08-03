import { useState } from 'react';
import Part from './Part';
import ButtonSize from '../../../../components/buttons/ButtonSize';

export default function Size({ array, setSelectedSizeAndPrice }) {
  const [selectedSize, setSelectedSize] = useState(array[0].size);
  const [selectedPrice, setSelectedPrice] = useState(array[0].price);
  const [selectedPriceFirst, setSelectedPriceFirst] = useState(array[0].priceFirst);

  const handleSizeSelection = (size, price, priceFirst) => {
    setSelectedSize(size);
    setSelectedPrice(price);
    setSelectedPriceFirst(priceFirst);
    setSelectedSizeAndPrice(size, price, priceFirst);
  };

  return (
    <>
      <Part title={'size'}>
        <div className='flex w-full flex-wrap gap-2'>
          {array &&
            array.map((item, index) => (
              <ButtonSize
                key={index}
                isSelected={selectedSize === item.size}
                onClick={() => handleSizeSelection(item.size, item.price, item.priceFirst)}
              >
                {item.size}
              </ButtonSize>
            ))}
        </div>
      </Part>
    </>
  );
}
