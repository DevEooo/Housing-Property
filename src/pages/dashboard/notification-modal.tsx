import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/dashboard ui/ui/dialog.tsx';
import { Badge } from '../../components/dashboard ui/ui/badge.tsx';
import { ScrollArea } from '../../components/dashboard ui/ui/scroll-area.tsx';
import { Bell, Heart, MessageCircle, TrendingUp } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const notifications = [
    {
      id: 1,
      type: 'recommendation',
      icon: TrendingUp,
      title: 'New Property Match',
      message: '3 new properties match your criteria in Downtown',
      time: '2 hours ago',
      isNew: true,
    },
    {
      id: 2,
      type: 'favorite',
      icon: Heart,
      title: 'Price Drop',
      message: 'Modern Loft on 5th Street dropped by $50,000',
      time: '4 hours ago',
      isNew: true,
    },
    {
      id: 3,
      type: 'message',
      icon: MessageCircle,
      title: 'Agent Message',
      message: 'Sarah replied to your inquiry about the penthouse',
      time: '1 day ago',
      isNew: false,
    },
    {
      id: 4,
      type: 'alert',
      icon: Bell,
      title: 'Viewing Reminder',
      message: 'Property viewing scheduled for tomorrow at 2 PM',
      time: '2 days ago',
      isNew: false,
    },
    {
      id: 5,
      type: 'recommendation',
      icon: TrendingUp,
      title: 'Market Update',
      message: 'Average home prices in your area increased by 5%',
      time: '3 days ago',
      isNew: false,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[420px] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-1">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer ${
                    notification.isNew ? 'bg-blue-50/50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent">
                      <IconComponent className="w-4 h-4 text-accent-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground truncate">
                          {notification.title}
                        </p>
                        {notification.isNew && (
                          <Badge variant="secondary" className="px-1.5 py-0.5">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}