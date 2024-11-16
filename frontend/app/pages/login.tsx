import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const router = useRouter();

  // Состояние для формы
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password: password,
      });

      // Если логин успешен, сохраняем токен и перенаправляем
      localStorage.setItem('token', response.data.token);
      router.push('/');  // Перенаправление на главную
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Не удалось авторизоваться');
      } else {
        setError('Произошла ошибка при авторизации');
      }
      console.error('Ошибка при авторизации:', err);
    }
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
            className="w-full p-2 border border-gray-300 rounded text-black"
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
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Войти
        </button>
      </form>

      <p className="mt-4 text-center">
        Нет аккаунта?{' '}
        <a href="/register" className="text-blue-500">
          Зарегистрируйтесь
        </a>
      </p>
    </div>
  );
};

export default Login;
