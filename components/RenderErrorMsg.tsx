import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React from 'react';

function RenderErrorMsg({
    error,
    success,
}: {
    error: string | null;
    success: string | null;
}) {
    return (
        <div className="flex h-8 items-end space-x-1">
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {(error || success) && (
                    <>
                        <ExclamationCircleIcon
                            className={clsx({
                                'h-5 w-5 text-green-500': success?.length,
                                'h-5 w-5 text-red-500': error?.length,
                            })}
                        />
                        <p
                            className={clsx({
                                'text-sm text-green-500': success?.length,
                                'text-sm text-red-500': error?.length,
                            })}
                        >
                            {error || success}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default RenderErrorMsg;
