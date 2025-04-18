from plik1 import ecgsignal, sampling_rate,time
import numpy as np
from scipy.signal import find_peaks
import matplotlib.pyplot as plt
peaks, _ = find_peaks(ecgsignal, height=np.max(ecgsignal) * 0.6, distance=sampling_rate * 0.6)
RR_intervals = np.diff(time[peaks])

print(f"Średni interwał RR: {np.mean(RR_intervals):.2f} s")

plt.figure(figsize=(10, 4))
plt.plot(time, ecgsignal, label="EKG", color="b")
plt.plot(time[peaks], ecgsignal[peaks], "ro", label="Załamki R")
plt.xlabel("Czas [s]")
plt.ylabel("Amplituda")
plt.title("Analiza sygnału EKG")
plt.legend()
plt.grid()
plt.show()