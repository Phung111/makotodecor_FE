import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

export default function CustomSelect({ options = [], value, onChange, placeholder = 'Chọn một tùy chọn...', disabled = false, clearable = true, selectBg = 'bg-white', selectBorder = 'border-gray-300', selectHover = 'hover:border-blue-500', selectFocus = 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200', optionBg = 'bg-white', optionHover = 'hover:bg-blue-50', optionSelected = 'bg-blue-100', textColor = 'text-gray-900', placeholderColor = 'text-gray-500' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      const option = options.find((opt) => opt.value === value);
      setSelectedOption(option || null);
    }
  }, [value, options]);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setMaxHeight(height);
    }
  }, [options, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value, option);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedOption(null);
    if (onChange) {
      onChange(null, null);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className='relative w-full box-border' ref={selectRef}>
      <button
        type='button'
        onClick={toggleDropdown}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-left border rounded-md
          transition-colors duration-200 flex items-center justify-between cursor-pointer
          ${selectBg} ${selectBorder} ${!disabled ? selectHover : 'cursor-not-allowed opacity-50'}
          ${isOpen ? selectFocus : 'focus:outline-none focus:ring-2 focus:ring-blue-200'}
          ${textColor}
        `}
      >
        <span className={`${selectedOption ? textColor : placeholderColor} capitalize truncate flex-1 mr-2`}>{selectedOption ? selectedOption.label : placeholder}</span>
        <div className='flex items-center gap-1 flex-shrink-0'>
          {clearable && selectedOption && !disabled && (
            <button type='button' onClick={handleClear} className='p-1 rounded hover:bg-gray-200 transition-colors duration-150' title='Xóa lựa chọn'>
              <X className='w-3 h-3 text-gray-500 hover:text-gray-700 cursor-pointer' />
            </button>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </button>

      <div
        ref={dropdownRef}
        className={`
          absolute z-100 w-full mt-1 border rounded-md shadow-lg
          ${optionBg} border-gray-200 overflow-hidden
          transition-all duration-200 ease-out origin-top
          ${isOpen ? 'opacity-100 scale-y-100 translate-y-0 visible' : 'opacity-0 scale-y-95 translate-y-1 invisible'}
        `}
        style={{
          height: isOpen ? `${maxHeight}px` : '0px',
          maxHeight: isOpen ? `${maxHeight}px` : '0px',
        }}
      >
        <div
          ref={contentRef}
          className={`transition-all duration-300 overflow-hidden`}
          style={{
            height: isOpen ? `${maxHeight}px` : '0px',
            maxHeight: isOpen ? `${maxHeight}px` : '0px',
          }}
        >
          {options.length === 0 ? (
            <div className={`px-3 py-2 text-gray-500`}>Không có tùy chọn nào</div>
          ) : (
            options.map((option, index) => (
              <div
                key={option.value || index}
                onClick={() => handleSelect(option)}
                className={`
                  px-3 py-2 cursor-pointer flex items-center justify-between
                  transition-colors duration-150 capitalize
                  ${selectedOption?.value === option.value ? `${optionSelected} ${textColor}` : `${optionHover} ${textColor}`}
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <span className='break-words flex-1 mr-2 truncate'>{option.label}</span>
                {selectedOption?.value === option.value && <Check className='w-4 h-4 text-blue-600 flex-shrink-0' />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Demo component
function Demo() {
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { value: 'option1', label: 'Tùy chọn 1' },
    { value: 'option2', label: 'Tùy chọn 2' },
    { value: 'option3', label: 'Tùy chọn 3' },
    { value: 'option4', label: 'Tùy chọn 4' },
    { value: 'option5', label: 'Tùy chọn 5' },
  ];

  return (
    <div className='p-8 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Custom Select với Animation</h1>
      <CustomSelect options={options} value={selectedValue} onChange={(value) => setSelectedValue(value)} placeholder='Chọn một tùy chọn...' />
      <p className='mt-4 text-sm text-gray-600'>Selected: {selectedValue || 'Chưa chọn'}</p>
    </div>
  );
}
