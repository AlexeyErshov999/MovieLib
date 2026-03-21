import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './reset.css'
import './index.css'
import '@vkontakte/vkui/dist/vkui.css';

import App from './App.tsx'
import { AppRoot, ConfigProvider } from '@vkontakte/vkui';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <AppRoot>
        <App />
      </AppRoot>
    </ConfigProvider>
  </StrictMode>,
)
