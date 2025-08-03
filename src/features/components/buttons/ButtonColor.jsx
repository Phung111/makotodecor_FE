export default function ButtonColor({ children, isSelected, onClick }) {
  let baseClass = 'aspect-square cursor-pointer rounded-full border-[0.5px] border-black/20 outline-offset-4 outline-primary w-10 h-10';

  let addClass = isSelected ? 'outline' : 'hover:outline';

  let bgColor = 'bg-';

  switch (children) {
    case 'red':
      bgColor += 'red-500';
      break;
    case 'blue':
      bgColor += 'blue-300';
      break;
    case 'yellow':
      bgColor += 'yellow-300';
      break;
    case 'orange':
      bgColor += 'orange-400';
      break;
    case 'green':
      bgColor += 'green-500';
      break;
    case 'purple':
      bgColor += 'purple-500';
      break;
    case 'black':
      bgColor += 'black';
      break;
    case 'white':
      bgColor += 'white';
      break;
    case 'pink':
      bgColor += 'pink-500';
      break;
    default:
      break;
  }

  addClass += ' ' + bgColor;

  return (
    <>
      <button className={`${baseClass} ${addClass}`} onClick={onClick} />
      <div className='bg-re'></div>
    </>
  );
}
