import { useState } from 'react';
import { useVerifyMutation } from '../app/services/auth';
import { useDispatch } from 'react-redux';
import { setTokens } from '../app/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const VerifyRegistration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState<{ email?: string; otp?: string }>({});
    const [verify, { isLoading, isError }] = useVerifyMutation();
    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors: { email?: string; otp?: string } = {};
        if (!email) {
            newErrors.email = 'Введите email';
        }
        if (!otp) {
            newErrors.otp = 'Введите код подтверждения';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleVerify = async () => {
        if (!validateForm()) return;

        try {
            const response = await verify({ email, otp }).unwrap();
            dispatch(setTokens({ ...response, email }));
            navigate('/');
        } catch (error) {
            console.error('Verification failed', error);
        }
    };

    return (
        <div className='h-screen flex items-center justify-center flex-col'>
            <input
                className={`px-4 py-2 border rounded-lg text-[18px] ${
                    errors.email ? 'border-red-500' : 'border-gray-300 mb-2'
                }`}
                type='email'
                placeholder='Введите email'
                onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && <p className='text-red-500 text-[14px] mt-1'>{errors.email}</p>}

            <input
                className={`px-4 py-2 border rounded-lg text-[18px] ${
                    errors.otp ? 'border-red-500' : 'border-gray-300 mb-4'
                }`}
                type='text'
                placeholder='Введите код подтверждения'
                onChange={(event) => setOtp(event.target.value)}
            />
            {errors.otp && <p className='text-red-500 text-[14px] mt-1'>{errors.otp}</p>}

            <button
                className='bg-blue-400 px-4 py-2 rounded-lg text-[18px]'
                onClick={handleVerify}
                disabled={isLoading}
            >
                Подтвердить
            </button>
            {isError && (
                <p className='text-red-500 text-[18px] mt-2'>Неверный код</p>
            )}
        </div>
    );
};