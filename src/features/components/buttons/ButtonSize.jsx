export default function ButtonSize({ children, isSelected, onClick }) {
  return (
    <>
      <button
        className={`flex cursor-pointer items-center justify-center border border-black/20 px-4 py-3 hover:border-primary hover:text-primary ${
          isSelected ? 'border-primary text-primary' : ''
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
