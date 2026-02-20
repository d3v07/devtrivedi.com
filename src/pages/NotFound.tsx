import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="border-2 border-foreground bg-card p-12 hard-shadow text-center max-w-md w-full">
        <p className="font-mono-code text-xs tracking-widest uppercase text-primary mb-4">
          // error_404.tsx
        </p>
        <h1 className="font-display text-8xl mb-4 leading-none">404</h1>
        <p className="font-body text-base text-muted-foreground mb-8 leading-relaxed">
          This page doesn't exist.{" "}
          <span className="font-mono-code text-xs">undefined</span> was not the answer.
        </p>
        <Link
          to="/"
          className="inline-flex items-center font-mono-code text-sm px-6 py-3 border-2 border-foreground bg-foreground text-background neo-btn-primary"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
