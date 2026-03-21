import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './reset.css'
import './index.css'
import '@vkontakte/vkui/dist/vkui.css';

import App from './app/App.tsx'
import { AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <AppRoot>
        <HashRouter>
          <App />
        </HashRouter>
      </AppRoot>
    </ConfigProvider>
  </StrictMode>,
)
