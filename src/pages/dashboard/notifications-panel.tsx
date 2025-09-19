import { Card, CardContent, CardHeader, CardTitle } from '../../components/dashboard ui/ui/card.tsx';
import { Badge } from '../../components/dashboard ui/ui/badge.tsx';
import { Bell, Heart, MessageCircle, TrendingUp } from 'lucide-react';

export function NotificationsPanel() {
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
  ];

  return (
    <Card className="w-80 border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="space-y-1">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-4 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors cursor-pointer ${
                  notification.isNew ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent">
                    <IconComponent className="w-4 h-4 text-accent-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {notification.title}
                      </p>
                      {notification.isNew && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}