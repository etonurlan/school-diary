import { useState } from 'react';
import { useLoginMutation } from '../app/services/auth';
import { useDispatch } from 'react-redux';
import { setTokens } from '../app/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [login, { isLoading, isError }] = useLoginMutation();
    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        if (!email) {
            newErrors.email = 'Введите email';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Введите корректный email';
        }

        if (!password) {
            newErrors.password = 'Введите пароль';
        } else if (!passwordRegex.test(password)) {
            newErrors.password =
                'Пароль должен быть не менее 8 символов, содержать одну заглавную букву, одну строчную букву и одну цифру';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
          const response = await login({ email, password }).unwrap();
          dispatch(setTokens({...response, email}));
          navigate('/')
        } catch (error) {
          console.error('Login failed', error);
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
                    errors.password ? 'border-red-500' : 'border-gray-300 mb-4'
                }`}
                type='password'
                placeholder='Введите пароль'
                onChange={(event) => setPassword(event.target.value)}
            />
            {errors.password && <p className='text-red-500 text-[14px] mt-1'>{errors.password}</p>}

            <button
                className='bg-blue-400 px-4 py-2 rounded-lg text-[18px]'
                onClick={handleLogin}
                disabled={isLoading}
            >
                Войти
            </button>
            <Link to='/register' className='mt-4 text-blue-500 underline'>
                Регистрация
            </Link>
            {isError && (
                <p className='text-red-500 text-[18px] mt-2'>Неверные данные</p>
            )}
        </div>
    );
};