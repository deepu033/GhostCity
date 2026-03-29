const API_BASE_URL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || 'http://localhost:8000/api/v1';

class ApiService {
  async fetchWithErrorHandling(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  async getActiveAlerts(skip = 0, limit = 100) {
    const params = new URLSearchParams({ skip: skip.toString(), limit: limit.toString() });
    return this.fetchWithErrorHandling(`${API_BASE_URL}/alerts/?${params}`);
  }

  async getAlertStatistics() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/alerts/statistics`);
  }

  async getLastUpdate() {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/status/last-update`);
  }

  async searchLocation(location) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/search?query=${encodeURIComponent(location)}`);
  }

  async sendUserLocation(latitude, longitude) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/location/analyze`, {
      method: 'POST',
      body: JSON.stringify({ latitude, longitude }),
    });
  }

  async getNearbyAlerts(latitude, longitude, radiusKm = 5) {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      radius_km: radiusKm.toString(),
    });
    return this.fetchWithErrorHandling(`${API_BASE_URL}/alerts/nearby/?${params}`);
  }

  async subscribeToNotifications(data) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/notifications/subscribe`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async analyzeRoute(pointA, pointB, transportMode) {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/route/analyze`, {
      method: 'POST',
      body: JSON.stringify({ from: pointA, to: pointB, mode: transportMode }),
    });
  }
}

const apiService = new ApiService();
export default apiService;
