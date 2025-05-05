import React, { useState } from "react";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";

function Signal() {
    const [data, setData] = useState<{ time: number[]; signal: number[] }>({ time: [], signal: [] });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;

                if (typeof text !== "string") {
                    throw new Error("Nie udało się odczytać pliku jako tekstu.");
                }

                const lines = text.trim().split("\n").slice(1);

                const time: number[] = [];
                const signal: number[] = [];

                lines.forEach((line) => {
                    const [t, s] = line.trim().split(/\s+/);
                    const parsedT = parseFloat(t);
                    const parsedS = parseFloat(s);
                    if (!isNaN(parsedT) && !isNaN(parsedS)) {
                        time.push(parsedT);
                        signal.push(parsedS);
                    }
                });

                if (time.length === 0 || signal.length === 0) {
                    throw new Error("Plik nie zawiera poprawnych danych.");
                }

                setData({ time, signal });
                console.log("Dane wczytane:", { time, signal });
                setError("");
            } catch (err) {
                setError("Nie udało się przetworzyć pliku. Upewnij się, że format jest poprawny.");
            }
        };

        reader.readAsText(file);
    };

    const analyzeSignal = async () => {
        try {
            console.log("Analiza rozpoczęta");

            const response = await fetch("http://127.0.0.1:5000/analyze-ecg", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ecg_data: data,
                    sampling_rate: 250,
                }),
            });

            if (!response.ok) {
                throw new Error("Błąd podczas analizy sygnału.");
            }

            const results = await response.json();
            navigate("/analize", { state: { data, results } });
        } catch (error) {
            console.error("Błąd analizy:", error);
            setError("Nie udało się przeprowadzić analizy sygnału.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-center mb-4">Wczytaj plik EKG (.txt lub .csv)</h2>
                <div className="flex justify-center mb-6">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl cursor-pointer transition duration-300">
                        Wybierz plik
                        <input
                            type="file"
                            accept=".txt,.csv"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    {data.time.length > 0 ? (
                        <>
                            <Plot
                                data={[
                                    {
                                        x: data.time,
                                        y: data.signal,
                                        type: "scatter",
                                        mode: "lines",
                                        marker: { color: "blue" },
                                    },
                                ]}
                                layout={{
                                    title: "Sygnał EKG",
                                    xaxis: { title: "Czas [s]" },
                                    yaxis: { title: "Amplituda" },
                                    autosize: true,
                                }}
                                style={{ width: "100%", height: "400px" }}
                            />
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={analyzeSignal}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"
                                >
                                    Analiza
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">Brak danych – wczytaj plik, aby zobaczyć wykres.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signal;
