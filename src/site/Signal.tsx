import React, { useState } from "react";
import Plot from "react-plotly.js";
import { useNavigate, Link } from "react-router-dom";
import { doc, updateDoc, increment } from "firebase/firestore";
import { auth, db } from "../firebase";

function Signal() {
    const [data, setData] = useState<{ time: number[]; signal: number[] }>({ time: [], signal: [] });
    const [error, setError] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const navigate = useNavigate();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== "string") throw new Error("Could not read file as text.");

                const lines = text.trim().split("\n").slice(1); // Skip header if present
                const time: number[] = [];
                const signal: number[] = [];

                lines.forEach((line) => {
                    let separator: string | RegExp = ",";
                    if (line.includes(";")) separator = ";";
                    else if (line.includes("\t")) separator = "\t";
                    else if (line.includes(" ")) separator = /\s+/;

                    const [t, s] = line.trim().split(separator);
                    const parsedT = parseFloat(t);
                    const parsedS = parseFloat(s);
                    if (!isNaN(parsedT) && !isNaN(parsedS)) {
                        time.push(parsedT);
                        signal.push(parsedS);
                    }
                });

                if (time.length === 0 || signal.length === 0) throw new Error("File has incorrect parameters.");

                setData({ time, signal });
                setError("");
            } catch (err) {
                setError("Analyze was unsuccessful. Make sure the file format is correct (.txt or .csv with two columns).");
            }
        };

        reader.readAsText(file);
    };

    const analyzeSignal = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/analyze-ecg", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ecg_data: data, sampling_rate: 250 }),
            });

            if (!response.ok) throw new Error("Error during analysis.");

            const results = await response.json();
            navigate("/analize", { state: { data, results } });

            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const today = new Date().toISOString().split("T")[0];
                await updateDoc(userDocRef, {
                    signalsCount: increment(1),
                    lastAnalysisDate: today,
                });
            }
        } catch (error) {
            console.error("Analyze error:", error);
            setError("Signal analysis was unsuccessful.");
        }
    };

    return (
        <div className="h-[100vh] bg-gray-100 flex items-center justify-center p-4 relative">
            {/* Hamburger Menu */}
            <div className="absolute top-5 right-5 z-50">
                <div
                    className="bg-white rounded-full w-14 h-14 flex items-center justify-center cursor-pointer shadow-lg"
                    onClick={toggleMenu}
                >
                    <div className="flex flex-col gap-1">
                        <div className="w-7 h-1 bg-[#0d0f1a] rounded"></div>
                        <div className="w-7 h-1 bg-[#0d0f1a] rounded"></div>
                        <div className="w-7 h-1 bg-[#0d0f1a] rounded"></div>
                    </div>
                </div>

                {menuOpen && (
                    <div className="absolute top-20 right-0 w-60 bg-gradient-to-r from-purple-700 to-pink-500 rounded-2xl p-6 flex flex-col gap-4 shadow-xl z-50">
                        <Link
                            to="/About"
                            className="flex items-center bg-white bg-opacity-20 rounded-xl px-5 py-3 text-lg font-medium hover:bg-opacity-40 transition"
                        >
                            <img src="src/site/welcome-back.png" alt="About" className="w-6 h-6 mr-3" />
                            About us
                        </Link>
                        <Link
                            to="/avatar"
                            className="flex items-center bg-white bg-opacity-20 rounded-xl px-5 py-3 text-lg font-medium hover:bg-opacity-40 transition"
                        >
                            <img src="src/site/user.png" alt="Profile" className="w-6 h-6 mr-3" />
                            My profile
                        </Link>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Upload ECG signal file (.txt or .csv)
                </h2>
                <div className="flex justify-center mb-6">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl cursor-pointer transition duration-300">
                        Choose file
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
                                    title: "ECG Signal",
                                    xaxis: { title: "Time [s]" },
                                    yaxis: { title: "Amplitude" },
                                    autosize: true,
                                }}
                                style={{ width: "100%", height: "390px" }}
                            />
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={analyzeSignal}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"
                                >
                                    Analyze
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">
                            No data — upload a file to see the chart.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signal;
