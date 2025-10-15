import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const MOCK_USER = {
  id: "1",
  name: "Kiên",
  email: "admin@cienergy.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kien",
}

const MOCK_PASSWORD = "admin123"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("cienergy_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call

    if (email === MOCK_USER.email && password === MOCK_PASSWORD) {
      setUser(MOCK_USER)
      localStorage.setItem("cienergy_user", JSON.stringify(MOCK_USER))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("cienergy_user")
  }

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    // Mock password change
    await new Promise((resolve) => setTimeout(resolve, 500))
    return currentPassword === MOCK_PASSWORD && newPassword.length >= 6
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
