// frontend/src/App.js
import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Calendar, Award, MapPin } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({ dob: '', time: '', place: '' });
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/generate-kundali', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header Block */}
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#1e293b', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Vedic Engine & Actionable Report Generator
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            Input birth coordinates to construct precise Sidereal alignments and custom advisory timelines.
          </p>
        </header>

        {/* Configuration Input Form */}
        <section style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>Date of Birth</label>
              <input type="date" required value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>Time of Birth</label>
              <input type="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>Place of Birth</label>
              <input type="text" required placeholder="e.g., Mumbai, India" value={formData.place} onChange={e => setFormData({...formData, place: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>
              {loading ? 'Processing Pipeline...' : 'Generate System Report'}
            </button>
          </form>
        </section>

        {/* Calculated Output UI Generation */}
        {report && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
            
            {/* Structural Positions Table */}
            <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h2 style={{ color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', marginBottom: '20px' }}>
                Sidereal Astronomical Coordinate Allocations
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                    <th style={{ padding: '12px' }}>Celestial Entity</th>
                    <th style={{ padding: '12px' }}>Assigned Sign (Rashi)</th>
                    <th style={{ padding: '12px' }}>Precise Degree</th>
                  </tr>
                </thead>
                <tbody>
                  {report.planetaryPositions.map((p, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: '600', color: '#1e293b' }}>{p.planet}</td>
                      <td style={{ padding: '12px', color: '#334155' }}>{p.sign}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{p.degree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Strategic Advisory Dashboard Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr md:1fr 1fr', gap: '20px' }}>
              
              {/* Past Review Card */}
              <div style={{ backgroundColor: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', color: '#1d4ed8', margin: '0 0 10px 0' }}>
                  <Calendar size={20} style={{ marginRight: '8px' }} /> Past Structural Analysis
                </h3>
                <p style={{ color: '#1e3a8a', lineHeight: '1.5', margin: 0 }}>{report.advisoryReport.pastAnalysis}</p>
              </div>

              {/* Execution Protocol Matrix */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* Actions to Execute Card */}
                <div style={{ backgroundColor: '#f0fdf4', borderLeft: '4px solid #22c55e', padding: '20px', borderRadius: '8px' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', color: '#15803d', margin: '0 0 10px 0' }}>
                    <ShieldCheck size={20} style={{ marginRight: '8px' }} /> Strategic Execution (What to Do)
                  </h3>
                  <ul style={{ paddingLeft: '20px', color: '#14532d', margin: 0 }}>
                    {report.advisoryReport.dos.map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>{item}</li>)}
                  </ul>
                </div>

                {/* Risks to Avoid Card */}
                <div style={{ backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '20px', borderRadius: '8px' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', color: '#b91c1c', margin: '0 0 10px 0' }}>
                    <AlertTriangle size={20} style={{ marginRight: '8px' }} /> Risk Mitigation (What to Avoid)
                  </h3>
                  <ul style={{ paddingLeft: '20px', color: '#7f1d1d', margin: 0 }}>
                    {report.advisoryReport.donts.map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>{item}</li>)}
                  </ul>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}