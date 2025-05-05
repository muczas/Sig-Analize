import React from "react";
import { useLocation } from "react-router-dom";
import Plot from "react-plotly.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Analize = () => {
    const location = useLocation();
    const { data, results } = location.state || { data: { time: [], signal: [] }, results: {} };

    const generatePDF = () => {
        console.log("PDF generowanie rozpoczęte");
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Wyniki analizy EKG", 14, 20);

        const tableData = Object.entries(results).map(([key, value]) => [key, JSON.stringify(value)]);

        autoTable(doc, {
            head: [["Parametr", "Wartość"]],
            body: tableData,
            startY: 30,
        });

        doc.save("wyniki_ekg.pdf");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Wyniki analizy EKG</h1>

                {data.time.length > 0 && (
                    <div className="mb-6">
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
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {Object.entries(results).map(([key, value]) => (
                        <div key={key} className="bg-blue-50 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold">{key}</h2>
                            <p>{String(value)}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={generatePDF}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"
                    >
                        Pobierz PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Analize;
