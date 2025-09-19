import { StatsCards } from './stats-cards';
import { PropertyGrid } from './property-grid';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your properties and discover new opportunities</p>
      </div>
      
      {/* Stats Cards */}
      <StatsCards />
      
      {/* Property Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Properties</h2>
          <button className="text-primary hover:text-primary/80 transition-colors">
            View all properties →
          </button>
        </div>
        <PropertyGrid />
      </div>
    </div>
  );
}