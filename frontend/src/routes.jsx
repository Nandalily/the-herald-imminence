import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TopicsPage from './pages/TopicsPage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import ReadingHistory from './pages/ReadingHistory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'topics',
        element: <TopicsPage />,
      },
      {
        path: 'articles',
        element: <ArticlePage />,
      },
      {
        path: 'articles/:id',
        element: <ArticlePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'reading-history',
        element: <ReadingHistory />,
      },
    ],
  },
]);
