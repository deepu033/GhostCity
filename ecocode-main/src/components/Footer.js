import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-orange-500/20 w-full">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="group">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300 transform group-hover:scale-110">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">GhostCity Alert</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered urban safety intelligence identifying unsafe zones using crowd-sourced experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/live-map"
                  className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Safety Map
                </Link>
              </li>
              <li>
                <Link
                  to="/alerts"
                  className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Alerts
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-semibold mb-4 text-lg">Connect</h3>
                <div className="flex space-x-5">
                  <a
                    href="https://github.com/shikha320"
                    className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://x.com/nikkshiiitt"
                    className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:sharmashikha0320@gmail.com"
                    className="text-gray-400 hover:text-orange-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                    aria-label="Email"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <button
                onClick={scrollToTop}
                className="hidden sm:flex items-center justify-center w-12 h-12 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 transition-all duration-300 hover:scale-110 group"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800/50 mt-10 pt-8 text-center text-gray-500 text-xs sm:text-sm">
          <p>&copy; 2026 GhostCity Alert. All rights reserved. | Transforming Fear Into Safety Intelligence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
