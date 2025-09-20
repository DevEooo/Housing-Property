import { Sidebar } from './pages/dashboard/sidebar';
import { Header } from './pages/dashboard/header';
import { Dashboard } from './pages/dashboard/dashboard';
import { MyProperties } from './pages/dashboard/my-properties';
import { Favorites } from './pages/dashboard/favorites';
import { FirebaseTest } from './pages/dashboard/firebase-test';
import { NavigationProvider, useNavigation } from './pages/dashboard/navigation-context';
import { UserProvider } from './contexts/UserContext';

function AppContent() {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <MyProperties />;
      case 'favorites':
        return <Favorites />;
      case 'test':
        return <FirebaseTest />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </UserProvider>
  );
}
