export default function Part({ title, children }) {
  return (
    <>
      <div className='flex items-center gap-2 text-base capitalize text-black/70 sm:text-lg'>
        <div className='flex w-[110px] shrink-0 items-start'>{title}</div>
        <div className='flex h-full items-center'>{children}</div>
      </div>
    </>
  );
}
