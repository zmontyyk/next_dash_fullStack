"use client";
import { lusitana } from "@/app/ui/fonts";
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../../Ui-resources/button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate, authSingIn } from "../lib/auth-action";
import { useState } from "react";
import Link from "next/link";
import CustomDropdown from "@/Ui-resources/CustomDropdown";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/utils/apiClient";

export default function LoginForm({ value }: { value: string }) {
    const method = value === "SingUp" ? authSingIn : authenticate;

    const [errorMessage, dispatch] = useFormState(method, undefined);
    const [showPassword, setShowPassword] = useState(false);
    const [avtar, setAvtar] = useState<string | number>("default");
    const [verified, setVerified] = useState(false);

    const onChange = async (value: string | null) => {
        interface verifyToken {    
            challenge_ts: string;
            hostname: string;
            success: boolean;
        }

        try {
            const verifyToken: verifyToken = await verifyCaptcha(value);

            if (verifyToken.success) {
                setVerified(!!value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form action={dispatch} className="space-y-3">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                {value === "SingUp"
                    ? "Sign up for your new account"
                    : "Please log in to continue."}
            </h1>
            <div className="w-full">
                {value === "SingUp" ? (
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="Name"
                        >
                            Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="Name"
                                type="Name"
                                name="Name"
                                placeholder="Enter your full name"
                                required
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                ) : null}
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                        />
                        <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                <div className="mt-4">
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
                                    setShowPassword(!showPassword);
                            }}
                            style={{
                                position: "absolute",
                                left: "90%",
                                top: " 10px",
                                cursor: "pointer",
                            }}
                        >
                            {!showPassword ? (
                                <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2 2L22 22"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </div>

                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            required
                            minLength={6}
                        />

                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>

                {value === "SingUp" ? (
                    <div className="avtarPicker mt-5 w-full">
                        <input
                            id="avatar"
                            name="avatar"
                            type="checkbox"
                            value={avtar}
                            checked={true}
                            readOnly={true}
                            style={{ display: "none" }}
                        />
                        <CustomDropdown
                            selectedAvtar={(selectedAvtar) => {
                                setAvtar(selectedAvtar);
                            }}
                            optionsLength={6}
                            dropdownLable="Pick Avtar"
                            pickAvtar={avtar}
                        />
                    </div>
                ) : null}
            </div>
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={onChange}
            />
            <LoginButton value={value} verified={verified} />
            {value !== "SingUp" ? (
                <>
                    <hr style={{ borderTop: "1px dashed #bbb" }} />
                    <Link href={"/login/reset"}>
                        <p className="cursor-pointer py-4 text-center text-sm font-medium">
                            Forgot password?
                        </p>
                    </Link>
                </>
            ) : null}
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
    );
}

function LoginButton({
    value,
    verified,
}: {
    value: string;
    verified: boolean;
}) {
    const { pending } = useFormStatus();

    return (
        <div className="creds">
            {pending ? <div className="loader  "></div> : null}
            <Button
                className="mt-4 w-full"
                style={
                    pending || !verified
                        ? {
                              background: "rgb(229, 229, 229)",
                              cursor: "not-allowed",
                          }
                        : {}
                }
            >
                {value == "SingUp" ? "Sing up" : "Log in"}
                <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            {value !== "SingUp" ? (
                <Link href={"/singup"} as={"singup"}>
                    <p className="cursor-pointer p-4 text-center text-blue-500">
                        Don&#39;t have an account?
                    </p>
                </Link>
            ) : (
                <Link href={"/login"} as={"login"}>
                    <p className="cursor-pointer p-4 text-center text-blue-500">
                        Have an account? Log in
                    </p>
                </Link>
            )}
        </div>
    );
}
