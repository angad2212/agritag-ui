import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Mail, MapPin, Phone, Video } from "lucide-react";

const Account = () => {
  // Mock user data - replace with Firebase user data
  const userData = {
    name: "John Smith",
    email: "john.smith@example.com",
    farmName: "Smith Family Farm",
    phone: "+1 (555) 123-4567",
    location: "Texas, USA",
    joinDate: "January 2024",
    cattleCount: 6
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">AgriTag</h1>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Video className="h-4 w-4" />
              Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Account Profile</h2>
          <p className="text-muted-foreground">Manage your farm information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview Card */}
          <Card className="lg:col-span-1 bg-card/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl">{userData.name}</CardTitle>
              <CardDescription>{userData.farmName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-card-foreground">{userData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-card-foreground">{userData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-card-foreground">{userData.location}</span>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="text-card-foreground">{userData.joinDate}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Cattle monitored</span>
                  <span className="text-card-foreground font-semibold">{userData.cattleCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal and farm details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input id="farmName" defaultValue={userData.farmName} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={userData.email} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={userData.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={userData.location} />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Save Changes
                  </Button>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </div>
              </form>

              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Account Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Download Data Export
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Account;