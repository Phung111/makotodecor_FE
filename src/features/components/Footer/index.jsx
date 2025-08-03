export default function Foot() {
  const iconFootClass = 'text-primary hover:text-primary-dark sm:text-3xl';

  return (
    <>
      <footer id='foot' className='container'>
        <div className='relative flex justify-center flex-col'>
          <img src='https://res.cloudinary.com/cloudinarymen/image/upload/v1750595728/makotodecor/backgrounds/footer_n6embd.png' alt='footer' />
          <div className='absolute w-full h-full flex items-end'>
            <div className='h-[36px] md:h-[48px] w-full border-primary border-b-2 bot mb-4 flex justify-end'>
              <div className='flex gap-6 md:gap-10 mr-4 md:mr-10'>
                <a href='https://www.facebook.com/Makoto.decor' target='_blank' className={iconFootClass}>
                  <i className='fa-brands fa-facebook'></i>
                </a>
                <a href='https://www.instagram.com/makotodecor' target='_blank' className={iconFootClass}>
                  <i className='fa-brands fa-square-instagram'></i>
                </a>
                <a className={iconFootClass}>
                  <i className='fa-brands fa-youtube'></i>
                </a>
                <a className={iconFootClass}>
                  <i className='fa-brands fa-square-twitter'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
