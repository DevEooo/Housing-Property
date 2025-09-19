import { Search, Bell } from 'lucide-react';
import { Input } from '../../components/dashboard ui/ui/input.tsx';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/dashboard ui/ui/avatar.tsx';
import { Button } from '../../components/dashboard ui/ui/button.tsx';
import { Badge } from '../../components/dashboard ui/ui/badge.tsx';
import { useState } from 'react';
import { NotificationModal } from './notification-modal.tsx';
import { AvatarDropdown } from './avatar-dropdown.tsx';

export function Header() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center">
          {/* Left side spacer - exactly match right side width */}
          <div className="w-[200px]" />
          
          {/* Center - Search Bar - perfectly centered */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search properties by location, price, or type..."
                  className="pl-10 bg-input-background border-border"
                />
              </div>
              
              {/* Bell Icon */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative p-2"
                  onClick={() => setIsNotificationOpen(true)}
                >
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    3
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right side - User Profile - fixed width to match left spacer */}
          <div className="w-[200px] flex justify-end items-center gap-3">
            <div className="text-right">
              <p className="font-medium">Welcome back,</p>
              <p className="text-muted-foreground">Sarah Johnson</p>
            </div>
            <button 
              onClick={() => setIsAvatarDropdownOpen(true)}
              className="rounded-full hover:ring-2 hover:ring-ring transition-all"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBhdmF0YXJ8ZW58MXx8fHwxNzU3OTU2Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Sarah Johnson" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </header>
      
      <NotificationModal 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
      
      <AvatarDropdown 
        isOpen={isAvatarDropdownOpen} 
        onClose={() => setIsAvatarDropdownOpen(false)} 
      />
    </>
  );
}