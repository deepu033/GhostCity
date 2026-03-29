import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Map, AlertTriangle, TrendingUp, Cpu, Users, Eye } from 'lucide-react';

const Home = () => {
  const [isHoveringAlert, setIsHoveringAlert] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const alertSectionStyle = {
    backgroundImage: 'url(https://i.pinimg.com/1200x/99/32/89/99328939d40bc1f5fac7c14a6c6777e9.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: `center ${scrollY * 0.5}px`,
    backgroundAttachment: 'fixed',
    transition: 'transform 0.3s ease-in-out',
    transform: isHoveringAlert ? 'scale(1.02)' : 'scale(1)',
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with image and gradient overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://i.pinimg.com/1200x/8c/1e/bb/8c1ebb3b87059c7463f77930310115e3.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(5, 18, 31, 0.85) 0%, rgba(5, 18, 31, 0.75) 100%)'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-block mb-8">
            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/40 px-5 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-orange-500/20 backdrop-blur-sm">
              AI-Powered Urban Safety Intelligence
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-orange-400 drop-shadow-[0_0_30px_rgba(234,88,12,0.5)]">See. Report. Stay Safe.</span>
            <br />
            <span className="text-white">Navigate Safer Cities.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            AI-powered safety intelligence identifying unsafe or 'dead' zones in cities using crowd-sourced experiences. Get the safest route, not just the shortest.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/live-map"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/50"
            >
              <span>View Safety Map</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="bg-transparent border-2 border-gray-400 hover:bg-white/10 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm">
              How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-md border border-orange-500/30 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300">
              <Map className="w-10 h-10 text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-gray-400 text-sm">Safety Reports</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-orange-500/30 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300">
              <Users className="w-10 h-10 text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">100K+</div>
              <div className="text-gray-400 text-sm">Community Users</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-orange-500/30 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300">
              <TrendingUp className="w-10 h-10 text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">92%</div>
              <div className="text-gray-400 text-sm">Safety Accuracy</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-orange-500/30 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300">
              <AlertTriangle className="w-10 h-10 text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-gray-400 text-sm">Real-Time Alerts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Transforming Fear Into <span className="text-orange-400 drop-shadow-[0_0_20px_rgba(234,88,12,0.4)]">Safety Intelligence</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Combining crowd-sourced safety reports, AI risk analysis, and real-time data to identify unsafe zones and provide safer navigation
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-800/40 border border-orange-500/20 rounded-2xl p-8 hover:border-orange-400 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 backdrop-blur-sm">
              <div className="bg-orange-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-orange-500/30">
                <Users className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Crowd-Sourced Reports</h3>
              <p className="text-gray-400 leading-relaxed">
                Anonymous safety reports capturing poor lighting, no crowds, police absence, and uneasy feelings
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-800/40 border border-orange-500/20 rounded-2xl p-8 hover:border-orange-400 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 backdrop-blur-sm">
              <div className="bg-orange-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-orange-500/30">
                <Cpu className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Dynamic Risk Scoring</h3>
              <p className="text-gray-400 leading-relaxed">
                AI-based analysis using time, frequency, and location patterns to calculate real-time risk scores
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-800/40 border border-orange-500/20 rounded-2xl p-8 hover:border-orange-400 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 backdrop-blur-sm">
              <div className="bg-orange-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-orange-500/30">
                <Eye className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Time-Based Heatmaps</h3>
              <p className="text-gray-400 leading-relaxed">
                Visual safety heatmaps showing day vs night safety variations across different zones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alert CTA Section */}
      <section 
        className="py-20 border-y border-orange-500/30 relative overflow-hidden"
        style={alertSectionStyle}
        onMouseEnter={() => setIsHoveringAlert(true)}
        onMouseLeave={() => setIsHoveringAlert(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/60 to-red-600/60"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Real-Time Safety Alerts
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-10">
            Receive instant notifications when entering high-risk zones and get personalized safe route recommendations
          </p>
          <Link
            to="/alerts"
            className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/50"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Enable Alerts</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
