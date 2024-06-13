"use client"
import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function HeroSectiom() {
    const session:any = useSession().data;
    return (
        <div>
            <h3>{session?.user?.name}</h3> <br />
            <h5> {session?.user?.email}</h5> <br />
            <Image
                src={`/profileAvtars/${session?.user?.avatar ? JSON.parse(session.user.avatar) : 'default'}.png`}
                height={100}
                width={100}
                className="hidden md:block"
                alt="img"
            />
        </div>
    );
}

export default HeroSectiom;
