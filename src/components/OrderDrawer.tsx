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

export interface Order {
  id: string
  customerName: string
  product: string
  total: number
  status: "pending" | "completed" | "cancelled"
  time: string
}

interface OrderDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
  onSave: (order: Order) => void
  mode: "view" | "edit" | "create"
}

export function OrderDrawer({
  open,
  onOpenChange,
  order,
  onSave,
  mode,
}: OrderDrawerProps) {
  const [formData, setFormData] = useState<Order>({
    id: "",
    customerName: "",
    product: "",
    total: 0,
    status: "pending",
    time: new Date().toLocaleString("vi-VN"),
  })

  useEffect(() => {
    if (order && mode !== "create") {
      setFormData(order)
    } else if (mode === "create") {
      setFormData({
        id: `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        customerName: "",
        product: "",
        total: 0,
        status: "pending",
        time: new Date().toLocaleString("vi-VN"),
      })
    }
  }, [order, mode])

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
              ? "Create New Order"
              : mode === "edit"
              ? "Edit Order"
              : "Order Details"}
          </DrawerTitle>
          <DrawerDescription>
            {mode === "create"
              ? "Fill in the order information"
              : `Order ID: ${formData.id}`}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 py-6 space-y-4 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              disabled={isViewMode}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Input
              id="product"
              value={formData.product}
              onChange={(e) =>
                setFormData({ ...formData, product: e.target.value })
              }
              disabled={isViewMode}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="total">Total (₫)</Label>
            <Input
              id="total"
              type="number"
              value={formData.total}
              onChange={(e) =>
                setFormData({ ...formData, total: Number(e.target.value) })
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
                    formData.status === "completed"
                      ? "bg-success/10 text-success hover:bg-success/20"
                      : formData.status === "pending"
                      ? "bg-warning/10 text-warning hover:bg-warning/20"
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {isViewMode && (
            <div className="space-y-2">
              <Label>Time</Label>
              <p className="text-sm text-muted-foreground">{formData.time}</p>
            </div>
          )}
        </div>

        <DrawerFooter>
          {!isViewMode && (
            <Button onClick={handleSave}>
              {mode === "create" ? "Create Order" : "Save Changes"}
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
