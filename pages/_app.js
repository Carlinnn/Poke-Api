import React from 'react';
import Toast from '../components/Toast';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/fade.css';

function MyApp({ Component, pageProps }) {
  // Toast state
  const [toast, setToast] = React.useState({ show: false, message: '', type: 'info' });
  const showToast = (message, type = 'info') => setToast({ show: true, message, type });
  const hideToast = () => setToast({ ...toast, show: false });
  // Dark mode toggle
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const dark = localStorage.getItem('darkMode') === 'true';
    setIsDark(dark);
    if (dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', false);
      setIsDark(false);
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', true);
      setIsDark(true);
    }
  };

  return (
    <>
      <button
        onClick={toggleDarkMode}
        style={{position: 'fixed', top: 16, right: 16, zIndex: 9999}}
        className={isDark ? "btn btn-dark" : "btn btn-light"}
        aria-label="Alternar modo escuro"
      >
        {isDark ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#fff" />
            <path d="M12 2a10 10 0 0 0 0 20c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1 0-16c4.418 0 8 3.582 8 8s-3.582 8-8 8z" fill="#222" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#222" />
            <path d="M12 2a10 10 0 0 0 0 20c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1 0-16c4.418 0 8 3.582 8 8s-3.582 8-8 8z" fill="#fff" />
          </svg>
        )}
      </button>
      <Component {...pageProps} />
      <Toast show={toast.show} message={toast.message} type={toast.type} onClose={hideToast} />
      <Footer />
    </>
  );
}

export default MyApp;