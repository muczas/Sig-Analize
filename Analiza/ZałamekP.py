from plik1 import ecgsignal, sampling_rate,time
from RR import peaks
import numpy as np
from scipy.signal import find_peaks
import matplotlib.pyplot as plt

p_waves = []

for i in range(1, len(peaks)):
    r = peaks[i]
    prev_r = peaks[i-1]
    
    p_start = max(0, r - int(0.3 * sampling_rate))
    p_end = max(0, r - int(0.1 * sampling_rate))
    p_segment = ecgsignal[p_start:p_end]
    interval_p= (p_end-p_start)/1000

    if len(p_segment) > 0:
        p_local, _ = find_peaks(p_segment, height=np.max(p_segment) * 0.4)

        if len(p_local) > 0:
            p_waves.append(p_start + p_local[-1])

print(f"Czas trwania załamka P: {interval_p} s")
print(f"Liczba wykrytych załamków P: {len(p_waves)}")

plt.figure(figsize=(10, 4))
plt.plot(time, ecgsignal, label="EKG", color="b")
plt.plot(time[p_waves], ecgsignal[p_waves], "mo", label="Załamki P")
plt.xlabel("Czas [s]")
plt.ylabel("Amplituda")
plt.title("Analiza sygnału EKG")
plt.legend()
plt.grid()
plt.show()