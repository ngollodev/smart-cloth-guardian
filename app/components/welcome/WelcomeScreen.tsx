import { Button } from "app/components/ui/Button";
import { Avatar, AvatarFallback } from "app/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "app/components/ui/tabs";
import { useAuth } from "app/hooks/use-auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <span className="text-2xl font-bold">CG</span>
          </div>
          <h1 className="text-3xl font-bold">Smart Cloth Guardian</h1>
          <p className="text-muted-foreground">Your intelligent clothesline protection system</p>
        </div>
        
        {isAuthenticated && user ? (
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-lg font-medium">Welcome back,</p>
                <p className="text-2xl font-bold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button className="w-full" onClick={handleContinue}>
              Continue to Dashboard
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-4">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register" className="mt-4">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
