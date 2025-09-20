import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/dashboard ui/ui/dialog.tsx';
import { Button } from '../../components/dashboard ui/ui/button.tsx';
import { Separator } from '../../components/dashboard ui/ui/separator.tsx';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/dashboard ui/ui/avatar.tsx';
import { User, Settings, LogOut, Edit } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { logout } from '../../../function/models/authService';
import { useNavigate } from 'react-router-dom';

interface AvatarDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AvatarDropdown({ isOpen, onClose }: AvatarDropdownProps) {
  const user = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
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
                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
                <AvatarFallback>{user?.displayName?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-base font-medium">{user?.displayName || 'Guest'}</DialogTitle>
                <p className="text-sm text-muted-foreground">{user?.email || ''}</p>
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
