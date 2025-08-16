import React, { useState, useCallback, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

// Main component
const ImageUploader = ({ images = [], onImagesChange, title = 'Image Uploader', maxImages = 10, accept = 'image/*', className = '' }) => {
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (e) => {
    const fileList = Array.from(e.target.files);
    addNewImages(fileList);
  };

  // Add new images to the state
  const addNewImages = (fileList) => {
    if (images.length + fileList.length > maxImages) {
      alert(`Chỉ có thể tải lên tối đa ${maxImages} ảnh`);
      return;
    }

    const newImages = fileList.map((file, index) => ({
      id: uuidv4(),
      file,
      priority: images.length + index + 1,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    const updatedImages = [...images, ...newImages];
    onImagesChange(updatedImages);
  };

  // Move image in array when reordering
  const moveImage = useCallback(
    (dragIndex, hoverIndex) => {
      const clonedImages = [...images];
      const [removed] = clonedImages.splice(dragIndex, 1);
      clonedImages.splice(hoverIndex, 0, removed);

      // Update priorities after reordering
      const updatedImages = clonedImages.map((image, index) => ({
        ...image,
        priority: index + 1,
      }));

      onImagesChange(updatedImages);
    },
    [images, onImagesChange]
  );

  // Remove image
  const removeImage = (id) => {
    const filtered = images.filter((image) => image.id !== id);
    // Update priorities after removal
    const updatedImages = filtered.map((image, index) => ({
      ...image,
      priority: index + 1,
    }));

    onImagesChange(updatedImages);
  };

  // Handle drag over for file drop zone
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  // Handle drag leave for file drop zone
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  // Handle drop for file drop zone
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addNewImages(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className={`mx-auto rounded-lg bg-white ${className}`}>
      {title && <h3 className='mb-4 text-lg font-semibold text-gray-700'>{title}</h3>}

      {/* File drop zone */}
      <div
        className={`mb-6 rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer ${
          isDraggingFile ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current.click();
          }
        }}
        tabIndex={0}
      >
        <div className='flex flex-col items-center justify-center'>
          <svg
            className={`mb-3 h-12 w-12 ${isDraggingFile ? 'text-blue-500' : 'text-gray-400'}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            />
          </svg>
          <p className='mb-2 text-sm text-gray-700'>
            <span className='font-semibold'>Nhấp để tải lên</span> hoặc kéo thả
          </p>
          <p className='text-xs text-gray-500'>
            PNG, JPG, GIF tối đa 10MB ({images.length}/{maxImages})
          </p>
        </div>
        <input ref={fileInputRef} type='file' multiple accept={accept} onChange={handleFileSelect} className='hidden' />
      </div>

      {/* Image preview and sorting area */}
      <div className='mb-6'>
        {images.length > 0 && <p className='mb-3 text-sm text-gray-600'>Kéo để sắp xếp lại thứ tự ảnh</p>}

        <DndProvider backend={HTML5Backend}>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
            <AnimatePresence>
              {images.map((image, index) => (
                <DraggableImage key={image.id} id={image.id} index={index} image={image} moveImage={moveImage} removeImage={removeImage} />
              ))}
            </AnimatePresence>
          </div>
        </DndProvider>
      </div>
    </div>
  );
};

// Draggable image component
const DraggableImage = ({ id, index, image, moveImage, removeImage }) => {
  const ref = useRef(null);

  // Drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop functionality
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'IMAGE',
    hover: (item, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height/width
      // When dragging downwards/rightwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY && hoverClientX < hoverMiddleX) {
        return;
      }

      // When dragging upwards/leftwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY && hoverClientX > hoverMiddleX) {
        return;
      }

      // Time to actually perform the action
      moveImage(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Initialize drag and drop refs
  drag(drop(ref));

  // Determine card style based on drag state
  const getItemStyle = () => {
    if (isDragging) {
      return 'opacity-50 border-blue-400 shadow-lg scale-105';
    }
    if (isOver && canDrop) {
      return 'border-green-400 shadow-md';
    }
    return 'border-gray-200 hover:border-gray-300';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isDragging ? 1.05 : 1,
        boxShadow: isDragging ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className='aspect-square'
    >
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-lg border-2 ${getItemStyle()} h-full w-full transform cursor-move transition-all duration-200`}
      >
        <div className='aspect-square h-full w-full'>
          <img src={image.preview || image.url} alt={`Upload preview ${index + 1}`} className='h-full w-full object-cover' />
        </div>

        {/* Priority badge */}
        <div className='absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-br-lg bg-red-200 font-bold text-red-800 shadow-inner'>
          {image.priority}
        </div>

        {/* Remove button */}
        <motion.button
          onClick={() => removeImage(id)}
          className='bg-opacity-70 absolute top-2 right-2 rounded-full bg-white p-2 shadow-sm transition-all duration-200 hover:bg-white'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className='h-4 w-4 text-red-500 hover:text-red-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </motion.button>

        {/* Drop indicator overlay */}
        {isOver && canDrop && (
          <div className='bg-opacity-20 absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-green-500 bg-green-500'>
            <div className='bg-opacity-80 rounded-full bg-white p-2'>
              <svg className='h-6 w-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
                ></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// PropTypes for main component
ImageUploader.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onImagesChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  maxImages: PropTypes.number,
  accept: PropTypes.string,
  className: PropTypes.string,
};

// PropTypes for DraggableImage component
DraggableImage.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.shape({
    id: PropTypes.string,
    preview: PropTypes.string,
    url: PropTypes.string,
    priority: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  moveImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
};

export default ImageUploader;
