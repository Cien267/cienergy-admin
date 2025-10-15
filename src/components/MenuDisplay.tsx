import { MenuItem } from "./MenuDrawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface MenuDisplayProps {
  items: MenuItem[]
}

export function MenuDisplay({ items }: MenuDisplayProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Cienergy Menu
          </h1>
          <p className="text-lg text-muted-foreground">
            Handcrafted Coffee & Beverages
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">
                    {item.price.toLocaleString("vi-VN")} ₫
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No menu items available yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
