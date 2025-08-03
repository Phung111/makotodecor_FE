import CustomSelect from '../Other/CustomSelect';
import { useState } from 'react';

export default function CategoryDropdown() {
  const fruitOptions = [
    { value: 'rèm', label: 'rèm' },
    { value: 'bảng gỗ', label: 'bảng gỗ' },
    { value: 'thẻ gỗ', label: 'thẻ gỗ' },
    { value: 'cờ gỗ', label: 'cờ gỗ' },
    { value: 'daruma', label: 'daruma' },
    { value: 'darumadarumadaruma', label: 'darumadarumadaruma' },
  ];

  const [selectedValue, setSelectedValue] = useState('');

  return (
    <>
      {/* prettier-ignore */}
      <CustomSelect
          options={fruitOptions}
          value={selectedValue}
          onChange={(value) => setSelectedValue(value)}
          placeholder="Danh mục"
          selectBg="bg-transparent"
          selectBorder="border-0"  
          selectHover="hover:border-primary/20"
          selectFocus="focus:ring-2 focus:ring-primary/20"
          optionBg="bg-gray-2"
          optionHover="hover:bg-primary-light/50"
          optionSelected="bg-primary-light"
          textColor="text-gray-7"
          placeholderColor="text-gray-7"
        />
    </>
  );
}
