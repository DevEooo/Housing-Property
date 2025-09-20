import { Home, Building, Heart, Settings } from 'lucide-react';
import { Button } from '../../components/dashboard ui/ui/button.tsx';
import { useNavigation } from './navigation-context.tsx';

export function Sidebar() {
  const { currentPage, setCurrentPage } = useNavigation();

  const navigationItems = [
    { name: 'Dashboard', icon: Home, page: 'dashboard' as const },
    { name: 'My Properties', icon: Building, page: 'properties' as const },
    { name: 'Favorites', icon: Heart, page: 'favorites' as const },
    { name: 'Firebase Test', icon: Settings, page: 'test' as const },
  ];

  return (
    <div className="w-64 bg-white border-r border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-medium text-primary">PropertyHub</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.page;
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
              onClick={() => setCurrentPage(item.page)}
            >
              <IconComponent className="w-4 h-4" />
              {item.name}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}