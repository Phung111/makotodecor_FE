export default function ButtonCustom({ className, children, type = 'solid', color = 'primary' }) {
  const baseClass = 'flex gap-2 h-full w-full items-center justify-center capitalize cursor-pointer rounded-[6px] transition-all duration-300 border-2';

  const colors = {
    primary: {
      solid: 'bg-primary text-white hover:bg-primary-dark border-transparent',
      outline: 'bg-transparent text-white border-primary hover:bg-primary hover:text-white',
    },
    black: {
      solid: 'bg-black text-white hover:bg-primary-dark border-transparent',
      outline: 'bg-transparent text-white border-black hover:bg-black hover:text-white',
    },
    white: {
      solid: 'bg-white text-black hover:bg-primary-dark border-transparent',
      outline: 'bg-transparent text-black border-white hover:bg-white hover:text-black',
    },
  };

  const colorClass = colors[color]?.[type] || colors.primary.solid;

  return <div className={`${baseClass} ${colorClass} ${className} `}>{children}</div>;
}
