'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { EyeFilledIcon } from '../ui/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../ui/EyeSlashFilledIcon';

function page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = React.useState(false);

  const User = {
    email: email,
    password: password,
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e) => {
    e.preventDefault();

    const error = document.querySelector('#error');
    error.innerHTML = '';

    const res = await fetch(`${process.env.ENDPOINT}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(User),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      router.push('/');
    } else {
      error.innerHTML = 'Invalid credentials';
    }
  };

  return (
    <div className='container mx-auto'>
      <div className='flex h-screen items-center justify-center'>
        <div className='w-full max-w-md'>
          {/* LOGIN FORM */}
          <form
            onSubmit={(e) => handleLogin(e)}
            className='mx-4 mb-4 rounded-xl bg-[#354F52] p-8 shadow-xl'
          >
            {/* SOCCERSTATS */}
            <h1 className='mb-4 text-center text-xl font-light text-white'>
              Soccer<span className='font-bold'>Stats</span>
            </h1>

            {/* EMAIL & PASSWORD INPUT */}
            <div className='mb-4 flex w-full flex-col gap-4'>
              <Input
                classNames={{
                  innerWrapper: 'text-white',
                  inputWrapper: [
                    'bg-[#84A98C]/25',

                    'backdrop-blur-xl',
                    'backdrop-saturate-200',
                    'hover:bg-[#84A98C]/50',
                    'dark:hover:bg-default/70',
                    'group-data-[focused=true]:bg-default-200/50',
                    'dark:group-data-[focused=true]:bg-default/60',
                    '!cursor-text',
                  ],
                }}
                label='Email'
                placeholder='Enter email'
                value={email}
                onValueChange={setEmail}
              />
              <Input
                label='Password'
                placeholder='Enter password'
                endContent={
                  <button
                    className='focus:outline-none'
                    type='button'
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
                    ) : (
                      <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
                    )}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                value={password}
                onValueChange={setPassword}
              />
              <p
                className='text-center text-xs italic text-red-500'
                id='error'
              ></p>
            </div>

            {/* LOGIN BUTTON */}
            <div className='flex flex-col items-center justify-between gap-2'>
              <Button
                className='focus:shadow-outline w-full rounded-lg bg-[#84A98C] py-2 font-bold text-white focus:outline-none'
                type='submit'
              >
                Log In
              </Button>
              <Button className='focus:shadow-outline w-full rounded-lg bg-white py-2 text-slate-700 focus:outline-none'>
                login with Google
              </Button>
              <a
                className='inline-block align-baseline text-sm font-medium text-slate-200 transition-all hover:text-white'
                href='#'
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className='text-center text-xs text-gray-500'>
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
