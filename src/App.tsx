import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/contexts/AuthContext"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Sidebar } from "@/components/Sidebar"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Orders from "./pages/Orders"
import Users from "./pages/Users"
import Menu from "./pages/Menu"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="flex min-h-screen w-full">
                      <Sidebar />
                      <div className="flex-1 md:ml-64">
                        <Routes>
                          <Route
                            path="/"
                            element={<Navigate to="/dashboard" replace />}
                          />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/users" element={<Users />} />
                          <Route path="/menu" element={<Menu />} />
                          <Route path="/analytics" element={<Analytics />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App
