import React from 'react'

import { Card, CardBody, CardFooter, Avatar, Divider } from '@nextui-org/react'
import Link from 'next/link'

export default function Page() {
    return (
        <div className='flex max-w-[500px] items-center justify-center md:mx-auto md:py-12'>
            <Card className='p-4'>
                <CardBody className='rounded-lg bg-content1'>
                    <div className='mb-4 flex items-center gap-4'>
                        <Avatar
                            size='md'
                            src='https://res.cloudinary.com/dov4ccsg6/image/upload/f_auto,q_auto/v1/EPICODE-STORAGE/p2gnrnkrtbsiubp2wtbs'
                        />{' '}
                        <h1 className='text-xl font-semibold text-primary-400 dark:text-white'>
                            Hey, sono Alessio! 👋
                        </h1>
                    </div>
                    <div className='text-sm text-default-500'>
                        <p className='mb-6'>
                            Sono un ragazzo di 20 anni con la passione per il
                            Web Development, soprattutto lato Front End, sono un
                            ragazzo molto curioso, mi piace scoprire nuove
                            tecnologie e condividerle con i miei colleghi, adoro
                            il lavoro di gruppo! sopratutto confrontarmi con chi
                            mi sta a fianco.
                        </p>

                        <h4 className='mb-2 text-sm font-semibold'>
                            Chi Sono:
                        </h4>
                        <ul className='mb-6 ms-4 list-none leading-6'>
                            <li>🎓 Studente di informatica</li>
                            <li>💻 Aspirante Web Developer</li>
                            <li>🌐 Amante del FrontEnd e del design</li>
                        </ul>

                        <h4 className='mb-2 text-sm font-semibold'>Skills:</h4>
                        <ul className='mb-6 ms-4 list-none leading-6'>
                            <li>🖥️ HTML, CSS, JavaScript, ReactJS</li>
                            <li>🚀 Sperimentando con Next.js</li>
                            <li>🎨 Design responsive e accessibile</li>
                            <li>🔄 Git è mio amico</li>
                        </ul>

                        <h4 className='mb-2 text-sm font-semibold'>
                            Obiettivi :
                        </h4>
                        <p>
                            Al momento sto cercando di migliorare sempre di più
                            nello sviluppo Front End, esplorando le ultime
                            tecnologie e tendenze di sviluppo.
                        </p>
                    </div>
                    <Divider orientation='horizontal' className='mt-6' />
                </CardBody>
                <CardFooter>
                    <div className='flex items-center gap-4'>
                        <h4 className='text-sm font-semibold text-default-500'>
                            Contattami :
                        </h4>
                        <Link
                            href='mailto:belcastroalessio@outlook.it'
                            className='text-sm text-primary-500'
                        >
                            📧 Scrivimi!
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
