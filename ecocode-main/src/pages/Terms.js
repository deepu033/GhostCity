import React from "react";

function Terms() {
  return (
    <div className="min-h-screen py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-orange-400 mb-2">Terms and Conditions</h1>
        <p className="text-sm text-gray-400 mb-8">Last Updated: January 16, 2026 | GhostCity Alert</p>

        <div className="bg-slate-800/40 backdrop-blur-sm border border-orange-500/20 rounded-lg shadow-lg p-8 space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using GhostCity Alert's safety intelligence platform ("Service"), you agree to be bound by these Terms and Conditions. If you do not agree to these Terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">2. Description of Service</h2>
            <p className="leading-relaxed mb-3">GhostCity Alert provides an urban safety intelligence platform including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Crowd-sourced safety reporting system</li>
              <li>Dynamic risk assessment and scoring</li>
              <li>Time-based safety heatmaps (day/night)</li>
              <li>Real-time safety alerts and notifications</li>
              <li>Safe route recommendations</li>
              <li>AI-powered safety chatbot</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">3. User Responsibilities</h2>
            <p className="leading-relaxed mb-3">As a user of GhostCity Alert, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate information when reporting unsafe zones</li>
              <li>Report only genuine safety concerns</li>
              <li>Not use the platform for harassment or false reports</li>
              <li>Not disclose private information when reporting</li>
              <li>Accept responsibility for your own safety decisions</li>
              <li>Comply with all local laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">4. Limitations of Liability</h2>
            <p className="leading-relaxed">
              GhostCity Alert provides safety data based on crowd-sourced reports and AI analysis. We cannot guarantee 100% accuracy. Users must use their own judgment. We are NOT liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Personal injury or harm resulting from platform use</li>
              <li>Incomplete or inaccurate safety data</li>
              <li>Third-party content or actions</li>
              <li>Service interruptions or technical issues</li>
              <li>Loss of data or account information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">5. Acceptable Use Policy</h2>
            <p className="leading-relaxed mb-3">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Submit false or misleading safety reports</li>
              <li>Use the platform for harassment or abuse</li>
              <li>Attempt to hack or disrupt the service</li>
              <li>Share others' personal information</li>
              <li>Use the platform for commercial purposes without permission</li>
              <li>Spam or flood the system with duplicate reports</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">6. Safety Data Usage</h2>
            <p className="leading-relaxed">
              Your anonymous safety reports help create collective intelligence. By reporting, you understand this data helps others stay safe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">7. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">8. Contact</h2>
            <p className="leading-relaxed">For questions about these Terms, contact us at legal@ghostcityalert.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;
