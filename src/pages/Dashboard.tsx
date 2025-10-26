import { Header } from "@/components/Header"
import { StatCard } from "@/components/StatCard"
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
import { orders, stats, salesData } from "@/lib/mockData"
import { ShoppingCart, DollarSign, Clock, TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { motion } from "framer-motion"

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

export default function Dashboard() {
  const latestOrders = orders.slice(0, 5)

  return (
    <div className="min-h-screen">
      <Header title="Trang chủ" />

      <main className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Số lượng đơn hàng"
            value={stats.totalOrders}
            icon={ShoppingCart}
            description="Toàn thời gian"
            index={0}
          />
          <StatCard
            title="Doanh thu"
            value={`${stats.revenueToday.toLocaleString("vi-VN")} ₫`}
            icon={DollarSign}
            description="Hôm nay"
            index={1}
          />
          <StatCard
            title="Đơn hàng chờ xử lý"
            value={stats.pendingOrders}
            icon={Clock}
            description="Cần xử lý"
            index={2}
          />
          <StatCard
            title="Top sản phẩm"
            value={stats.topProduct}
            icon={TrendingUp}
            description="Bán chạy nhất tuần này"
            index={3}
          />
        </div>

        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Tổng quan</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Latest Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Đơn hàng gần nhất</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Khách</TableHead>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thời gian</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latestOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
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
                      <TableCell className="text-muted-foreground">
                        {order.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
