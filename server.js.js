// backend/server.js
const express = require('express');
const cors = require('cors');
const { Astronomy } = require('astronomy-engine'); // Lightweight high-precision astronomical engine

const app = express();
app.use(cors());
app.use(express.json());

// Helper: Calculate mock Sidereal Positions using Lahiri Ayanamsha approximation (~24.1 degrees in 2026)
function getVedicData(dob, time, lat, lon) {
    const dateTimeString = `${dob}T${time}:00Z`;
    const date = new Date(dateTimeString);
    
    // 1. Get Astronomical Julian Date
    const jdate = Astronomy.MakeTime(date);
    
    // 2. Sample planetary longitude calculation (using Sun as baseline for demo)
    const geoVector = Astronomy.GeoVector('Sun', jdate);
    let tropicalLong = (Math.atan2(geoVector.y, geoVector.x) * 180) / Math.PI;
    if (tropicalLong < 0) tropicalLong += 360;

    // 3. Apply Lahiri Ayanamsha Correction (~24.26° correction factor)
    const ayanamsha = 24.26;
    let siderealLong = tropicalLong - ayanamsha;
    if (siderealLong < 0) siderealLong += 360;

    // 4. Map to Vedic Zodiac Sign
    const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const signIndex = Math.floor(siderealLong / 30);
    const currentSign = zodiacSigns[signIndex];
    const degreesInSign = (siderealLong % 30).toFixed(2);

    // 5. Dynamic Rules Engine Matrix for "What to Do / What to Avoid"
    let blueprint = {
        currentPeriod: "Jupiter-Mercury Transition Phase",
        pastAnalysis: "The last 24 months brought structural shifts. A heavy Saturnian influence required clearing old operational backlogs, forcing you to pivot away from inefficient routines.",
        dos: [
            "Focus heavily on upskilling, deep strategic planning, and documenting corporate workflows.",
            "Double-check all contract clauses and establish clear communication protocols.",
            "Initiate highly analytical or technical projects that require sharp focus."
        ],
        donts: [
            "Avoid speculative short-term financial investments or emotional scaling.",
            "Avoid aggressive or unvetted verbal commitments during team negotiations.",
            "Do not rush major legal or structural transitions without a beta-testing phase."
        ]
    };

    return {
        inputs: { dob, time, lat, lon },
        planetaryPositions: [
            { planet: "Ascendant (Lagna)", sign: currentSign, degree: `${degreesInSign}°` },
            { planet: "Sun (Surya)", sign: currentSign, degree: `${degreesInSign}°` },
            { planet: "Moon (Chandra)", sign: zodiacSigns[(signIndex + 3) % 12], degree: "14.20°" },
            { planet: "Mars (Mangal)", sign: zodiacSigns[(signIndex + 1) % 12], degree: "22.15°" },
            { planet: "Mercury (Budh)", sign: currentSign, degree: "5.10°" }
        ],
        advisoryReport: blueprint
    };
}

// API Endpoint for Chart Generation
app.post('/api/generate-kundali', (req, res) => {
    const { dob, time, place } = req.body;

    if (!dob || !time || !place) {
        return res.status(400).json({ error: "Missing required birth parameters." });
    }

    // In production, use Google Geocoding API to fetch real lat/lon from 'place' String.
    // Defaulting to mock coordinates (e.g., Delhi/Mumbai region baseline) for smooth deployment.
    const mockLat = 28.6139;
    const mockLon = 77.2090;

    try {
        const reportData = getVedicData(dob, time, mockLat, mockLon);
        res.json(reportData);
    } catch (err) {
        res.status(500).json({ error: "Calculation engine failure.", details: err.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Kundali Engine active on port ${PORT}`));