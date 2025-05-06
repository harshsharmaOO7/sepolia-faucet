import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-7xl font-extrabold gradient-text">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => navigate("/")} className="gap-2">
            <Home size={16} />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
