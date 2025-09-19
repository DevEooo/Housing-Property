import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/dashboard ui/ui/dialog.tsx';
import { Button } from '../../components/dashboard ui/ui/button.tsx';
import { Separator } from '../../components/dashboard ui/ui/separator.tsx';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/dashboard ui/ui/avatar.tsx';
import { User, Settings, LogOut, Edit } from 'lucide-react';

interface AvatarDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AvatarDropdown({ isOpen, onClose }: AvatarDropdownProps) {
  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    onClose();
  };

  const handleAccountSettings = () => {
    // Handle account settings navigation
    console.log('Opening account settings...');
    onClose();
  };

  const handleProfile = () => {
    // Handle profile navigation
    console.log('Opening profile...');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[320px] max-w-[90vw] p-0">
        <div className="p-6">
          <DialogHeader className="text-left">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBhdmF0YXJ8ZW58MXx8fHwxNzU3OTU2Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Sarah Johnson" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-base font-medium">Sarah Johnson</DialogTitle>
                <p className="text-sm text-muted-foreground">sarah.johnson@email.com</p>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-3 px-3"
              onClick={handleProfile}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-3 px-3"
              onClick={handleAccountSettings}
            >
              <Settings className="w-4 h-4" />
              <span>Account Settings</span>
            </Button>
            
            <Separator className="my-2" />
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-3 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}