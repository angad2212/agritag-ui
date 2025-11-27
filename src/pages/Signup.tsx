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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Signup attempt started:", { fullName: name, farmName, email });
    
    // Hit the signup API endpoint
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          farmName: farmName,
          email: email,
          password: password,
        }),
      });

      console.log("Response status:", response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Signup API call failed:", response.status, errorData);
        alert(`Signup failed: ${errorData.message || response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      
      // Navigate only after successful API call
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Signup API call error:", error);
      
      // Check for CORS or network errors
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        alert("CORS Error: The server may not be running or CORS is not configured. Check that your backend server is running on http://localhost:3000");
      } else if (error.message) {
        alert(`Connection error: ${error.message}`);
      } else {
        alert("Failed to connect to server. Please ensure the backend server is running on http://localhost:3000");
      }
    }
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