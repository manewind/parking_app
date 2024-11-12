// pages/login.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();

  // Состояние для формы
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Логика для отправки данных на сервер
    console.log('Авторизация', { email, password });

    // Пример редиректа после успешного входа
    router.push('/');
  };

  return (
    <div className="container max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Вход</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Войти
        </button>
      </form>

      <p className="mt-4 text-center">
        Нет аккаунта?{' '}
        <a
          href="/register"
          className="text-blue-500"
        >
          Зарегистрируйтесь
        </a>
      </p>
    </div>
  );
};

export default Login;
