import React from 'react';
import { ConfiguracaoConsumo, Eletrodomestico, FormField } from '../types/types';

interface FormProps {
    fields: FormField[];
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    buttonText?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values?: any;  
}

export function Form({ fields, onSubmit, buttonText = "Submit", onChange, values }: FormProps) {
    return (
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto space-y-6">
            {fields.map((field) => (
                <div key={field.name} className="flex flex-col space-y-2">
                    <label htmlFor={field.name} className="text-gray-700 font-semibold">
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={values ? (values as any)[field.name] ?? '' : ''}
                        onChange={onChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    />
                </div>
            ))}
            <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition duration-300">
                {buttonText}
            </button>
        </form>
    );
}
