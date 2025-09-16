import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Lock, Sparkles, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-card-border shadow-medium">
          <div className="text-center p-6 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl">BrandFlo</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-muted-foreground">
                Sign up to get started with BrandFlo
              </p>
            </div>
          </div>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Create a password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button variant="hero" className="w-full" size="lg">
                Sign Up
              </Button>
            </div>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social login buttons */}
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="w-full">
                <FcGoogle className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                LinkedIn
              </Button>
              <Button variant="outline" className="w-full">
                <Twitter className="w-4 h-4 mr-2 text-sky-500" />
                Twitter
              </Button>
            </div>

            {/* Already have account */}
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}