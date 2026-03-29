import React from 'react';
import { Users, Cpu, Eye, Shield, AlertTriangle, MapPin } from 'lucide-react';

const About = () => {
  const dataFlowPipeline = [
    { icon: Users, title: 'Crowd-Sourced Reports', description: 'Users anonymously report unsafe zones - poor lighting, low crowds, uneasy feelings' },
    { icon: Cpu, title: 'AI Risk Analysis', description: 'Machine learning models analyze patterns across time, location, and frequency' },
    { icon: Eye, title: 'Heatmap Generation', description: 'Real-time visualization of safety zones with day/night differentiation' },
    { icon: AlertTriangle, title: 'Alert Distribution', description: 'Instant notifications via SMS, email, and in-app alerts when entering high-risk zones' }
  ];

  return (
    <div className="min-h-screen py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-400 mb-4">About GhostCity Alert</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            An AI-powered safety intelligence platform that identifies unsafe 'dead zones' in cities using crowd-sourced human experiences. We transform collective fear into measurable safety data.
          </p>
        </div>

        <div className="mb-20 bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-4">The Problem</h2>
          <p className="text-gray-300 leading-relaxed">
            Many areas appear safe during the day but become isolated, poorly lit, and unsafe at night. Existing navigation platforms focus only on distance and time, completely ignoring human safety. Women, night-shift workers, students, and delivery agents are especially vulnerable. Awareness of unsafe zones usually comes after personal experience.
          </p>
        </div>

        <div className="mb-20 bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Our Solution</h2>
          <p className="text-gray-300 leading-relaxed">
            GhostCity Alert transforms how people navigate cities at night. By harnessing collective intelligence from anonymous safety reports, we create dynamic risk assessments that evolve in real-time. Our platform doesn't just warn you of danger—it actively guides you toward safer alternatives.
          </p>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataFlowPipeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-slate-800/40 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 hover:border-orange-400 transition-all">
                  <div className="bg-orange-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 border border-orange-500/30">
                    <Icon className="w-7 h-7 text-orange-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8">
            <MapPin className="w-8 h-8 text-orange-400 mb-4" />
            <h3 className="text-white font-bold text-xl mb-3">Crowd-Sourced Safety Reports</h3>
            <p className="text-gray-400">Anonymous reports of poor lighting, no crowds, police absence, and uneasy feelings strengthen the collective safety database.</p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8">
            <Cpu className="w-8 h-8 text-orange-400 mb-4" />
            <h3 className="text-white font-bold text-xl mb-3">Dynamic Risk Scoring</h3>
            <p className="text-gray-400">AI algorithms analyze time, frequency, and location patterns to calculate precise risk scores that update in real-time.</p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8">
            <Eye className="w-8 h-8 text-orange-400 mb-4" />
            <h3 className="text-white font-bold text-xl mb-3">Time-Based Safety Heatmaps</h3>
            <p className="text-gray-400">Visual heatmaps showing dramatic day vs night safety variations. Switch between daytime and nighttime views.</p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8">
            <Shield className="w-8 h-8 text-orange-400 mb-4" />
            <h3 className="text-white font-bold text-xl mb-3">Safe Route Navigation</h3>
            <p className="text-gray-400">Get recommendations for the safest path, not the fastest. Real-time alerts notify you when entering high-risk zones.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
