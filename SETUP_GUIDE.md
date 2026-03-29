# Emergency Alert System - Quick Setup Guide

## What's Been Added

### 1. **EmergencyAlert Component** 
   - File: `src/components/EmergencyAlert.js`
   - Features: Alert button, Stop button with biometric auth, 1-minute auto-share

### 2. **Emergency Audio File**
   - File: `public/emergency-alert.wav`
   - Type: Emergency siren sound (high-frequency alert)

### 3. **Updated Alerts Page**
   - File: `src/pages/Alerts.js`
   - Change: Added import and component integration

## How to Use

### For Users:
1. Navigate to the **Alerts** page
2. Scroll to **"Emergency Alert System"** section
3. Click **"Activate Emergency Alert"** to trigger emergency
4. **Stop the alert** by:
   - Clicking "Stop Alert" button
   - Authenticating with your face/fingerprint
   - Alert stops immediately upon successful authentication
5. If NOT stopped within 60 seconds:
   - Your location is automatically shared
   - Your phone number is sent to emergency contacts
   - Alert stops automatically

### Emergency Contacts (Demo):
- **Mom**: +1-555-0101
- **Dad**: +1-555-0102
- **Police Station**: 911

*(Customize these in localStorage with `emergencyContacts` key)*

## Key Features

✅ **Emergency Audio**: Plays on demand immediately
✅ **Stop Button**: Requires biometric authentication (face/fingerprint)
✅ **Live Location**: GPS coordinates captured in real-time
✅ **Auto-Share**: Sends location after 60 seconds if not stopped
✅ **Countdown Timer**: Visual display of remaining time
✅ **Emergency Contacts**: Display and notification of all recipients
✅ **Biometric Security**: Face recognition/fingerprint verification
✅ **Graceful Fallbacks**: Works even without geolocation permission

## Testing the System

### Quick Test (2 minutes):
1. Open browser DevTools (F12)
2. Go to Alerts page
3. Click "Activate Emergency Alert"
4. Watch console logs showing:
   - Location captured
   - Timer countdown
   - Status updates
5. Click "Stop Alert" → Authenticate → Alert stops

### Full Test (70 seconds):
1. Activate alert (don't click stop)
2. Wait 60 seconds
3. Watch automatic location share to contacts
4. Verify console shows: `Sharing emergency alert: {...}`

## Browser Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- Geolocation enabled (user will be prompted)
- Audio playback enabled
- Optional: Biometric hardware (fingerprint/face sensor)

## Customization Options

### Add Custom Emergency Contacts:
```javascript
// In EmergencyAlert.js or via localStorage
const customContacts = [
  { id: 1, name: 'Sister', phone: '+1-XXX-XXXX', type: 'family' },
  { id: 2, name: 'Best Friend', phone: '+1-XXX-XXXX', type: 'trusted' },
  { id: 3, name: 'Local Police', phone: 'XXX-XXX-XXXX', type: 'emergency' }
];
localStorage.setItem('emergencyContacts', JSON.stringify(customContacts));
```

### Change Countdown Timer (60 seconds):
In `EmergencyAlert.js`, line: `setTimeRemaining(60);`
Change `60` to your desired seconds.

### Customize Biometric Method:
The system supports:
1. **WebAuthn API** (fingerprint/face from device)
2. **Face Detection** (simulated with 80% demo success rate)

For production, integrate:
- `face-api.js` for real face recognition
- Google Cloud Vision for face detection
- AWS Rekognition for biometric verification

## File Locations

```
ecocode-main/
├── src/
│   ├── components/
│   │   └── EmergencyAlert.js ← Main component
│   └── pages/
│       └── Alerts.js ← Updated with integration
└── public/
    └── emergency-alert.wav ← Audio file
```

## Console Output When Testing

When you activate an alert, check console (F12) for:

```
Sharing emergency alert: {
  location: { latitude: 40.7128, longitude: -74.0060, timestamp: ... },
  phone: '+1-555-XXXX-XXXX',
  message: 'Emergency Alert! Location: ...',
  contacts: [...]
}
Notifying Mom (+1-555-0101): Emergency Alert! ...
Notifying Dad (+1-555-0102): Emergency Alert! ...
Notifying Police Station (911): Emergency Alert! ...
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Audio not playing | ✓ Check browser volume settings ✓ Allow audio permissions ✓ Check DevTools console for errors |
| Location not showing | ✓ Click "Allow" when browser asks for location permission ✓ Check if browser supports Geolocation API |
| Biometric not working | ✓ Device may not have fingerprint/face sensor ✓ Fall back to simulated biometric ✓ Check browser console logs |
| Button not responding | ✓ Refresh page ✓ Check browser console for JavaScript errors ✓ Verify alert is not already active |

## API Integration (For Backend Team)

When ready to connect to backend, add to `src/services/api.js`:

```javascript
async sendEmergencyAlert(alertData) {
  return this.fetchWithErrorHandling(`${API_BASE_URL}/emergency/alert`, {
    method: 'POST',
    body: JSON.stringify(alertData),
  });
}

async notifyEmergencyContact(contactId, location, phone) {
  return this.fetchWithErrorHandling(`${API_BASE_URL}/emergency/notify`, {
    method: 'POST',
    body: JSON.stringify({ contactId, location, phone }),
  });
}
```

Then call in `EmergencyAlert.js`:
```javascript
await apiService.sendEmergencyAlert(alertData);
```

## Next Steps

1. **Customize emergency contacts** for your region
2. **Test all three scenarios**: Stop via biometric, auto-share after 60s
3. **Integrate with backend** for real location sharing
4. **Add SMS/Email notifications** to contacts
5. **Connect to local police database** for automatic dispatch
6. **Deploy to production** with proper security measures

---

**For detailed technical documentation**, see: `EMERGENCY_ALERT_SYSTEM.md`
