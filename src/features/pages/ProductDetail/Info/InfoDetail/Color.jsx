import { useState } from 'react';
import Part from './Part';
import ButtonColor from '../../../../components/buttons/ButtonColor';

import { useDispatch } from 'react-redux';
// import { setCurrentImage } from 'service/baseSlice';

export default function Color({ array }) {
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState(array[0].color);

  const handleColorSelection = (color) => {
    // dispatch(setCurrentImage(color.img));
    setSelectedColor(color.color);
  };
  return (
    <>
      <Part title={'color'}>
        <div className='flex flex-wrap gap-3'>
          {array &&
            array.map((item, index) => (
              <ButtonColor key={index} isSelected={selectedColor === item.color} onClick={() => handleColorSelection(item)}>
                {item.color}
              </ButtonColor>
            ))}
        </div>
      </Part>
    </>
  );
}
