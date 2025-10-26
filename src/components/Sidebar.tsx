import { NavLink, useNavigate } from "react-router-dom"
import {
  Home,
  Coffee,
  Users,
  List,
  BarChart3,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "next-themes"
import { useState } from "react"
import { toast } from "sonner"

const navItems = [
  { title: "Trang chủ", path: "/dashboard", icon: Home },
  { title: "Đơn đặt hàng", path: "/orders", icon: Coffee },
  { title: "Khách hàng", path: "/users", icon: Users },
  { title: "Menu", path: "/menu", icon: List },
  { title: "Phân tích", path: "/analytics", icon: BarChart3 },
  { title: "Cài đặt", path: "/settings", icon: Settings },
]

export function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    navigate("/login")
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-border p-6">
        <h1 className="font-special text-xl font-bold bg-gradient-to-r from-cf-darkest via-cf-darker to-cf-medium inline-block text-transparent bg-clip-text">
          Cienergy
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-muted"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Theme Toggle & Logout */}
      <div className="border-t border-border p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:border-r md:border-border md:bg-card md:block">
        <SidebarContent />
      </aside>
    </>
  )
}
