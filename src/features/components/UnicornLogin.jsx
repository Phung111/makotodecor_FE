'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function UnicornLogin() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.slice);
  const [state, setState] = useState('');

  useEffect(() => {}, []);

  return (
    <>
      <div className='bg-black text-white flex justify-center items-center min-h-screen m-0'>
        <div className='flex w-full max-w-[1440px] h-screen bg-[#0E0C15]'>
          <div className='flex-1 flex flex-col justify-between p-8 bg-[#15131D]'>
            <div className='max-w-sm mx-auto text-center flex-1 flex flex-col justify-center'>
              <div className='mb-8'>
                <div className='mb-6'>
                  <img
                    src='https://s3-alpha.figma.com/thumbnails/8f91b10f-1fce-47a6-8af9-2fe0076019c6?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4GOSFWCS2LHWM5N%2F20250807%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250807T000000Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=cfc2ce6456c47c60a8c8597a1c2ed4f98f3ce73aeec368bfd38b74d70a50eb1c'
                    alt='logo'
                    className='w-12 h-12 rounded-lg mx-auto'
                  />
                </div>
                <h1 className='text-4xl font-semibold mb-3'>Log In</h1>
                <p className='text-base text-[#AEADBC] mb-8'>Welcome back! Please enter your details.</p>
              </div>

              <div className='text-left'>
                <form>
                  <div className='mb-5'>
                    <label htmlFor='email' className='block text-sm text-[#918FA0] mb-2'>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      placeholder='Enter your email'
                      className='w-full px-4 py-3 rounded-full border-[1.5px] border-[#252134] bg-[#15131D] text-white text-base focus:outline-none focus:ring-2 focus:ring-[#9E51FB]'
                    />
                  </div>

                  <div className='mb-5'>
                    <label htmlFor='password' className='block text-sm text-[#918FA0] mb-2'>
                      Password
                    </label>
                    <input
                      type='password'
                      id='password'
                      placeholder='••••••••'
                      className='w-full px-4 py-3 rounded-full border-[1.5px] border-[#252134] bg-[#15131D] text-white text-base focus:outline-none focus:ring-2 focus:ring-[#9E51FB]'
                    />
                  </div>

                  <div className='flex justify-between items-center mb-6'>
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        id='remember'
                        className='mr-2 w-4 h-4 text-[#9E51FB] bg-transparent border-[#252134] rounded focus:ring-[#9E51FB] focus:ring-2'
                      />
                      <label htmlFor='remember' className='text-sm text-[#AEADBC]'>
                        Remember for 30 days
                      </label>
                    </div>
                    <a href='#' className='text-sm font-semibold text-[#9E51FB] no-underline hover:underline'>
                      Forgot password
                    </a>
                  </div>

                  <div className='flex flex-col gap-4 mb-8'>
                    <button
                      type='submit'
                      className='w-full px-12 py-3 rounded-full text-base font-semibold cursor-pointer text-center bg-[#9E51FB] text-white border-[1.5px] border-white/10 hover:bg-[#8a45e8] transition-colors'
                    >
                      Sign in
                    </button>
                    <button
                      type='button'
                      className='w-full px-12 py-3 rounded-full text-base font-semibold cursor-pointer text-center bg-[#0E0C15] text-white border border-[#252134] flex items-center justify-center gap-3 hover:bg-[#252134] transition-colors'
                    >
                      <img
                        src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
                        alt='Google logo'
                        className='w-5 h-5'
                      />
                      Sign in with Google
                    </button>
                  </div>
                </form>
              </div>

              <div className='text-sm text-[#AEADBC]'>
                <p>
                  Don't have an account?{' '}
                  <a href='#' className='text-[#9E51FB] font-semibold no-underline hover:underline'>
                    Sign up
                  </a>
                </p>
              </div>
            </div>

            <footer className='text-left text-sm text-[#535862]'>
              <p>© ÅL 2025</p>
            </footer>
          </div>

          <div
            className='flex-1 relative flex justify-center items-end p-14 rounded-r-[80px] overflow-hidden'
            style={{
              backgroundImage: `url('https://s3-alpha.figma.com/images/e236ed7f-a53e-481a-a9f4-fe3691c36efe'), url('https://s3-alpha.figma.com/images/24cf840a-7f8e-4c53-e392-90ce382e20cb')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/56 to-[#111111] rounded-br-[80px]'></div>

            <div
              className='relative z-10 max-w-[656px] p-6 rounded-3xl backdrop-blur-custom border gradient-border'
              style={{ backgroundColor: 'rgba(172, 106, 255, 0.1)' }}
            >
              <h2 className='text-4xl font-semibold leading-tight mb-8'>"👋Hi there! I'm Yori, your AI call assistant."</h2>
              <p className='text-lg leading-relaxed'>
                An AI-powered assistant for customer service calls. Handles responses automatically, customizable and available 24/7. Streamlines your
                workflow and enhances customer experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
