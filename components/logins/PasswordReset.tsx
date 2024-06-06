"use clinet"
import React, { useState } from 'react';
import RenderInputSvg from '../RenderInputSvg';
import { KeyIcon } from '@heroicons/react/24/outline';

function PasswordReset() {
    const [showPassword, setShowPassword] = useState({
        passowrd: false,
        rePassword: false,
    });
    return (
        <div className="w-full">
            <div>
                <label
                   
                    htmlFor="password"
                >
                    
                </label>
                <div className="relative">
                    <div
                        onClick={(e) => {
                            e.stopPropagation(),
                                setShowPassword((prevState) => ({
                                    ...prevState,
                                    passowrd: !prevState.passowrd,
                                }));
                        }}
                        style={{
                            position: 'absolute',
                            left: '90%',
                            top: ' 10px',
                            cursor: 'pointer',
                        }}
                    >
                        <RenderInputSvg isHidden={showPassword.passowrd} />
                    </div>

                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="password"
                        type={showPassword.passowrd ? 'text' : 'password'}
                        name="password"
                        placeholder="enter password"
                        required
                        minLength={6}
                    />

                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
            <div className="mt-4">
                <label
                    htmlFor="rePassword"
                >
                   
                </label>
                <div className="relative">
                    <div
                        onClick={(e) => {
                            e.stopPropagation(),
                                setShowPassword((prevState) => ({
                                    ...prevState,
                                    rePassword: !prevState.rePassword,
                                }));
                        }}
                        style={{
                            position: 'absolute',
                            left: '90%',
                            top: ' 10px',
                            cursor: 'pointer',
                        }}
                    >
                        <RenderInputSvg isHidden={showPassword.rePassword} />
                    </div>

                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="rePassword"
                        type={showPassword.rePassword ? 'text' : 'password'}
                        name="rePassword"
                        placeholder="Renter password"
                        required
                        minLength={6}
                    />

                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
