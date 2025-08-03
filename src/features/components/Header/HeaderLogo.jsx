import { Link } from 'react-router-dom';

export default function HeaderLogo() {
  return (
    <>
      <Link to='/'>
        <div id='header__logo' className='w-[120px] sm:w-[180px] md:w-[240px] h-full shrink-0'>
          <img className='w-full h-full object-contain' src='https://res.cloudinary.com/cloudinarymen/image/upload/v1748196437/makotodecor/backgrounds/LOGO_lolbry.png' alt='logo header' />
        </div>
      </Link>
    </>
  );
}
