
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/layout/LanguageSwitcher";
import { PermissionProvider } from "./contexts/PermissionContext";
import Index from "./pages/Index";
import GameLobby from "./pages/GameLobby";
import GameRoom from "./pages/GameRoom";
import GamePage from "./pages/GamePage";
import JudgePage from "./pages/JudgePage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from '@/providers/AuthProvider';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lobby" element={<GameLobby />} />
              <Route path="/room/:id" element={
                <PermissionProvider>
                  <GameRoom />
                </PermissionProvider>
              } />
              <Route path="/room/:id/game" element={
                <PermissionProvider>
                  <GamePage />
                </PermissionProvider>
              } />
              <Route path="/room/:id/judge" element={
                <PermissionProvider>
                  <JudgePage />
                </PermissionProvider>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
