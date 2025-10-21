import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="max-w-md mx-auto text-center px-6">
          <div className="text-6xl font-bold text-muted-foreground mb-4">404</div>
          <h1 className="text-3xl font-serif font-normal mb-4">Page not found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Go home
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;