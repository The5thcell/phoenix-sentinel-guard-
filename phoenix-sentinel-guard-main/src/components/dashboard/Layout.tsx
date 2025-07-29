
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  BellRing, 
  BarChart3, 
  Settings, 
  Server, 
  Lock, 
  Users, 
  Menu, 
  X, 
  Search, 
  HelpCircle, 
  User, 
  Activity,
  AlertTriangle,
  Info,
  Box,
  LogOut,
  UserPlus,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthForm from '../auth/AuthForm';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, active, badge }) => (
  <li>
    <Link 
      to={href} 
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-accent text-accent-foreground"
      )}
    >
      {icon}
      <span className="ml-2">{text}</span>
      {badge !== undefined && badge > 0 && (
        <Badge variant="destructive" className="ml-auto">{badge}</Badge>
      )}
    </Link>
  </li>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openLoginDialog = () => {
    setAuthMode('login');
    setAuthDialogOpen(true);
  };

  const openSignupDialog = () => {
    setAuthMode('signup');
    setAuthDialogOpen(true);
  };

  // Close sidebar when clicking outside on mobile
  const handleMainClick = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  // Updated alert counts for the navigation
  const alertCount = 15;
  const deviceIssuesCount = 5;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Auth Dialog */}
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{authMode === 'login' ? 'Login to your account' : 'Create an account'}</DialogTitle>
            <DialogDescription>
              {authMode === 'login' 
                ? 'Enter your credentials to access your account' 
                : 'Fill in the information below to create your account'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <AuthForm mode={authMode} onModeChange={setAuthMode} />
          </div>
        </DialogContent>
      </Dialog>

      {/* New Header/Navbar */}
      <header className="bg-phoenix-600 sticky top-0 z-10 border-b border-phoenix-700 shadow-md">
        <div className="flex h-14 sm:h-16 items-center px-2 sm:px-4 md:px-6">
          <div className="flex items-center gap-1 md:gap-6">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-1 md:hidden text-white">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center">
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-white" />
              {/* Removed the Phoenix Shield text */}
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className={cn(
                "px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-phoenix-500 transition-colors", 
                location.pathname === '/' && "bg-phoenix-700"
              )}>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </div>
              </Link>
              
              <Link to="/devices" className={cn(
                "px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-phoenix-500 transition-colors", 
                location.pathname === '/devices' && "bg-phoenix-700"
              )}>
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  <span>Devices</span>
                  {deviceIssuesCount > 0 && <Badge variant="warning" className="ml-1">{deviceIssuesCount}</Badge>}
                </div>
              </Link>
              
              <Link to="/alerts" className={cn(
                "px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-phoenix-500 transition-colors", 
                location.pathname === '/alerts' && "bg-phoenix-700"
              )}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Alerts</span>
                  {alertCount > 0 && <Badge variant="destructive" className="ml-1">{alertCount}</Badge>}
                </div>
              </Link>
              
              <Link to="/security" className={cn(
                "px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-phoenix-500 transition-colors", 
                location.pathname === '/security' && "bg-phoenix-700"
              )}>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </div>
              </Link>
              
              <Link to="/access-control" className={cn(
                "px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-phoenix-500 transition-colors", 
                location.pathname === '/access-control' && "bg-phoenix-700"
              )}>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Access</span>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-1 sm:gap-3">
            <Button variant="ghost" size="icon" className="text-white">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative text-white">
              <BellRing className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-white hidden sm:flex">
              <HelpCircle className="h-5 w-5" />
            </Button>
            
            {/* Authentication Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={openLoginDialog}
                className="text-white hover:bg-phoenix-500"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={openSignupDialog}
                className="bg-transparent border-white text-white hover:bg-phoenix-500 hover:text-white"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </div>
            
            <Menubar className="border-none bg-transparent md:hidden">
              <MenubarMenu>
                <MenubarTrigger className="p-0 focus:bg-transparent data-[state=open]:bg-transparent">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white flex items-center justify-center">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-phoenix-600" />
                  </div>
                </MenubarTrigger>
                <MenubarContent className="mr-2 mt-2">
                  <MenubarItem className="cursor-pointer" onClick={openLoginDialog}>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer" onClick={openSignupDialog}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Sign Up</span>
                  </MenubarItem>
                  <MenubarSeparator />
                  
                  {/* Mobile navigation links */}
                  <MenubarItem asChild>
                    <Link to="/" className={location.pathname === '/' ? "bg-muted" : ""}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </MenubarItem>
                  <MenubarItem asChild>
                    <Link to="/devices" className={location.pathname === '/devices' ? "bg-muted" : ""}>
                      <Server className="mr-2 h-4 w-4" />
                      <span>Devices</span>
                      {deviceIssuesCount > 0 && <Badge variant="warning" className="ml-2">{deviceIssuesCount}</Badge>}
                    </Link>
                  </MenubarItem>
                  <MenubarItem asChild>
                    <Link to="/alerts" className={location.pathname === '/alerts' ? "bg-muted" : ""}>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <span>Alerts</span>
                      {alertCount > 0 && <Badge variant="destructive" className="ml-2">{alertCount}</Badge>}
                    </Link>
                  </MenubarItem>
                  <MenubarItem asChild>
                    <Link to="/security" className={location.pathname === '/security' ? "bg-muted" : ""}>
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Security</span>
                    </Link>
                  </MenubarItem>
                  <MenubarItem asChild>
                    <Link to="/access-control" className={location.pathname === '/access-control' ? "bg-muted" : ""}>
                      <Users className="mr-2 h-4 w-4" />
                      <span>Access</span>
                    </Link>
                  </MenubarItem>
                  <MenubarItem asChild>
                    <Link to="/settings" className={location.pathname === '/settings' ? "bg-muted" : ""}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </MenubarItem>
                  
                  <MenubarSeparator />
                  <MenubarItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Overlay when sidebar is open on mobile */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-sidebar fixed inset-y-0 z-20 flex w-64 flex-col border-r border-border transition-transform md:relative md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="h-14 sm:h-16 flex items-center border-b border-border px-4 sm:px-6">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-phoenix-400 mr-2" />
            <h2 className="font-bold text-sm sm:text-base">Phoenix Shield</h2>
          </div>
          <nav className="flex-1 overflow-y-auto p-3 sm:p-4">
            <ul className="space-y-1 sm:space-y-2">
              <NavItem 
                href="/" 
                icon={<BarChart3 className="mr-2 h-4 w-4" />} 
                text="Dashboard" 
                active={location.pathname === '/'}
              />
              <NavItem 
                href="/devices" 
                icon={<Server className="mr-2 h-4 w-4" />} 
                text="Devices" 
                active={location.pathname === '/devices'}
                badge={deviceIssuesCount}
              />
              <NavItem 
                href="/alerts" 
                icon={<AlertTriangle className="mr-2 h-4 w-4" />} 
                text="Alerts" 
                active={location.pathname === '/alerts'}
                badge={alertCount}
              />
              <NavItem 
                href="/security" 
                icon={<Lock className="mr-2 h-4 w-4" />} 
                text="Security" 
                active={location.pathname === '/security'}
              />
              <NavItem 
                href="/access-control" 
                icon={<Users className="mr-2 h-4 w-4" />} 
                text="Access Control" 
                active={location.pathname === '/access-control'}
              />
              <NavItem 
                href="/settings" 
                icon={<Settings className="mr-2 h-4 w-4" />} 
                text="Settings" 
                active={location.pathname === '/settings'}
              />
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main 
          className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6"
          onClick={handleMainClick}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
