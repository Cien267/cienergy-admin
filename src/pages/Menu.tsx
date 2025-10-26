import { Header } from "@/components/Header"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { menuItems } from "@/lib/mockData"
import { Edit, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function Menu() {
  const handleEdit = (itemName: string) => {
    toast.success(`Editing ${itemName}`)
  }

  const handleAddNew = () => {
    toast.success("Add new item clicked")
  }

  return (
    <div className="min-h-screen">
      <Header title="Menu" />

      <main className="p-6 space-y-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Menu</h2>
            <p className="text-muted-foreground mt-1">
              Quản lý menu món của bạn
            </p>
          </div>
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Thêm món mới
          </Button>
        </div>

        {/* Menu Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {item.price.toLocaleString("vi-VN")} ₫
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => handleEdit(item.name)}
                  >
                    <Edit className="h-4 w-4" />
                    Sửa
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
