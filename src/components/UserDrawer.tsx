import { useState, useEffect } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  ordersCount: number
  status: "active" | "blocked"
}

interface UserDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onSave: (user: User) => void
  mode: "view" | "edit" | "create"
}

export function UserDrawer({
  open,
  onOpenChange,
  user,
  onSave,
  mode,
}: UserDrawerProps) {
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: "",
    ordersCount: 0,
    status: "active",
  })

  useEffect(() => {
    if (user && mode !== "create") {
      setFormData(user)
    } else if (mode === "create") {
      setFormData({
        id: `USR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        name: "",
        email: "",
        phone: "",
        ordersCount: 0,
        status: "active",
      })
    }
  }, [user, mode])

  const handleSave = () => {
    onSave(formData)
    onOpenChange(false)
  }

  const isViewMode = mode === "view"

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>
            {mode === "create"
              ? "Create New User"
              : mode === "edit"
              ? "Edit User"
              : "User Details"}
          </DrawerTitle>
          <DrawerDescription>
            {mode === "create"
              ? "Fill in the user information"
              : `User ID: ${formData.id}`}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 py-6 space-y-4 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isViewMode}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isViewMode}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={isViewMode}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            {isViewMode ? (
              <div className="pt-2">
                <Badge
                  className={
                    formData.status === "active"
                      ? "bg-success/10 text-success hover:bg-success/20"
                      : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                  }
                >
                  {formData.status}
                </Badge>
              </div>
            ) : (
              <Select
                value={formData.status}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {isViewMode && (
            <div className="space-y-2">
              <Label>Total Orders</Label>
              <p className="text-sm text-muted-foreground">
                {formData.ordersCount}
              </p>
            </div>
          )}
        </div>

        <DrawerFooter>
          {!isViewMode && (
            <Button onClick={handleSave}>
              {mode === "create" ? "Create User" : "Save Changes"}
            </Button>
          )}
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
