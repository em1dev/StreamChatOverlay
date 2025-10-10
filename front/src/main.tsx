import '@fontsource/poppins/300.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins';
import '@fontsource-variable/caveat';
import '@fontsource/itim';
import '@fontsource/roboto';
import '@fontsource/josefin-sans';
import '@fontsource/montserrat';
import '@fontsource/pacifico';
import '@fontsource/permanent-marker';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
