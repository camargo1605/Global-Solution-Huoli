import React from "react";

export default function ConsumptionReport() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-8 m-4">
                <h2 className="text-xl font-bold mb-4 text-center">Consumption Report Screen</h2>
                {/* Placeholder for the pie chart */}
                <div className="w-full h-64 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">Pie Chart Placeholder</span>
                </div>
                <div className="mt-8">
                    <p className="text-lg font-medium">Device Consumption: 352.40 kWh</p>
                    <p className="text-lg font-medium">Average Consumption Limit: 467.0 kWh</p>
                    <p className="text-lg font-bold mt-2">Total: 243.50 kWh</p>
                    <p className="text-lg font-medium mt-2">Average Consumption: 402.6 kWh</p>
                </div>
                <button className="bg-green-600 text-white py-3 px-6 rounded-md mt-6 hover:bg-green-700 transition duration-300">
                    Remove/Adjust
                </button>
            </div>

            <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-8 m-4">
                <h2 className="text-xl font-bold mb-4 text-center">Consumption Report</h2>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border-b-2 py-2 text-left">Appliances</th>
                            <th className="border-b-2 py-2 text-right">Avg Consumption</th>
                            <th className="border-b-2 py-2 text-right">Usage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sample Data Rows */}
                        {Array.from({ length: 5 }, (_, i) => (
                            <tr key={i}>
                                <td className="py-2 border-b">Device {i + 1}</td>
                                <td className="py-2 border-b text-right">{(Math.random() * 20).toFixed(2)} kWh</td>
                                <td className="py-2 border-b text-right">{Math.floor(Math.random() * 100)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-8 m-4">
                <h2 className="text-xl font-bold mb-4 text-center">Personalized Tips</h2>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <span className="bg-green-500 w-6 h-6 rounded-full mr-3 flex items-center justify-center text-white font-bold">✓</span>
                        Device X consumes a lot, consider reducing usage.
                    </li>
                    <li className="flex items-center">
                        <span className="bg-green-500 w-6 h-6 rounded-full mr-3 flex items-center justify-center text-white font-bold">✓</span>
                        Device Y consumes a lot, consider reducing usage.
                    </li>
                    <li className="flex items-center">
                        <span className="bg-green-500 w-6 h-6 rounded-full mr-3 flex items-center justify-center text-white font-bold">✓</span>
                        New device registration is available.
                    </li>
                </ul>
            </div>
        </div>
    );
}
