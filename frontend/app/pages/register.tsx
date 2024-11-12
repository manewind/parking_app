// pages/register.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    router.push('/login');
  };

  return (
    <div className="container max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4 text-center">Регистрация</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">Имя</label>
          <input
            id="name"
            type="text"
            placeholder="Введите ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold">Пароль</label>
          <input
            id="password"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold">Подтверждение пароля</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Зарегистрироваться
        </button>
      </form>

      <p className="mt-4 text-center">
        Уже есть аккаунт?{' '}
        <a
          href="/login"
          className="text-blue-500"
        >
          Войдите
        </a>
      </p>
    </div>
  );
};

export default Register;
