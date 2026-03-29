import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Plus, Minus, Maximize2, Clock, Target, Moon, Sun } from 'lucide-react';
import apiService from '../services/api';
import GoogleMapComponent from '../components/GoogleMapComponent';
import RouteVerdict from '../components/RouteVerdict';

const LiveMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [safetyZoneData, setSafetyZoneData] = useState([]);
  const [timeOfDay, setTimeOfDay] = useState('night');
  const mapRef = useRef(null);

  const fetchActiveSafetyAlerts = useCallback(async () => {
    try {
      const data = await apiService.getActiveAlerts();
      const zoneData = data.map((alert) => ({
        id: alert.id,
        lat: 28.6139 + (Math.random() - 0.5) * 2,
        lng: 77.2090 + (Math.random() - 0.5) * 2,
        zone_name: alert.location,
        risk_level: alert.risk,
        risk_score: alert.risk_score || 50,
        reports: Math.floor(Math.random() * 50) + 10,
        description: `Safety risk in ${alert.time}`,
        hazards: ['Poor Lighting', 'Low Crowd', 'Uneasy Feeling']
      }));
      setSafetyZoneData(zoneData);
      setApiConnected(true);
    } catch (error) {
      console.error('Error fetching safety alerts:', error);
      setApiConnected(false);
      
      const mockZoneData = [
        { id: 1, lat: 28.6139, lng: 77.2090, zone_name: 'North Delhi - Dead Zone', risk_level: 'High', risk_score: 75, reports: 42, hazards: ['Poor Lighting', 'No Crowd', 'Uneasy'] },
        { id: 2, lat: 19.0760, lng: 72.8777, zone_name: 'South Mumbai - Dark Streets', risk_level: 'Critical', risk_score: 90, reports: 65, hazards: ['Very Dark', 'Isolated', 'Police Absent'] },
        { id: 3, lat: 13.0827, lng: 80.2707, zone_name: 'Chennai - Safe Zone', risk_level: 'Low', risk_score: 25, reports: 8, hazards: [] },
        { id: 4, lat: 22.5726, lng: 88.3639, zone_name: 'Kolkata - Moderate Area', risk_level: 'Medium', risk_score: 55, reports: 28, hazards: ['Decent Lighting', 'Few People'] },
        { id: 5, lat: 12.9716, lng: 77.5946, zone_name: 'Bangalore - Well-Lit', risk_level: 'Low', risk_score: 20, reports: 5, hazards: [] },
        { id: 6, lat: 17.3850, lng: 78.4867, zone_name: 'Hyderabad - Caution Zone', risk_level: 'Medium', risk_score: 50, reports: 22, hazards: ['Occasional Dark Spots'] },
      ];
      setSafetyZoneData(mockZoneData);
    }
  }, []);

  const fetchLastUpdated = useCallback(async () => {
    try {
      const data = await apiService.getLastUpdate();
      setLastUpdated(data.timestamp);
    } catch (error) {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    }
  }, []);

  useEffect(() => {
    fetchActiveSafetyAlerts();
    fetchLastUpdated();
    
    const interval = setInterval(() => {
      fetchActiveSafetyAlerts();
      fetchLastUpdated();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchActiveSafetyAlerts, fetchLastUpdated]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    try {
      const data = await apiService.searchLocation(searchQuery);
      
      if (data.found) {
        if (data.latitude && data.longitude) {
          setSearchLocation({ lat: data.latitude, lng: data.longitude });
        }
        alert(`Found: ${data.location_name}\nSafety Risk: ${data.severity}\nRisk Score: ${data.risk_score}`);
      } else {
        alert('Location not found. Try searching for a nearby area or use "Locate Me"');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Unable to search location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocateMe = async () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          try {
            const data = await apiService.sendUserLocation(latitude, longitude);
            
            alert(
              `Your Location Safety Assessment:\n\n` +
              `Risk Level: ${data.severity}\n` +
              `Risk Score: ${data.risk_score}/100\n` +
              `Reports Here: ${data.nearby_events}\n` +
              `Time of Day: ${timeOfDay}`
            );
            
            if (data.nearby_events > 0) {
              const nearbyAlerts = await apiService.getNearbyAlerts(latitude, longitude, 10);
              console.log('Nearby safety alerts:', nearbyAlerts);
            }
          } catch (error) {
            console.error('Error sending location:', error);
            alert(`Location found!\nLatitude: ${latitude.toFixed(4)}\nLongitude: ${longitude.toFixed(4)}\n\nUnable to fetch safety data - API may be offline.`);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = 'Unable to access your location.';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location permissions.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'An unknown error occurred.';
          }
          alert(errorMessage);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom - 1);
    }
  };

  const handleFullscreen = () => {
    if (mapRef.current) {
      const mapDiv = mapRef.current.getDiv();
      if (mapDiv.requestFullscreen) {
        mapDiv.requestFullscreen();
      }
    }
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  const getSafetyColor = (risk) => {
    const riskLower = risk?.toLowerCase();
    if (riskLower === 'critical') return 'border-red-600';
    if (riskLower === 'high') return 'border-orange-500';
    if (riskLower === 'medium' || riskLower === 'moderate') return 'border-yellow-500';
    if (riskLower === 'low') return 'border-green-500';
    return 'border-gray-500';
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* Page Header */}
        <div className="bg-slate-900 px-8 py-6 border-b border-orange-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-orange-400 mb-2">Safety Heatmap</h1>
              <p className="text-gray-400">Real-time crowd-sourced safety zone intelligence</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTimeOfDay(timeOfDay === 'day' ? 'night' : 'day')}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-orange-500/30 rounded-lg text-white hover:bg-slate-700 transition-colors"
              >
                {timeOfDay === 'day' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{timeOfDay === 'day' ? 'Daytime' : 'Nighttime'}</span>
              </button>
              <div className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-400">
                {apiConnected ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="bg-slate-900 px-8 py-4 border-b border-orange-500/20">
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search neighborhood or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/40 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
              />
            </form>
            <button
              onClick={handleLocateMe}
              disabled={isLoading}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Target className="w-5 h-5 inline mr-2" />
              Locate Me
            </button>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex flex-1 min-h-0">
          {/* Map */}
          <div className="flex-1 relative">
            <GoogleMapComponent
              userLocation={userLocation}
              searchLocation={searchLocation}
              weatherRiskData={safetyZoneData}
              onMapLoad={handleMapLoad}
            />
            
            {/* Map Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
              <button
                onClick={handleZoomIn}
                className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={handleZoomOut}
                className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={handleFullscreen}
                className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                <Maximize2 className="w-5 h-5 text-gray-800" />
              </button>
            </div>

            {/* Last Updated Badge */}
            <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg border border-orange-500/30 z-10">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Updated: {lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Safety Zones Panel */}
          <div className="w-96 bg-slate-900 border-l border-orange-500/20 overflow-y-auto">
            <div className="p-6 border-b border-orange-500/20">
              <h2 className="text-xl font-bold text-white mb-2">Unsafe Zones ({safetyZoneData.length})</h2>
              <p className="text-gray-400 text-sm">Crowd-sourced safety reports</p>
            </div>

            <div className="p-4 space-y-3">
              {safetyZoneData.map((zone) => (
                <div key={zone.id} className={`bg-slate-800 border-l-4 ${getSafetyColor(zone.risk_level)} rounded-lg p-4 hover:bg-slate-700 transition-colors cursor-pointer`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold flex-1">{zone.zone_name}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      zone.risk_level === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      zone.risk_level === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      zone.risk_level === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {zone.risk_level}
                    </span>
                  </div>
                  
                  <div className="mb-3 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Risk Score:</span>
                      <span className="text-white font-bold">{zone.risk_score}/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Reports:</span>
                      <span className="text-white font-bold">{zone.reports}</span>
                    </div>
                  </div>

                  {zone.hazards && zone.hazards.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {zone.hazards.map((hazard, idx) => (
                        <span key={idx} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                          {hazard}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Route Analysis */}
        <div className="bg-slate-900 border-t border-orange-500/20 p-6">
          <RouteVerdict onRouteAnalysis={(data) => console.log('Route Analysis:', data)} />
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
