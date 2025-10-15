import { Header } from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OrderDrawer, type Order } from "@/components/OrderDrawer"
import { orders as initialOrders } from "@/lib/mockData"
import { Search, Eye, Edit, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useState } from "react"

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [drawerMode, setDrawerMode] = useState<"view" | "edit" | "create">(
    "view"
  )

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleView = (order: Order) => {
    setSelectedOrder(order)
    setDrawerMode("view")
    setDrawerOpen(true)
  }

  const handleEdit = (order: Order) => {
    setSelectedOrder(order)
    setDrawerMode("edit")
    setDrawerOpen(true)
  }

  const handleCreate = () => {
    setSelectedOrder(null)
    setDrawerMode("create")
    setDrawerOpen(true)
  }

  const handleSave = (order: Order) => {
    if (drawerMode === "create") {
      setOrders([...orders, order])
      toast.success("Order created successfully")
    } else if (drawerMode === "edit") {
      setOrders(orders.map((o) => (o.id === order.id ? order : o)))
      toast.success("Order updated successfully")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success hover:bg-success/20"
      case "pending":
        return "bg-warning/10 text-warning hover:bg-warning/20"
      case "cancelled":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="min-h-screen">
      <Header title="Orders" />

      <main className="p-4 md:p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Order Management</CardTitle>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by customer or order ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="gap-2" onClick={handleCreate}>
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Order</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px]">Order ID</TableHead>
                      <TableHead className="min-w-[120px]">Customer</TableHead>
                      <TableHead className="min-w-[120px]">Product</TableHead>
                      <TableHead className="min-w-[100px]">Total</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[120px]">Time</TableHead>
                      <TableHead className="text-right min-w-[150px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>
                          {order.total.toLocaleString("vi-VN")} ₫
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {order.time}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleView(order)}
                            >
                              <Eye className="h-4 w-4 sm:mr-1" />
                              <span className="hidden sm:inline">View</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(order)}
                            >
                              <Edit className="h-4 w-4 sm:mr-1" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Mock */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredOrders.length} of {orders.length} orders
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <OrderDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        order={selectedOrder}
        onSave={handleSave}
        mode={drawerMode}
      />
    </div>
  )
}
