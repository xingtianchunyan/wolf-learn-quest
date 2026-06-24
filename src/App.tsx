import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/layout/LanguageSwitcher';
import { PermissionProvider } from './contexts/PermissionContext';
import Index from './pages/Index';
import GameLobby from './pages/GameLobby';
import GameRoom from './pages/GameRoom';
import GamePage from './pages/GamePage';
import JudgePage from './pages/JudgePage';
import AdminUsersPage from './pages/AdminUsersPage';
import NotFound from './pages/NotFound';
import { AuthProvider } from '@/providers/AuthProvider';

// 文件级注释：React Query 全局客户端配置（重试/缓存/错误处理）
// 注意：可以根据需要将 onError 接入全局 toast
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 减少重试次数，避免抖动
      staleTime: 60_000, // 1 分钟内数据视为新鲜
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0, // 变更默认不重试，交由 UI 处理
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Index />} />
              <Route path='/lobby' element={<GameLobby />} />
              <Route
                path='/room/:id'
                element={
                  <PermissionProvider>
                    <GameRoom />
                  </PermissionProvider>
                }
              />
              <Route
                path='/room/:id/game'
                element={
                  <PermissionProvider>
                    <GamePage />
                  </PermissionProvider>
                }
              />
              <Route
                path='/room/:id/judge'
                element={
                  <PermissionProvider>
                    <JudgePage />
                  </PermissionProvider>
                }
              />
              <Route path='/admin/users' element={<AdminUsersPage />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
