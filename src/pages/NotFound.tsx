
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg width="240" height="240" viewBox="0 0 24 24" className="text-primary">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                />
              </svg>
            </div>
            <div className="relative z-10">
              <h1 className="text-7xl font-bold gradient-text mb-2">404</h1>
              <div className="h-1 w-16 bg-primary mx-auto my-4 rounded"></div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button onClick={() => window.history.back()} variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Go Back
            </Button>
            <Button onClick={() => window.location.href = "/"} className="gap-2">
              <Home size={16} />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
