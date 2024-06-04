'use client';
import { authenticate } from '@/app/lib/auth-action';
import AcmeLogo from '@/app/ui/acme-logo';
import { lusitana } from '@/app/ui/fonts';
import {
    ArrowRightIcon,
    AtSymbolIcon,
    ExclamationCircleIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import RenderInputSvg from '@/components/RenderInputSvg';
import { Button } from '@/app/ui/button';
import OTPInput from '@/components/logins/OTPInput';

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const { pending } = useFormStatus();
    const [showPassword, setShowPassword] = useState({
        passowrd: false,
        rePassword: false,
    });
    const [otp, setOtp] = useState('');

    const handleChangeOTP = (otp: string) => {
        setOtp(otp);
    };
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                        <p>contact to make a code</p>
                    </div>
                </div>
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <form action={dispatch} className="space-y-3">
                        <h1
                            className={`${lusitana.className} mb-3 text-2xl`}
                        ></h1>
                        <div className="w-full">
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation(),
                                                setShowPassword(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        passowrd:
                                                            !prevState.passowrd,
                                                    }),
                                                );
                                        }}
                                        style={{
                                            position: 'absolute',
                                            left: '90%',
                                            top: ' 10px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <RenderInputSvg
                                            isHidden={showPassword.passowrd}
                                        />
                                    </div>

                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="password"
                                        type={
                                            showPassword.passowrd
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="password"
                                        placeholder="Renter password"
                                        required
                                        minLength={6}
                                    />

                                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="re-password"
                                >
                                    Renter new Password
                                </label>
                                <div className="relative">
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation(),
                                                setShowPassword(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        rePassword:
                                                            !prevState.rePassword,
                                                    }),
                                                );
                                        }}
                                        style={{
                                            position: 'absolute',
                                            left: '90%',
                                            top: ' 10px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <RenderInputSvg
                                            isHidden={showPassword.rePassword}
                                        />
                                    </div>

                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="re-password"
                                        type={
                                            showPassword.rePassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="re-password"
                                        placeholder="Renter password"
                                        required
                                        minLength={6}
                                    />

                                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>

                        <div className='p-4' >
                            <h1 className="mb-4 text-center ">Enter OTP</h1>
                            <OTPInput
                                length={4}
                                onChangeOTP={handleChangeOTP}
                            />
                        </div>

                        <Button
                            className="mt-4 w-full py-2"
                            aria-disabled={pending}
                        >
                            reset
                            <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                        </Button>
                        <div className="flex h-8 items-end space-x-1">
                            <div
                                className="flex h-8 items-end space-x-1"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {errorMessage && (
                                    <>
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                        <p className="text-sm text-red-500">
                                            {errorMessage}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                    <div />
                </div>
            </div>
        </main>
    );
}
