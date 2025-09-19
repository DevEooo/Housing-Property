import { Card, CardContent } from '../../components/dashboard ui/ui/card.tsx';
import { Building, Heart, TrendingUp } from 'lucide-react';

export function StatsCards() {
  const stats = [
    {
      title: 'Total Properties',
      value: '2,847',
      icon: Building,
      change: '+12% from last month',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Saved Favorites',
      value: '24',
      icon: Heart,
      change: '6 new this week',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: 'New Listings Today',
      value: '18',
      icon: TrendingUp,
      change: '+3 from yesterday',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.title} className="border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}