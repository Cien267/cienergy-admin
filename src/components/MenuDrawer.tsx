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

export interface MenuItem {
  id: string
  name: string
  price: number
  image: string
}

interface MenuDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: MenuItem | null
  onSave: (item: MenuItem) => void
  mode: "view" | "edit" | "create"
}

export function MenuDrawer({
  open,
  onOpenChange,
  item,
  onSave,
  mode,
}: MenuDrawerProps) {
  const [formData, setFormData] = useState<MenuItem>({
    id: "",
    name: "",
    price: 0,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
  })

  useEffect(() => {
    if (item && mode !== "create") {
      setFormData(item)
    } else if (mode === "create") {
      setFormData({
        id: `MENU${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        name: "",
        price: 0,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
      })
    }
  }, [item, mode])

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
              ? "Create New Item"
              : mode === "edit"
              ? "Edit Menu Item"
              : "Menu Item Details"}
          </DrawerTitle>
          <DrawerDescription>
            {mode === "create"
              ? "Fill in the menu item information"
              : `Item ID: ${formData.id}`}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 py-6 space-y-4 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isViewMode}
              placeholder="e.g., Cà phê đen"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (₫)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              disabled={isViewMode}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              disabled={isViewMode}
              placeholder="https://..."
            />
          </div>

          {formData.image && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <DrawerFooter>
          {!isViewMode && (
            <Button onClick={handleSave}>
              {mode === "create" ? "Create Item" : "Save Changes"}
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
