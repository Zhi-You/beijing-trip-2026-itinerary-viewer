import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BoardProvider } from './context/BoardContext';
import { PrefsProvider } from './context/PrefsContext';
import { getItinerary } from './data/itinerary';
import { HomePage } from './pages/HomePage';
import { DayFocusPage } from './pages/DayFocusPage';
import { TicketsPage } from './pages/TicketsPage';

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

function HashScroller() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace(/^#/, '');
      if (!id) return;
      document.getElementById(id)?.scrollIntoView();
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [pathname]);

  return null;
}

function App() {
  const { i18n } = useTranslation();
  const itinerary = getItinerary(i18n.language);

  return (
    <PrefsProvider>
      <BoardProvider days={itinerary.days}>
        <BrowserRouter basename={routerBasename}>
          <HashScroller />
          <Routes>
            <Route path="/" element={<HomePage itinerary={itinerary} />} />
            <Route path="/day/:dayId" element={<DayFocusPage days={itinerary.days} />} />
            <Route path="/day" element={<DayFocusPage days={itinerary.days} />} />
            <Route path="/tickets" element={<TicketsPage />} />
          </Routes>
        </BrowserRouter>
      </BoardProvider>
    </PrefsProvider>
  );
}

export default App;
