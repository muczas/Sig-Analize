from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from scipy.signal import find_peaks

app = Flask(__name__)
CORS(app)

@app.route('/analyze-ecg', methods=['POST'])
def analyze_ecg():
    try:
        # Wczytanie danych z żądania
        content = request.json
        ecg_data = content['ecg_data']
        sampling_rate = content['sampling_rate']

        # Konwersja danych do tablicy numpy
        time = np.array(ecg_data['time'])
        ecgsignal = np.array(ecg_data['signal'])

        # Normalizacja sygnału EKG
        ecgsignal_norm = ecgsignal / np.max(np.abs(ecgsignal))

        # [DODANE] Energia sygnału
        energy = float(np.sum(ecgsignal_norm ** 2))

        # [DODANE] Amplituda sygnału
        amplitude = float(np.max(ecgsignal) - np.min(ecgsignal))

        # Detekcja załamków R
        peaks, _ = find_peaks(ecgsignal, height=np.max(ecgsignal) * 0.6, distance=sampling_rate * 0.6)
        RR_intervals = np.diff(time[peaks])
        HR = 60 / np.mean(RR_intervals)  # Obliczanie tętna (HR)

        # Detekcja załamków P
        p_waves = []
        p_wave_duration = 0.0
        for i in range(1, len(peaks)):
            r = peaks[i]
            p_start = max(0, r - int(0.3 * sampling_rate))
            p_end = max(0, r - int(0.1 * sampling_rate))
            p_segment = ecgsignal[p_start:p_end]

            if len(p_segment) > 0:
                p_local, _ = find_peaks(p_segment, height=np.max(p_segment) * 0.4)
                if len(p_local) > 0:
                    p_waves.append(p_start + p_local[-1])
                    p_wave_duration = (p_end - p_start) / sampling_rate

        # Detekcja załamków T
        t_waves = []
        t_wave_duration = 0.0
        for i in range(1, len(peaks)):
            r = peaks[i]
            t_start = min(len(ecgsignal), r + int(0.1 * sampling_rate))
            t_end = min(len(ecgsignal), r + int(0.4 * sampling_rate))
            t_segment = ecgsignal[t_start:t_end]

            if len(t_segment) > 0:
                t_local, _ = find_peaks(t_segment, height=np.max(t_segment) * 0.3)
                if len(t_local) > 0:
                    t_waves.append(t_start + t_local[0])
                    t_wave_duration = (t_end - t_start) / sampling_rate

        # Detekcja zespołów QRS
        qrs_complexes = []
        qrs_duration = 0.0
        for r in peaks:
            qrs_start = max(0, r - int(0.05 * sampling_rate))
            qrs_end = min(len(ecgsignal), r + int(0.05 * sampling_rate))
            qrs_segment = ecgsignal[qrs_start:qrs_end]

            qrs_peak, _ = find_peaks(qrs_segment, height=np.max(qrs_segment) * 0.6)
            if len(qrs_peak) > 0:
                qrs_complexes.append(qrs_start + qrs_peak[0])
                qrs_duration = (qrs_end - qrs_start) / sampling_rate

        # Przygotowanie wyników
        results = {
            "Energia sygnału": round(energy, 4),               # [DODANE]
            "Amplituda": round(amplitude, 4),                  # [DODANE]
            "Interwały RR": RR_intervals.tolist(),
            "HR (Heart Rate)": round(HR, 2),
            "Czas trwania załamka P (s)": round(p_wave_duration, 4),
            "Liczba załamków P": len(p_waves),
            "Czas trwania załamka T (s)": round(t_wave_duration, 4),
            "Liczba załamków T": len(t_waves),
            "Czas trwania QRS (s)": round(qrs_duration, 4),
            "Liczba QRS": len(qrs_complexes),
        }

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
