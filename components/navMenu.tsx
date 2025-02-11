"use client";
import { useState, useEffect } from 'react';
import { Home, LayoutDashboard, Trophy, User, LogIn } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

// Mock useAuth hook for demonstration purposes
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser({
        name: "John Doe",
        picture: "https://github.com/nutlope.png",
        role: "Admin"
      });
      setLoading(false);
    }, 1000);
  }, []);

  return { user, isAuthenticated: !!user, loading };
};

const NavMenu = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div className="animate-pulse h-10 w-10 bg-gray-200 rounded-full" />;

  return (
    <nav className="p-4 flex justify-between items-center bg-white shadow-md">
      <div className="flex items-center space-x-8">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          <p className="text-gray-700 font-medium">Training Score Management</p>
        </div>
        <Link href="/">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            <p className="text-gray-700 font-medium">Home</p>
          </div>
        </Link>
        <Link href="/dashboard">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" />
            <p className="text-gray-700 font-medium">Dashboard</p>
          </div>
        </Link>
      </div>
      {isAuthenticated && user ? (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-700">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      ) : (
        <Link href="/login">
          <Button variant="outline">
            <LogIn className="mr-2 h-4 w-4" />
            Sign in
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default NavMenu;