import { useState } from 'react';
import { useRegisterMutation } from '../app/services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '../utils/phoneUtils';

export const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tel, setTel] = useState('');
  const [role, setRole] = useState('ROLE_STUDENT');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [register, { isLoading, isError }] = useRegisterMutation();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName || firstName.length < 2) {
      newErrors.firstName = 'Имя должно быть не менее 2 символов';
    }

    if (!lastName || lastName.length < 2) {
      newErrors.lastName = 'Фамилия должна быть не менее 2 символов';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Введите корректный email';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      newErrors.password =
        'Пароль должен быть не менее 8 символов, содержать одну заглавную букву, одну строчную букву и одну цифру';
    }

    if (!tel || tel.length < 10) {
      newErrors.tel = 'Введите корректный номер телефона';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
        await register({ firstName, lastName, email, password, phoneNumber: tel, role }).unwrap();
        navigate('/verify-registration', { state: { email } }); 
    } catch (error) {
        console.error('Registration failed', error);
    }
  };
  const handlePhoneChange = (newValue: string) => {
    const formattedValue = formatPhoneNumber(newValue);
    setTel(formattedValue);
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <input
        className={`px-4 py-2 border rounded-lg text-[18px] mb-2 ${
          errors.firstName ? 'border-red-500' : 'border-gray-300'
        }`}
        type="text"
        placeholder="Введите имя"
        onChange={(event) => setFirstName(event.target.value)}
      />
      {errors.firstName && <p className="text-red-500 text-[14px] mt-1">{errors.firstName}</p>}

      <input
        className={`px-4 py-2 border rounded-lg text-[18px] mb-2 ${
          errors.lastName ? 'border-red-500' : 'border-gray-300'
        }`}
        type="text"
        placeholder="Введите фамилию"
        onChange={(event) => setLastName(event.target.value)}
      />
      {errors.lastName && <p className="text-red-500 text-[14px] mt-1">{errors.lastName}</p>}

      <input
        className={`px-4 py-2 border rounded-lg text-[18px] mb-2 ${
          errors.email ? 'border-red-500' : 'border-gray-300'
        }`}
        type="email"
        placeholder="Введите email"
        onChange={(event) => setEmail(event.target.value)}
      />
      {errors.email && <p className="text-red-500 text-[14px] mt-1">{errors.email}</p>}

      <input
        className={`px-4 py-2 border rounded-lg text-[18px] mb-2 ${
          errors.password ? 'border-red-500' : 'border-gray-300'
        }`}
        type="password"
        placeholder="Введите пароль"
        onChange={(event) => setPassword(event.target.value)}
      />
      {errors.password && <p className="text-red-500 text-[14px] mt-1">{errors.password}</p>}

      <input
        className={`px-4 py-2 border rounded-lg text-[18px] mb-2 ${
          errors.tel ? 'border-red-500' : 'border-gray-300'
        }`}
        type="tel"
        placeholder="Введите номер телефона"
        value={tel}
        onChange={(event) => handlePhoneChange(event.target.value)}
      />
      {errors.tel && <p className="text-red-500 text-[14px] mt-1">{errors.tel}</p>}

      <select
        className="px-4 py-2 border rounded-lg text-[18px] mb-4"
        value={role}
        onChange={(event) => setRole(event.target.value)}
      >
        <option value="ROLE_STUDENT">Ученик</option>
        <option value="ROLE_TEACHER">Учитель</option>
      </select>

      <button
        className="bg-blue-400 px-4 py-2 rounded-lg text-[18px]"
        onClick={handleRegister}
        disabled={isLoading}
      >
        Зарегистрироваться
      </button>
      <Link className="mt-4 text-blue-500 underline" to="/login">
        Авторизация
      </Link>
      {isError && (
            <p className='text-red-500 text-[18px] mt-2'>Пользователь уже зарегистрирован</p>
        )}
    </div>
  );
};