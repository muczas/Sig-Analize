from plik1 import ecgsignal, sampling_rate,time
from RR import peaks
import numpy as np
from scipy.signal import find_peaks
import matplotlib.pyplot as plt

qrs_complexes = []

for i in range(1, len(peaks)):
    r = peaks[i]
   
    
    qrs_start = max(0, r - int(0.1 * sampling_rate))
    qrs_end = min(len(ecgsignal), r + int(0.1 * sampling_rate))
    qrs_segment = ecgsignal[qrs_start:qrs_end]

    qrs_peak, _ = find_peaks(qrs_segment, height=np.max(qrs_segment) * 0.6)
    if len(qrs_peak) > 0:
        qrs_complexes.append(qrs_start + qrs_peak[0])

print(f"Liczba wykrytych kompleksów QRS: {len(qrs_complexes)}")

plt.figure(figsize=(10, 4))
plt.plot(time, ecgsignal, label="EKG", color="b")
plt.plot(time[qrs_complexes], ecgsignal[qrs_complexes], "go", label="Kompleks QRS")
plt.xlabel("Czas [s]")
plt.ylabel("Amplituda")
plt.title("Analiza sygnału EKG")
plt.legend()
plt.grid()
plt.show()
