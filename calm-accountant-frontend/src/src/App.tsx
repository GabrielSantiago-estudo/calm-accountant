import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Clientes from "./pages/Clientes";
import Sessoes from "./pages/Sessoes";
import Financeiro from "./pages/Financeiro";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auto-login para preview
    const autoLogin = () => {
      const auth = localStorage.getItem("psifinance_auth");
      if (auth) {
        setIsAuthenticated(true);
      } else {
        // Auto-login automático na preview
        localStorage.setItem("psifinance_auth", "true");
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    autoLogin();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/clientes" element={<ProtectedRoute><Layout><Clientes /></Layout></ProtectedRoute>} />
            <Route path="/sessoes" element={<ProtectedRoute><Layout><Sessoes /></Layout></ProtectedRoute>} />
            <Route path="/financeiro" element={<ProtectedRoute><Layout><Financeiro /></Layout></ProtectedRoute>} />
            <Route path="/relatorios" element={<ProtectedRoute><Layout><Relatorios /></Layout></ProtectedRoute>} />
            <Route path="/configuracoes" element={<ProtectedRoute><Layout><Configuracoes /></Layout></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
