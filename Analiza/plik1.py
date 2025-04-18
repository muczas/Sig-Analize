import numpy as np
import matplotlib.pyplot as plt
import scipy.io.wavfile as wav
from scipy.signal import find_peaks

file_path = "serce.txt"
data = np.loadtxt(file_path, skiprows=1)  

time = data[:, 0]
ecgsignal = data[:, 1]

plt.figure(figsize=(10, 4))
plt.plot(time, ecgsignal, label="EKG", color="b")
plt.xlabel("Czas [s]")
plt.ylabel("Amplituda")
plt.title("Sygnał EKG")
plt.legend()
plt.grid()
plt.show()

ecgsignal_norm = ecgsignal / np.max(np.abs(ecgsignal)) 

sampling_rate = int(1 / (time[1] - time[0]))
