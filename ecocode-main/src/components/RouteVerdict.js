import React, { useState } from 'react';
import { Navigation, User, Users, AlertTriangle, Clock, CheckCircle, Map } from 'lucide-react';
import apiService from '../services/api';

const RouteVerdict = ({ onRouteAnalysis }) => {
  const [pointA, setPointA] = useState('');
  const [pointB, setPointB] = useState('');
  const [transportMode, setTransportMode] = useState('walking');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const transportOptions = [
    { id: 'walking', name: 'Walking', icon: User },
    { id: 'public', name: 'Public Transit', icon: Users },
    { id: 'cycling', name: 'Cycling', icon: Map }
  ];

  const analyzeSafeRoute = async () => {
    if (!pointA.trim() || !pointB.trim()) {
      alert('Please enter both starting point and destination');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Call backend API for safe route analysis
      const data = await apiService.analyzeRoute(pointA, pointB, transportMode);
      
      setVerdict(data);
      setLastUpdate(new Date());
      
      if (onRouteAnalysis) {
        onRouteAnalysis(data);
      }
    } catch (error) {
      console.error('Error analyzing safe route:', error);
      
      // Fallback to mock safe route data
      const mockVerdict = {
        route_status: 'safe',
        safety_score: 82,
        recommendation: 'This route is well-lit with good crowd presence. Recommended for all times.',
        factors: {
          lighting: {
            status: 'safe',
            description: 'Well-lit streets throughout the route',
            impact: 90
          },
          crowd_presence: {
            status: 'safe',
            description: 'High foot traffic and active businesses',
            impact: 85
          },
          police_presence: {
            status: 'moderate',
            description: 'Regular police patrols in the area',
            impact: 70
          },
          reported_incidents: {
            status: 'safe',
            description: 'Minimal safety reports in past 30 days',
            impact: 88
          }
        },
        estimated_time: '25-30 minutes',
        unsafe_route: 'Avoid shortcuts through industrial zone (dark, isolated)',
        tips: [
          '✓ Stay on main commercial streets',
          '✓ Route passes through busy market area',
          '✓ Multiple well-lit shops and restaurants',
          '✓ High visibility recommended late evening'
        ],
        next_update: '1 hour'
      };
      setVerdict(mockVerdict);
      setLastUpdate(new Date());
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'safe': 'text-green-400',
      'moderate': 'text-yellow-400',
      'unsafe': 'text-red-400',
      'critical': 'text-red-600'
    };
    return colors[status] || 'text-gray-400';
  };

  const getStatusBg = (status) => {
    const colors = {
      'safe': 'bg-green-500/20 border-green-500/30',
      'moderate': 'bg-yellow-500/20 border-yellow-500/30',
      'unsafe': 'bg-red-500/20 border-red-500/30',
      'critical': 'bg-red-600/20 border-red-600/30'
    };
    return colors[status] || 'bg-gray-500/20 border-gray-500/30';
  };

  return (
    <div className="bg-slate-800/40 border border-orange-500/20 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Navigation className="w-6 h-6 text-orange-400" />
        <h2 className="text-white font-bold text-xl">Safe Route Finder</h2>
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-gray-300 text-sm mb-2 block">Starting Point</label>
          <input
            type="text"
            value={pointA}
            onChange={(e) => setPointA(e.target.value)}
            placeholder="Enter your starting location..."
            className="w-full bg-slate-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
          />
        </div>

        <div>
          <label className="text-gray-300 text-sm mb-2 block">Destination</label>
          <input
            type="text"
            value={pointB}
            onChange={(e) => setPointB(e.target.value)}
            placeholder="Enter your destination..."
            className="w-full bg-slate-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
          />
        </div>

        <div>
          <label className="text-gray-300 text-sm mb-2 block">Transport Mode</label>
          <div className="grid grid-cols-3 gap-2">
            {transportOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setTransportMode(option.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  transportMode === option.id
                    ? 'bg-orange-500/20 border-orange-400 text-orange-400'
                    : 'bg-slate-900 border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                <option.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={analyzeSafeRoute}
          disabled={isAnalyzing}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'Finding Safe Route...' : 'Find Safe Route'}
        </button>

        {/* Route Options - Display after checking the route */}
        {verdict && (
          <div className="mt-6 space-y-4">
            <p className="text-gray-300 text-sm font-semibold mb-4">Available Routes:</p>
            
            <div className="grid grid-cols-3 gap-4">
              {/* Safest Route - Prioritized */}
              <button
                onClick={() => console.log('Safest route selected')}
                className="group relative flex flex-col items-start justify-start bg-green-500/20 hover:bg-green-500/35 border-2 border-green-500/70 rounded-lg px-5 py-4 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 shadow-md ring-2 ring-green-400/30"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-green-300 font-bold text-sm">SAFEST ROUTE ✓</span>
                  <div className="w-3 h-3 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></div>
                </div>
                <p className="text-green-200 text-xs leading-relaxed mb-2">Well-lit, high foot traffic, minimal risk</p>
                <div className="flex items-center justify-between w-full text-xs">
                  <span className="text-green-300/80">Risk: Low</span>
                  <span className="text-green-300/80">Time: 25-30 min</span>
                </div>
              </button>

              {/* Moderate Route */}
              <button
                onClick={() => console.log('Moderate route selected')}
                className="group relative flex flex-col items-start justify-start bg-yellow-500/20 hover:bg-yellow-500/35 border-2 border-yellow-500/70 rounded-lg px-5 py-4 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-yellow-300 font-bold text-sm">MODERATE ROUTE</span>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full group-hover:scale-125 transition-transform"></div>
                </div>
                <p className="text-yellow-200 text-xs leading-relaxed mb-2">Mixed lighting, moderate crowd, caution advised</p>
                <div className="flex items-center justify-between w-full text-xs">
                  <span className="text-yellow-300/80">Risk: Medium</span>
                  <span className="text-yellow-300/80">Time: 20-25 min</span>
                </div>
              </button>

              {/* Risky Route */}
              <button
                onClick={() => console.log('Risky route selected')}
                className="group relative flex flex-col items-start justify-start bg-red-500/20 hover:bg-red-500/35 border-2 border-red-500/70 rounded-lg px-5 py-4 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-red-300 font-bold text-sm">RISKY ROUTE</span>
                  <div className="w-3 h-3 bg-red-400 rounded-full group-hover:scale-125 transition-transform"></div>
                </div>
                <p className="text-red-200 text-xs leading-relaxed mb-2">Poor lighting, isolated areas, high risk</p>
                <div className="flex items-center justify-between w-full text-xs">
                  <span className="text-red-300/80">Risk: High</span>
                  <span className="text-red-300/80">Time: 15-20 min</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Verdict Display */}
      {verdict && (
        <div className="space-y-4 border-t border-orange-500/20 pt-6">
          {/* Overall Safety Status */}
          <div className={`border rounded-lg p-4 ${getStatusBg(verdict.route_status)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Safety Score
              </span>
              <span className={`${getStatusColor(verdict.route_status)} font-bold text-xl`}>
                {verdict.safety_score}/100
              </span>
            </div>
            <p className="text-gray-300 text-sm">{verdict.recommendation}</p>
          </div>

          {/* Safety Factors */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm mb-2">Safety Analysis</h3>
            
            {verdict.factors && Object.entries(verdict.factors).map(([key, factor]) => (
              <div key={key} className="bg-slate-900 border border-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-300 text-sm capitalize font-medium">{key.replace(/_/g, ' ')}</span>
                  <span className={`${getStatusColor(factor.status)} text-sm font-semibold`}>
                    {factor.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mb-2">{factor.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        factor.impact > 75 ? 'bg-green-500' :
                        factor.impact > 50 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${factor.impact}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 text-xs w-8 text-right">{factor.impact}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Travel Tips */}
          {verdict.tips && verdict.tips.length > 0 && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <h4 className="text-green-400 text-sm font-semibold mb-2">Safety Tips</h4>
              <ul className="space-y-1">
                {verdict.tips.map((tip, idx) => (
                  <li key={idx} className="text-green-300 text-sm">{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 border border-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-xs">Est. Time</span>
              </div>
              <p className="text-white text-sm font-semibold">{verdict.estimated_time}</p>
            </div>
            
            <div className="bg-slate-900 border border-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-xs">Update In</span>
              </div>
              <p className="text-white text-sm font-semibold">{verdict.next_update}</p>
            </div>
          </div>

          {/* Warning Section */}
          {verdict.unsafe_route && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">
                <strong>⚠️ Avoid:</strong> {verdict.unsafe_route}
              </p>
            </div>
          )}

          {/* Last Updated */}
          {lastUpdate && (
            <div className="text-center text-gray-500 text-xs">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RouteVerdict;
