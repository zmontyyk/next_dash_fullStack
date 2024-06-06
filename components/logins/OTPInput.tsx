import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface OTPInputProps {
  length?: number;

}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6 }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus on the next input
    if (element.nextElementSibling) {
      (element.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyUp = (element: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (element.key === 'Backspace' && element.currentTarget.previousElementSibling) {
      (element.currentTarget.previousElementSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-5">
      {otp.map((data, index) => (
        <input
          className="w-10 h-10 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          name="otp"
          maxLength={1}
          key={index}
          value={data}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleKeyUp(e, index)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
