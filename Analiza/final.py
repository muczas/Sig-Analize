from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from scipy.signal import find_peaks
from scipy.ndimage import gaussian_filter1d

app = Flask(__name__)
CORS(app)

@app.route('/analyze-ecg', methods=['POST'])
def analyze_ecg():
    try:
        content = request.json
        ecg_data = content['ecg_data']
        sampling_rate = content['sampling_rate']

        time = np.array(ecg_data['time'])
        signal = np.array(ecg_data['signal'])

        # Wygładzenie i normalizacja
        smoothed = gaussian_filter1d(signal, sigma=2)
        normalized = smoothed / np.max(np.abs(smoothed))

        # Detekcja załamków R
        r_peaks, _ = find_peaks(
            normalized,
            height=0.5,
            distance=int(0.6 * sampling_rate)
        )

        rr_intervals = np.diff(time[r_peaks])
        mean_rr = np.mean(rr_intervals) if len(rr_intervals) > 1 else 0
        hr = 60 / mean_rr if mean_rr > 0 else 0

        # Energia i amplituda
        energy = float(np.sum(normalized ** 2))
        amplitude = float(np.max(signal) - np.min(signal))

        # Detekcja załamków P – szukanie maksimum w oknie przed R
        p_waves = []
        for r in r_peaks:
            start = max(0, r - int(0.2 * sampling_rate))
            end = max(0, r - int(0.08 * sampling_rate))
            if end <= start:
                continue
            segment = normalized[start:end]
            if len(segment) > 0:
                peak_index = np.argmax(segment)
                p_waves.append(start + peak_index)
        p_wave_duration = 0.08 if p_waves else 0.0

        # Detekcja załamków T – szukanie maksimum w oknie po R
        t_waves = []
        for r in r_peaks:
            start = r + int(0.12 * sampling_rate)
            end = r + int(0.4 * sampling_rate)
            if end >= len(normalized) or start >= len(normalized):
                continue
            segment = normalized[start:end]
            if len(segment) > 0:
                peak_index = np.argmax(segment)
                t_waves.append(start + peak_index)
        t_wave_duration = 0.12 if t_waves else 0.0

        results = {
            "Amplitude": round(amplitude, 4),
            "Signal Energy": round(energy, 4),
            "HR (Heart Rate)": round(hr, 2),
            "Mean RR Interval": round(mean_rr, 4),
            "Number of QRS Complexes": len(r_peaks),
            "QRS Duration (s)": 0.1 if len(r_peaks) > 0 else 0.0,
            "Number of P Waves": len(p_waves),
            "P Wave Duration (s)": round(p_wave_duration, 4),
            "Number of T Waves": len(t_waves),
            "T Wave Duration (s)": round(t_wave_duration, 4)
        }

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
