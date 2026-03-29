import React from "react";

function Privacy() {
  return (
    <div className="min-h-screen py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-orange-400 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last Updated: January 16, 2026 | GhostCity Alert</p>

        <div className="bg-slate-800/40 backdrop-blur-sm border border-orange-500/20 rounded-lg shadow-lg p-8 space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to GhostCity Alert. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our urban safety intelligence platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.1 Anonymous Safety Reports</h3>
            <p className="leading-relaxed mb-3">Users voluntarily report safety concerns without personal identification:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Location of unsafe zone</li>
              <li>Type of concern (poor lighting, low crowd, etc.)</li>
              <li>Time of report</li>
              <li>NO personal identification data is collected</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.2 Alert Subscription Data</h3>
            <p className="leading-relaxed mb-3">If you opt-in for safety alerts:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Email address (encrypted)</li>
              <li>Phone number for SMS (encrypted)</li>
              <li>Preferred notification radius</li>
              <li>Risk level preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.3 Automatically Collected Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Device type and OS</li>
              <li>Browser type</li>
              <li>General location (city/region only)</li>
              <li>Usage analytics (aggregated)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Generate safety heatmaps and risk scores</li>
              <li>Send requested safety alerts</li>
              <li>Improve our AI algorithms</li>
              <li>Provide route recommendations</li>
              <li>Enhance platform performance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">4. Data Protection & Security</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Anonymity First</h3>
                <p className="leading-relaxed">All safety reports are completely anonymous. We never associate personal identifiers with individual reports.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Data Aggregation</h3>
                <p className="leading-relaxed">Individual data points are aggregated before analysis. We cannot identify single users from our public heatmaps.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Encryption</h3>
                <p className="leading-relaxed">All subscription data is encrypted at rest and in transit using industry-standard protocols (TLS 1.3).</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">No Location Tracking</h3>
                <p className="leading-relaxed">We do NOT track your real-time location. Location data is only used when YOU explicitly request it.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">5. Your Rights</h2>
            <p className="leading-relaxed">You have the right to access, correct, or delete your subscription data at any time. Contact us for any privacy concerns.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">6. Contact Us</h2>
            <p className="leading-relaxed">For privacy inquiries, contact us at privacy@ghostcityalert.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
