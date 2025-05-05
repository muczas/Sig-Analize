from Analiza.Stare.plik1 import ecgsignal, sampling_rate,time
from Analiza.Stare.RR import peaks
import numpy as np
from scipy.signal import find_peaks
import matplotlib.pyplot as plt

t_waves = []

for i in range(1, len(peaks)):
    r = peaks[i]
    prev_r = peaks[i-1]
    
    t_start = min(len(ecgsignal), r + int(0.1 * sampling_rate))
    t_end = min(len(ecgsignal), r + int(0.4 * sampling_rate))
    t_segment = ecgsignal[t_start:t_end]
    interval_t=(t_end-t_start)/1000
    
    if len(t_segment) > 0:
        t_local, _ = find_peaks(t_segment, height=np.max(t_segment) * 0.3)
        if len(t_local) > 0:
            t_waves.append(t_start + t_local[0])

print(f"Czas trwania załamka T: {interval_t} s")
print(f"Liczba wykrytych załamków T: {len(t_waves)}")


plt.figure(figsize=(10, 4))
plt.plot(time, ecgsignal, label="EKG", color="b")
plt.plot(time[t_waves], ecgsignal[t_waves], "co", label="Załamki T")
plt.xlabel("Czas [s]")
plt.ylabel("Amplituda")
plt.title("Analiza sygnału EKG")
plt.legend()
plt.grid()
plt.show()
