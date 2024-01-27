'use client';

import Image from 'next/image';
import Soccer from '@/public/soccer.jpg';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

export default function Home() {
  const route = useRouter();
  return (
    // home page
    <div className='container md:mx-auto'>
      <div className='flex h-screen flex-col items-center gap-4 md:flex-row'>
        <div className='grow'>
          <h1 className='text-4xl font-bold'>
            Hello, I'm <span className='text-blue-500'>Rahul</span>
          </h1>
          <p className='mb-8 text-lg'>I'm a full stack developer</p>
          <Button className='me-4' onClick={() => route.push('/account/login')}>
            Log In
          </Button>
          <Button
            variant='ghost'
            onClick={() => route.push('/account/register')}
          >
            Sign Up
          </Button>
        </div>
        <div className='grow'>
          <Image src={Soccer} width={200} height={300} />
        </div>
      </div>
    </div>
  );
}
