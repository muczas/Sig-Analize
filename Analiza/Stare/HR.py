from Analiza.Stare.plik1 import ecgsignal, sampling_rate,time
from Analiza.Stare.RR import RR_intervals
import numpy as np
from scipy.signal import find_peaks
import matplotlib.pyplot as plt


HR = 60 / np.mean(RR_intervals)

print(f"Częstotliwość pracy serca: {HR:.2f} BPM")