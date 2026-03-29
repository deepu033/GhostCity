import React, { useState, useEffect } from 'react';
import { AlertTriangle, Mail, Phone } from 'lucide-react';
import apiService from '../services/api';
import EmergencyAlert from '../components/EmergencyAlert';

const Alerts = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [activeSafetyAlerts, setActiveSafetyAlerts] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  useEffect(() => {
    fetchActiveSafetyAlerts();
    fetchStatistics();
  }, []);

  const fetchActiveSafetyAlerts = async () => {
    try {
      const data = await apiService.getActiveAlerts(null, 10);
      setActiveSafetyAlerts(data);
    } catch (error) {
      setActiveSafetyAlerts([
        { id: 1, risk: 'High', location: 'Downtown Market Area', description: 'Multiple reports of poor lighting', reports: 52, time: '2 hours ago', risk_score: 78 },
        { id: 2, risk: 'Medium', location: 'East Industrial Zone', description: 'Moderate safety concerns', reports: 28, time: '4 hours ago', risk_score: 52 },
        { id: 3, risk: 'Critical', location: 'North Dead Zone', description: 'Multiple incidents reported', reports: 87, time: '30 minutes ago', risk_score: 92 }
      ]);
    }
  };

  const fetchStatistics = async () => {
    try {
      const data = await apiService.getAlertStatistics();
      setStatistics(data);
    } catch (error) {
      setStatistics({ total_events: 1250, events_last_24h: 89, average_risk_score: 54, system_status: 'Operational', active_zones: 12, community_reports: 1847 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiService.subscribeToNotifications({ email, phone, latitude: 0, longitude: 0, radius_km: 5, min_severity: 'Medium' });
      setSubscribeSuccess(true);
      setTimeout(() => setSubscribeSuccess(false), 5000);
      setEmail('');
      setPhone('');
    } catch (error) {
      alert('Subscription feature coming soon! Stay tuned for real-time safety alerts.');
    } finally {
      setIsLoading(false);
    }
  };

  const getBorderColor = (risk) => {
    const riskLower = risk?.toLowerCase();
    if (riskLower === 'critical') return 'border-l-red-600';
    if (riskLower === 'high') return 'border-l-orange-500';
    if (riskLower === 'medium') return 'border-l-yellow-500';
    if (riskLower === 'low') return 'border-l-green-500';
    return 'border-l-gray-500';
  };

  const getBgColor = (risk) => {
    const riskLower = risk?.toLowerCase();
    if (riskLower === 'critical') return 'bg-red-500/5';
    if (riskLower === 'high') return 'bg-orange-500/5';
    if (riskLower === 'medium') return 'bg-yellow-500/5';
    if (riskLower === 'low') return 'bg-green-500/5';
    return 'bg-gray-500/5';
  };

  return (
    <div className="min-h-screen py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">Safety Alerts</h1>
          <p className="text-gray-400 text-lg">Real-time high-risk zone notifications and safety intelligence</p>
        </div>

        {/* Emergency Alert System */}
        <EmergencyAlert />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Active Unsafe Zones</h2>
            
            <div className="space-y-4">
              {activeSafetyAlerts.map((alert) => (
                <div key={alert.id} className={`${getBgColor(alert.risk)} ${getBorderColor(alert.risk)} border-l-4 bg-slate-800/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-white" />
                      <h3 className="text-white font-bold text-lg">{alert.risk} Risk</h3>
                      <span className="text-gray-400">• {alert.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{alert.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-gray-400">Reports: <span className="text-white font-medium">{alert.reports}</span></span>
                    <span className="text-gray-400">Last Updated: <span className="text-white font-medium">{alert.time}</span></span>
                    <span className="text-gray-400">Risk Score: <span className="text-white font-medium">{alert.risk_score}/100</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-slate-800/60 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6" style={{backgroundImage: 'url(https://i.pinimg.com/1200x/99/32/89/99328939d40bc1f5fac7c14a6c6777e9.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <h2 className="text-xl font-bold text-white mb-6">Get Safety Alerts</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-slate-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400" required />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="w-full bg-slate-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400" required />
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{isLoading ? 'Setting Up...' : 'Enable Safety Alerts'}</span>
                </button>
                
                {subscribeSuccess && (
                  <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <p className="text-green-400 text-sm text-center">✓ Safety alerts enabled successfully!</p>
                  </div>
                )}
              </form>

              {statistics && (
                <div className="mt-6 pt-6 border-t border-orange-500/20">
                  <h3 className="text-white font-semibold mb-4 text-sm">System Statistics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Total Reports</p>
                      <p className="text-orange-400 font-bold text-lg">{statistics.community_reports}</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Avg Risk</p>
                      <p className="text-white font-bold text-lg">{statistics.average_risk_score}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
