import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Posts from "./pages/Posts";
import Audience from "./pages/Audience";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            {!isLogin && <AppSidebar />}
            <div className="flex-1 flex flex-col">
              {!isLogin && (
                <header className="h-12 flex items-center border-b bg-background px-4">
                  <SidebarTrigger />
                </header>
              )}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/audience" element={<Audience />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
