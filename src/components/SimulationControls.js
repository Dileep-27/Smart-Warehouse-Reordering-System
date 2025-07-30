import React from "react";

const SimulationControls = ({
    products,
    selectedProductForSimulation,
    setSelectedProductForSimulation,
    simulationMultiplier,
    setSimulationMultiplier,
    onSimulateDemand,
    onResetSimulation,
    isSimulating,
}) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Simulate Demand Spike</h3>
            <p className="text-gray-600 mb-4">
                Simulate a sudden increase in demand for a specific product and see how it
                affects reorder recommendations.
            </p>
            <div className="mb-4">
                <label
                    htmlFor="productSelect"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Select Product:
                </label>
                <select
                    id="productSelect"
                    value={selectedProductForSimulation}
                    onChange={(e) => setSelectedProductForSimulation(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                >
                    <option value="">-- Select a Product --</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="multiplier"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Sales Multiplier (e.g., 2 for double sales):
                </label>
                <input
                    type="number"
                    id="multiplier"
                    value={simulationMultiplier}
                    onChange={(e) => setSimulationMultiplier(Number(e.target.value))}
                    min="1"
                    className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="flex space-x-3">
                <button
                    onClick={onSimulateDemand}
                    disabled={!selectedProductForSimulation}
                    className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${!selectedProductForSimulation ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    Simulate Demand
                </button>
                {isSimulating && (
                    <button
                        onClick={onResetSimulation}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Reset Simulation
                    </button>
                )}
            </div>
        </div>
    );
};

export default SimulationControls; 