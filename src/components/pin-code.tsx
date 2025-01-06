import React, { useRef } from 'react';

interface PinCodeProps {
  length: number;
  onChange: (value: string) => void;
}

export function PinCode({ length = 6, onChange }: PinCodeProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  function handleChange(value: string, index: number) {
    if (value.length > 1) {
      value = value.slice(-1); // Limita o valor a um dígito
    }

    if (inputsRef.current[index]) {
      inputsRef.current[index]!.value = value; // Atualiza o valor no campo
    }

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus(); // Move para o próximo input
    }

    const pinCode = inputsRef.current.map(input => input?.value || '').join('');
    if (onChange) onChange(pinCode);
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === 'Backspace' && !inputsRef.current[index]?.value && index > 0) {
      inputsRef.current[index - 1]?.focus(); // Move para o campo anterior
    }
  };

  return (
    <div className="flex gap-4">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="w-12 h-12 border border-zinc-600 rounded-md bg-transparent text-center text-zinc-200 text-xl focus:outline-none focus:ring-2 focus:ring-zinc-700"
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>
  );
};
