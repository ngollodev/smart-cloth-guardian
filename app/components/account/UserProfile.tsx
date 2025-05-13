import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "app/components/ui/card";
import { Label } from "app/components/ui/label";
import { useAuth } from "app/hooks/use-auth";
import { User as UserType } from "app/services/auth-service";
import { Bell, Key, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserProfile() {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserType>>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
      });
      
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!validImageTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, GIF, WEBP)");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.error("Image must be less than 5MB");
      return;
    }
    
    // Set file for upload
    setNewAvatar(file);
    
    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSave = () => {
    // Validate inputs
    if (!formData.name?.trim() || !formData.email?.trim()) {
      toast.error("Name and email are required");
      return;
    }
    
    try {
      // Create update data
      const updateData: Partial<UserType> = {
        ...formData
      };
      
      // Add avatar if updated
      if (avatarPreview !== user?.avatar) {
        updateData.avatar = avatarPreview || undefined;
      }
      
      // Update user profile
      updateProfile(updateData);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  
  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                {(user.avatar || avatarPreview) ? (
                  <AvatarImage src={avatarPreview || user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback className="text-xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                )}
              </Avatar>
              
              {isEditing && (
                <label 
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-primary/90"
                  title="Change profile picture"
                >
                  +
                  <input 
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            <div className="flex-1">
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              {user.phone && <CardDescription>Phone: {user.phone}</CardDescription>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address (Optional)</Label>
                <Input 
                  id="address" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {user.phone && (
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p>{user.phone}</p>
                </div>
              )}
              
              {user.address && (
                <div>
                  <Label className="text-muted-foreground">Address</Label>
                  <p>{user.address}</p>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
        {isEditing && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => {
              setIsEditing(false);
              // Reset form data and avatar preview
              setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || "",
                address: user.address || "",
              });
              setAvatarPreview(user.avatar || null);
              setNewAvatar(null);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        )}
      </Card>
      
      <div className="space-y-4">
        <Button variant="outline" className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <Key className="mr-2 h-5 w-5" />
            <span>Change Password</span>
          </div>
          <span>→</span>
        </Button>
        
        <Button variant="outline" className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            <span>Notification Settings</span>
          </div>
          <span>→</span>
        </Button>
        
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
