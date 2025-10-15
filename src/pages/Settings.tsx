import { useState } from "react"
import { Header } from "@/components/Header"
import { ChangePasswordDialog } from "@/components/ChangePasswordDialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function Settings() {
  const [formData, setFormData] = useState({
    businessName: "Cienergy Coffee",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    phone: "0901234567",
    email: "contact@cienergy.vn",
    openingHours: "7:00 AM - 10:00 PM",
  })
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    toast.success("Settings saved successfully!")
  }

  return (
    <div className="min-h-screen">
      <Header title="Settings" />

      <main className="p-4 md:p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-sm max-w-2xl">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your coffee shop details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              {/* Contact Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Opening Hours */}
              <div className="space-y-2">
                <Label htmlFor="openingHours">Opening Hours</Label>
                <Input
                  id="openingHours"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleChange}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button onClick={handleSave} className="w-full md:w-auto">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPasswordDialogOpen(true)}
                  className="w-full md:w-auto"
                >
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <ChangePasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
      />
    </div>
  )
}
