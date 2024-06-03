import { signIn } from '@/auth';
import React from 'react';
import Image from 'next/image';

function GoogleLogin() {
    return (
        <form
            action={async () => {
                'use server';
                await signIn('google');
            }}
        >
            <button className="w-full flex gap-2 rounded-lg border border-slate-200 px-4 py-2 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:hover:border-slate-500">
                <Image
                    className="h-6 w-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                />
                <span>Login with Google</span>
            </button>
        </form>
    );
}

export default GoogleLogin;
