import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const suggestions = [
  { to: '/tabata', label: 'Tabata timer' },
  { to: '/hiit', label: 'HIIT timer' },
  { to: '/pomodoro', label: 'Pomodoro timer' },
  { to: '/deep-work', label: 'Deep work timer' },
  { to: '/timer', label: 'Generic timer' },
];

const NotFound = () => {
  const location = useLocation();
  useEffect(() => { console.error("404:", location.pathname); }, [location.pathname]);
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Stint</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-[80vh] flex items-center justify-center px-6 font-aspekta">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-light mb-4 text-foreground">404</h1>
          <p className="text-lg text-foreground/60 mb-8">This page does not exist. Try one of these:</p>
          <ul className="flex flex-wrap gap-2 justify-center mb-8">
            {suggestions.map(s => (
              <li key={s.to}>
                <Link to={s.to} className="inline-block px-3 py-1.5 rounded-full border border-[#E8E8E8] dark:border-[#262626] text-sm hover:bg-[#F0F0F0] dark:hover:bg-[#1A1A1A] transition-colors">{s.label}</Link>
              </li>
            ))}
          </ul>
          <Link to="/" className="underline text-foreground/70 hover:text-foreground">Return home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
