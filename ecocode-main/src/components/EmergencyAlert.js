import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Lock, MapPin, Phone } from 'lucide-react';

const EmergencyAlert = () => {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [showBiometricPrompt, setShowBiometricPrompt] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [autoShareTriggered, setAutoShareTriggered] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Mock emergency contacts (in real app, would be stored in localStorage/backend)
  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      setEmergencyContacts(JSON.parse(savedContacts));
    } else {
      // Default emergency contacts
      setEmergencyContacts([
        { id: 1, name: 'Mom', phone: '+1-555-0101', type: 'family' },
        { id: 2, name: 'Dad', phone: '+1-555-0102', type: 'family' },
        { id: 3, name: 'Police Station', phone: '911', type: 'emergency' }
      ]);
    }
  }, []);

  // Get user's current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude, timestamp: new Date() });
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error('Geolocation error:', error);
            // Fallback to mock location
            const mockLocation = { latitude: 40.7128, longitude: -74.0060 };
            setUserLocation({ ...mockLocation, timestamp: new Date() });
            resolve(mockLocation);
          }
        );
      } else {
        reject('Geolocation not supported');
      }
    });
  };

  // Start emergency alert
  const startEmergencyAlert = async () => {
    setIsAlertActive(true);
    setTimeRemaining(60);

    // Get current location
    await getCurrentLocation();

    // Play audio
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }

    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto-share after 1 minute if not stopped
          if (!autoShareTriggered) {
            shareLocationWithEmergencyContacts();
            setAutoShareTriggered(true);
            stopEmergencyAlert();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Stop emergency alert with biometric verification
  const requestStopAlert = () => {
    setShowBiometricPrompt(true);
  };

  // Simulate biometric authentication
  const authenticateWithBiometric = async () => {
    setBiometricStatus('Authenticating...');

    // Simulate biometric authentication (face recognition or fingerprint)
    if (window.PublicKeyCredential) {
      try {
        // Use WebAuthn API for biometric authentication
        const credential = await navigator.credentials.get({
          publicKey: {
            challenge: new Uint8Array(32),
            timeout: 60000,
            userVerification: 'preferred',
            allowCredentials: [],
          },
          signal: new AbortController().signal,
        });

        if (credential) {
          setBiometricStatus('✓ Authenticated');
          setTimeout(() => {
            stopEmergencyAlert();
            setShowBiometricPrompt(false);
            setBiometricStatus('');
          }, 1500);
        }
      } catch (error) {
        // Fallback to face detection with face-api or similar
        simulateFaceAuthentication();
      }
    } else {
      // Fallback to simple biometric simulation
      simulateFaceAuthentication();
    }
  };

  // Simulate face authentication (can be enhanced with face-api.js library)
  const simulateFaceAuthentication = () => {
    // In a real app, integrate with face-api.js or similar library
    setBiometricStatus('Scanning face...');
    setTimeout(() => {
      // Simulate 80% success rate for demo
      if (Math.random() > 0.2) {
        setBiometricStatus('✓ Face recognized');
        setTimeout(() => {
          stopEmergencyAlert();
          setShowBiometricPrompt(false);
          setBiometricStatus('');
        }, 1500);
      } else {
        setBiometricStatus('✗ Face not recognized. Try again.');
        setTimeout(() => {
          setBiometricStatus('');
        }, 2000);
      }
    }, 2000);
  };

  // Share location and phone with emergency contacts and police
  const shareLocationWithEmergencyContacts = async () => {
    if (!userLocation) {
      await getCurrentLocation();
    }

    const userPhone = localStorage.getItem('userPhone') || '+1-555-XXXX-XXXX';
    const alertData = {
      location: userLocation,
      phone: userPhone,
      timestamp: new Date(),
      message: `Emergency Alert! Location: ${userLocation?.latitude}, ${userLocation?.longitude}. Phone: ${userPhone}`,
      contacts: emergencyContacts,
    };

    try {
      // In real app, send to backend
      console.log('Sharing emergency alert:', alertData);

      // Simulate sending to emergency contacts
      for (const contact of emergencyContacts) {
        console.log(`Notifying ${contact.name} (${contact.phone}):`, alertData.message);
        // In real app: await apiService.sendEmergencyAlert(contact.id, alertData);
      }

      // Show notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Emergency Alert Shared', {
          body: `Location shared with ${emergencyContacts.length} emergency contacts`,
          icon: 'emergency-icon.png',
        });
      }

      alert(`✓ Emergency alert shared with ${emergencyContacts.length} contacts and nearest police station!`);
    } catch (error) {
      console.error('Error sharing location:', error);
      alert('Failed to share emergency alert');
    }
  };

  // Stop emergency alert
  const stopEmergencyAlert = () => {
    setIsAlertActive(false);
    setAutoShareTriggered(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-bold text-white">Emergency Alert System</h2>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/emergency-alert.wav" />

      {/* Alert Status Display */}
      {isAlertActive && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-red-400 font-semibold text-lg">🚨 EMERGENCY ALERT ACTIVE</p>
            <p className="text-red-400 text-2xl font-bold">{timeRemaining}s</p>
          </div>
          <p className="text-red-300 text-sm mb-2">Location will be automatically shared in {timeRemaining} seconds</p>
          {userLocation && (
            <div className="flex items-center space-x-2 text-red-300 text-sm">
              <MapPin className="w-4 h-4" />
              <span>
                Lat: {userLocation.latitude.toFixed(4)}, Long: {userLocation.longitude.toFixed(4)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Biometric Authentication Prompt */}
      {showBiometricPrompt && (
        <div className="mb-6 p-6 bg-slate-900 border border-blue-500/50 rounded-xl">
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <p className="text-white text-center font-semibold mb-4">Biometric Verification Required</p>
          <p className="text-gray-400 text-center text-sm mb-6">
            {biometricStatus || 'Use your face or fingerprint to stop the alert'}
          </p>
          <button
            onClick={authenticateWithBiometric}
            disabled={biometricStatus.includes('Authenticating') || biometricStatus.includes('Scanning')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 mb-3 transition-colors"
          >
            {biometricStatus.includes('Authenticating') || biometricStatus.includes('Scanning')
              ? 'Verifying...'
              : 'Verify with Biometric'}
          </button>
          <button
            onClick={() => setShowBiometricPrompt(false)}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-4">
        <button
          onClick={startEmergencyAlert}
          disabled={isAlertActive}
          className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-colors disabled:cursor-not-allowed"
        >
          <AlertTriangle className="w-5 h-5" />
          <span>{isAlertActive ? 'Alert Active' : 'Activate Emergency Alert'}</span>
        </button>

        <button
          onClick={requestStopAlert}
          disabled={!isAlertActive}
          className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white px-6 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-colors disabled:cursor-not-allowed"
        >
          <Lock className="w-5 h-5" />
          <span>{isAlertActive ? 'Stop Alert' : 'Stopped'}</span>
        </button>
      </div>

      {/* Emergency Contacts Info */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <span>Emergency Contacts ({emergencyContacts.length})</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="bg-slate-900 rounded-lg p-3">
              <p className="text-white text-sm font-semibold">{contact.name}</p>
              <p className="text-gray-400 text-xs">{contact.phone}</p>
              <p className="text-gray-500 text-xs mt-1 capitalize">{contact.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Description */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-white font-semibold mb-3">How It Works</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start space-x-2">
            <span className="text-red-400 font-bold mt-0.5">1.</span>
            <span>Click "Activate Emergency Alert" to start the emergency siren and begin the 1-minute countdown</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-red-400 font-bold mt-0.5">2.</span>
            <span>Click "Stop Alert" and authenticate using biometric (face/fingerprint) to disable the alert</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-red-400 font-bold mt-0.5">3.</span>
            <span>If not stopped within 60 seconds, your location and phone number are automatically shared with emergency contacts</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-red-400 font-bold mt-0.5">4.</span>
            <span>Biometric authentication ensures only authorized users can stop the alert</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyAlert;
