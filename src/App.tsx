
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/layout/LanguageSwitcher";
import Index from "./pages/Index";
import GameLobby from "./pages/GameLobby";
import GameRoom from "./pages/GameRoom";
import GamePage from "./pages/GamePage";
import JudgePage from "./pages/JudgePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lobby" element={<GameLobby />} />
            <Route path="/room/:roomId" element={<GameRoom />} />
            <Route path="/room" element={<GameRoom />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/judge" element={<JudgePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
