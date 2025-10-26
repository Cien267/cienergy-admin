import { Header } from "@/components/Header"
import { StatCard } from "@/components/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { salesData, productSalesData, stats } from "@/lib/mockData"
import { DollarSign, ShoppingCart, TrendingUp, Activity } from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { motion } from "framer-motion"

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
]

export default function Analytics() {
  return (
    <div className="min-h-screen">
      <Header title="Thống kê" />

      <main className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Tổng doanh thu"
            value={`${stats.totalRevenue.toLocaleString("vi-VN")} ₫`}
            icon={DollarSign}
            description="Tháng này"
            index={0}
          />
          <StatCard
            title="Tổng đơn hàng"
            value={stats.totalOrders}
            icon={ShoppingCart}
            description="Tháng này"
            index={1}
          />
          <StatCard
            title="Giá trị trung bình"
            value={`${stats.averageOrderValue.toLocaleString("vi-VN")} ₫`}
            icon={TrendingUp}
            description="Của mỗi đơn hàng"
            index={2}
          />
          <StatCard
            title="Khách hàng"
            value={stats.activeUsers}
            icon={Activity}
            description="Đang hoạt động"
            index={3}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Đơn hàng hằng ngày</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
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
                    <Bar
                      dataKey="orders"
                      fill="hsl(var(--primary))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Đố uống đắt hàng nhất</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productSalesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="hsl(var(--primary))"
                      dataKey="value"
                    >
                      {productSalesData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Tổng quan doanh thu</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
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
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="hsl(var(--secondary))"
                    radius={[8, 8, 0, 0]}
                    name="Revenue (₫)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
