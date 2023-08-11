import ReactDOM from 'react-dom/client';
import NProgress from 'nprogress';
import App from './App';

import 'nprogress/nprogress.css';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  parent: '#root',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);

root.render(<App />);
