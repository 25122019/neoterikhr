import { AuthForm } from "@/components/auth-form";
import { Navbar } from "@/components/navbar";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <AuthForm mode="login" />
      </div>
    </main>
  );
}