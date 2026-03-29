import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Home as HomeIcon, Map, AlertTriangle, Info } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/live-map', label: 'Safety Map', icon: Map },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
    { path: '/about', label: 'About', icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-slate-950/95 backdrop-blur-md border-b border-orange-500/20 sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">GhostCity Alert</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-orange-500 text-white font-semibold shadow-lg shadow-orange-500/50'
                      : 'text-gray-300 hover:text-white hover:bg-orange-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
