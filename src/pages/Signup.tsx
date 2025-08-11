import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [farmName, setFarmName] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - in real app, create account with Firebase
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Demo Button */}
        <div className="flex justify-center">
          <Button variant="outline" size="sm" className="gap-2">
            <Video className="h-4 w-4" />
            Demo
          </Button>
        </div>

        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-primary mb-2">
              AgriTag
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Join thousands of smart farmers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input
                  id="farmName"
                  type="text"
                  placeholder="Smith Family Farm"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
            <div className="text-center">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;