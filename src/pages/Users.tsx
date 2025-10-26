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
import { UserDrawer, type User } from "@/components/UserDrawer"
import { users as initialUsers, stats } from "@/lib/mockData"
import {
  Eye,
  Users as UsersIcon,
  UserCheck,
  UserX,
  Edit,
  Plus,
  Search,
} from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { StatCard } from "@/components/StatCard"
import { useState } from "react"

export default function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [drawerMode, setDrawerMode] = useState<"view" | "edit" | "create">(
    "view"
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleView = (user: User) => {
    setSelectedUser(user)
    setDrawerMode("view")
    setDrawerOpen(true)
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setDrawerMode("edit")
    setDrawerOpen(true)
  }

  const handleCreate = () => {
    setSelectedUser(null)
    setDrawerMode("create")
    setDrawerOpen(true)
  }

  const handleSave = (user: User) => {
    if (drawerMode === "create") {
      setUsers([...users, user])
      toast.success("User created successfully")
    } else if (drawerMode === "edit") {
      setUsers(users.map((u) => (u.id === user.id ? user : u)))
      toast.success("User updated successfully")
    }
  }

  return (
    <div className="min-h-screen">
      <Header title="Khách hàng" />

      <main className="p-4 md:p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Tổng khách"
            value={stats.totalUsers}
            icon={UsersIcon}
            index={0}
          />
          <StatCard
            title="Hoạt động"
            value={stats.activeUsers}
            icon={UserCheck}
            index={1}
          />
          <StatCard
            title="Bị chặn"
            value={stats.blockedUsers}
            icon={UserX}
            index={2}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Tìm theo tên hoặc sđt..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button className="gap-2" onClick={handleCreate}>
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Thêm khách hàng</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[120px]">Tên</TableHead>
                      <TableHead className="min-w-[180px]">Địa chỉ</TableHead>
                      <TableHead className="min-w-[120px]">SĐT</TableHead>
                      <TableHead className="min-w-[80px]">Đơn hàng</TableHead>
                      <TableHead className="min-w-[100px]">
                        Trạng thái
                      </TableHead>
                      <TableHead className="text-right min-w-[150px]">
                        Hành động
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.ordersCount}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.status === "active"
                                ? "bg-success/10 text-success hover:bg-success/20"
                                : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleView(user)}
                            >
                              <Eye className="h-4 w-4 sm:mr-1" />
                              <span className="hidden sm:inline">Xem</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(user)}
                            >
                              <Edit className="h-4 w-4 sm:mr-1" />
                              <span className="hidden sm:inline">Sửa</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <UserDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        user={selectedUser}
        onSave={handleSave}
        mode={drawerMode}
      />
    </div>
  )
}
