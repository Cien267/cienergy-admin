import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">
          {title}
        </h2>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <Avatar className="h-8 w-8 md:h-10 md:w-10 ring-2 ring-primary/10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
