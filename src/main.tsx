// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route } from 'react-router-dom'

import './reset.css'
import './index.css'
import '@vkontakte/vkui/dist/vkui.css';

import { App } from './app/App.tsx'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { HashRouter } from 'react-router-dom';
import { ROUTES } from './constants/routes.ts';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ConfigProvider>
      <AppRoot>
        <HashRouter>
          <Routes>
            <Route path={ROUTES.MOVIE} element={<MovieDetailPage />} />
            <Route path="/*" element={<App />} />
          </Routes>
        </HashRouter>
      </AppRoot>
    </ConfigProvider>
  // </StrictMode>,
)
