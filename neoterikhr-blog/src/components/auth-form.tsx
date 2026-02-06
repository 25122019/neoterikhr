"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export function AuthForm({ mode = "login" }: { mode?: "login" | "register" }) {
  const { t } = useTranslation();
  const { login, register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "login") {
        const res = await login(email, password);
        if (res.success) {
          router.push("/");
        } else {
          setError(res.error || "Login failed");
        }
      } else {
        const res = await register(email, password, name);
        if (res.success) {
          router.push("/login");
        } else {
          setError(res.error || "Registration failed");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto" data-design-id="auth-card">
      <CardHeader data-design-id="auth-header">
        <CardTitle data-design-id="auth-title">{mode === "login" ? t('login') : t('register')}</CardTitle>
        <CardDescription data-design-id="auth-desc">
          {mode === "login" ? "Enter your credentials to access your account" : "Create a new account to join our community"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} data-design-id="auth-form">
        <CardContent className="space-y-4" data-design-id="auth-content">
          {mode === "register" && (
            <div className="space-y-2" data-design-id="name-field">
              <label className="text-sm font-medium">Name</label>
              <Input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your Name"
                required
                data-design-id="input-name"
              />
            </div>
          )}
          <div className="space-y-2" data-design-id="email-field">
            <label className="text-sm font-medium">Email</label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="email@example.com"
              required
              data-design-id="input-email"
            />
          </div>
          <div className="space-y-2" data-design-id="password-field">
            <label className="text-sm font-medium">Password</label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required
              data-design-id="input-password"
            />
          </div>
          {error && <p className="text-sm text-destructive" data-design-id="auth-error">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4" data-design-id="auth-footer">
          <Button type="submit" className="w-full" disabled={isLoading} data-design-id="auth-submit-btn">
            {isLoading ? "Processing..." : (mode === "login" ? t('login') : t('register'))}
          </Button>
          <p className="text-sm text-center text-muted-foreground" data-design-id="auth-switch">
            {mode === "login" ? (
              <>Don't have an account? <Button variant="link" className="p-0 h-auto" onClick={() => router.push("/register")} data-design-id="to-register">Register</Button></>
            ) : (
              <>Already have an account? <Button variant="link" className="p-0 h-auto" onClick={() => router.push("/login")} data-design-id="to-login">Login</Button></>
            )}
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}