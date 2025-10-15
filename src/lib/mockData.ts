// Mock data for the dashboard

export const orders = [
  {
    id: "ORD-001",
    customerName: "Nguyễn Văn A",
    product: "Bạc Sỉu",
    total: 35000,
    status: "completed" as const,
    time: "10:30 AM",
  },
  {
    id: "ORD-002",
    customerName: "Trần Thị B",
    product: "Cà Phê Sữa Đá",
    total: 28000,
    status: "pending" as const,
    time: "10:45 AM",
  },
  {
    id: "ORD-003",
    customerName: "Lê Văn C",
    product: "Cà Phê Đen",
    total: 25000,
    status: "completed" as const,
    time: "11:00 AM",
  },
  {
    id: "ORD-004",
    customerName: "Phạm Thị D",
    product: "Bạc Xỉu",
    total: 32000,
    status: "cancelled" as const,
    time: "11:15 AM",
  },
  {
    id: "ORD-005",
    customerName: "Hoàng Văn E",
    product: "Cà Phê Nâu",
    total: 30000,
    status: "pending" as const,
    time: "11:30 AM",
  },
  {
    id: "ORD-006",
    customerName: "Võ Thị F",
    product: "Cappuccino",
    total: 45000,
    status: "completed" as const,
    time: "11:45 AM",
  },
  {
    id: "ORD-007",
    customerName: "Đặng Văn G",
    product: "Latte",
    total: 42000,
    status: "pending" as const,
    time: "12:00 PM",
  },
  {
    id: "ORD-008",
    customerName: "Bùi Thị H",
    product: "Espresso",
    total: 35000,
    status: "completed" as const,
    time: "12:15 PM",
  },
]

export const users = [
  {
    id: "USR001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0901234567",
    ordersCount: 24,
    status: "active" as const,
  },
  {
    id: "USR002",
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    phone: "0902345678",
    ordersCount: 18,
    status: "active" as const,
  },
  {
    id: "USR003",
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    phone: "0903456789",
    ordersCount: 31,
    status: "active" as const,
  },
  {
    id: "USR004",
    name: "Phạm Thị D",
    email: "phamthid@gmail.com",
    phone: "0904567890",
    ordersCount: 5,
    status: "blocked" as const,
  },
  {
    id: "USR005",
    name: "Hoàng Văn E",
    email: "hoangvane@gmail.com",
    phone: "0905678901",
    ordersCount: 42,
    status: "active" as const,
  },
]

export const menuItems = [
  {
    id: "MENU001",
    name: "Cà Phê Đen",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
  },
  {
    id: "MENU002",
    name: "Cà Phê Sữa Đá",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop",
  },
  {
    id: "MENU003",
    name: "Bạc Sỉu",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
  },
  {
    id: "MENU004",
    name: "Cà Phê Nâu",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
  },
  {
    id: "MENU005",
    name: "Cappuccino",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
  },
  {
    id: "MENU006",
    name: "Latte",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop",
  },
  {
    id: "MENU007",
    name: "Espresso",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop",
  },
  {
    id: "MENU008",
    name: "Americano",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1532004491497-ba35c367d634?w=400&h=300&fit=crop",
  },
]

export const salesData = [
  { name: "Mon", orders: 42, revenue: 1260000 },
  { name: "Tue", orders: 38, revenue: 1140000 },
  { name: "Wed", orders: 51, revenue: 1530000 },
  { name: "Thu", orders: 45, revenue: 1350000 },
  { name: "Fri", orders: 63, revenue: 1890000 },
  { name: "Sat", orders: 78, revenue: 2340000 },
  { name: "Sun", orders: 72, revenue: 2160000 },
]

export const productSalesData = [
  { name: "Bạc Sỉu", value: 45 },
  { name: "Cà Phê Sữa", value: 30 },
  { name: "Cappuccino", value: 15 },
  { name: "Latte", value: 10 },
]

export const stats = {
  totalOrders: 256,
  revenueToday: 480000,
  pendingOrders: 5,
  topProduct: "Bạc Sỉu",
  totalUsers: 1234,
  activeUsers: 1180,
  blockedUsers: 54,
  averageOrderValue: 38500,
  totalRevenue: 9856000,
}
