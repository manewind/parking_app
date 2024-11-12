import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';  // Импортируем Bootstrap CSS
import '../styles/globals.css';  // Ваши кастомные стили

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
