import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your API to send the reset link
    console.log("Reset link sent to:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-card-border shadow-medium">
          {!submitted ? (
            <CardContent className="p-6 space-y-6">
              {/* Header Section */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-2xl">BrandFlo</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Forgot Password</h1>
                  <p className="text-muted-foreground">
                    Enter your email address and we’ll send you a reset link.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      required
                    />
                  </div>
                </div>

                <Button variant="hero" className="w-full" size="lg" type="submit">
                  Send Reset Link
                </Button>
              </form>

              {/* Back to Login */}
              <div className="text-center text-sm">
                Remembered your password?{" "}
                <Link to="/" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </CardContent>
          ) : (
            <CardContent className="p-6 space-y-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold">Check your email</h2>
                <p className="text-muted-foreground">
                  We’ve sent a password reset link to <strong>{email}</strong>.
                  Follow the link in your email to reset your password.
                </p>
              </div>

              <Link
                to="/"
                className="inline-block text-primary hover:underline font-medium"
              >
                Back to Login
              </Link>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}