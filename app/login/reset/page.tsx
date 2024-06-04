'use client';
import { authResetPassword } from '@/app/lib/auth-action';
import AcmeLogo from '@/app/ui/acme-logo';
import { lusitana } from '@/app/ui/fonts';
import {
    ArrowRightIcon,
    AtSymbolIcon,
    ExclamationCircleIcon,
    KeyIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import RenderInputSvg from '@/components/RenderInputSvg';
import { Button } from '@/app/ui/button';
import OTPInput from '@/components/logins/OTPInput';
import PasswordReset from '@/components/logins/PasswordReset';
import RenderErrorMsg from '@/components/RenderErrorMsg';
import CountDown from '@/components/CountDown';

export default function LoginPage() {
    const [state, dispatch] = useFormState(authResetPassword, {
        steps: 0,
        error: null,
        success: null,
    });

    const { pending } = useFormStatus();

    return (
        <main className="flex items-center justify-center transition-all md:h-screen ">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                        <p>contact to make a code</p>
                    </div>
                </div>
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <form action={dispatch} className="space-y-3">
                        <RenderSteps
                            steps={state.steps}
                            error={state.error}
                            success={state.success}
                            pending={pending}
                        />
                    </form>
                    <div />
                </div>
            </div>
        </main>
    );
}

function RenderSteps({
    steps,
    error,
    pending,
    success,
}: {
    steps: number;
    error: string | null;
    success: string | null;
    pending: boolean;
}) {
    const [otp, setOtp] = useState<string | null>(null);
    const handleChangeOTP = (otp: string) => {
        setOtp(otp);
    };

    return (
        <>
            {steps === 0 && (
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="Name"
                    >
                        Enter Your Email
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm placeholder-gray-500 outline-none"
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Enter your full name"
                            required
                        />
                        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    <div
                        className="flex items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    ></div>
                </div>
            )}

            {steps === 1 && (
                <>
                    <CountDown initialMinute={5} />
                    <div className="p-4">
                        <h1 className="mb-4 text-center ">Enter OTP</h1>
                        <OTPInput length={4} onChangeOTP={handleChangeOTP} />
                    </div>
                </>
            )}
            {steps === 2 && (
                <>
                    <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                        Enter new password
                    </h1>

                    <PasswordReset />
                </>
            )}
            <Button className="mt-4 w-full py-2" aria-disabled={pending}>
                Reset Password
                <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            <RenderErrorMsg error={error} success={success} />
        </>
    );
}
