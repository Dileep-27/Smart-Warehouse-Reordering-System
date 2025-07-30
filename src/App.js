import React, { useState, useCallback } from "react";
import ProductForm from "./components/ProductForm";
import InventoryTable from "./components/InventoryTable";
import ReorderReportTable from "./components/ReorderReportTable";
import SimulationControls from "./components/SimulationControls";
import MessageAlert from "./components/MessageAlert";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  calculateDaysOfStockRemaining,
  needsReorder,
  generateReorderReport,
} from "./utils/warehouseCalculations";

// Main App Component
const App = () => {
  const [products, setProducts] = useLocalStorage("products", []);
  const [reorderReport, setReorderReport] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedProductForSimulation, setSelectedProductForSimulation] = useState("");
  const [simulationMultiplier, setSimulationMultiplier] = useState(2);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Generate reorder report (optionally simulating demand spike)
  const handleGenerateReorderReport = useCallback(
    (currentProducts, isSimulationActive = false) => {
      const report = generateReorderReport(
        currentProducts,
        isSimulationActive,
        selectedProductForSimulation,
        simulationMultiplier
      );
      setReorderReport(report);
      setMessage(isSimulationActive ? "Simulation report generated successfully!" : "Reorder report generated successfully!");
    },
    [selectedProductForSimulation, simulationMultiplier]
  );

  // Save or update a product entry
  const handleSaveProduct = (productData) => {
    setSavingProduct(true);
    setMessage("");
    setTimeout(() => {
      setProducts((prev) => {
        if (productData.id) {
          return prev.map((p) => (p.id === productData.id ? { ...productData } : p));
        } else {
          const newProduct = { ...productData, id: Date.now().toString() };
          return [...prev, newProduct];
        }
      });
      setShowProductForm(false);
      setEditingProduct(null);
      setMessage(productData.id ? "Product updated successfully!" : "Product added successfully!");
      setSavingProduct(false);
    }, 500);
  };

  // Delete a product by ID with confirmation
  const handleDeleteProduct = (productId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    )
      return;
    setDeletingProduct(productId);
    setTimeout(() => {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setMessage("Product deleted successfully!");
      setDeletingProduct(null);
    }, 500);
  };

  // Show add product form
  const handleAddProductClick = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  // Edit existing product
  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  // Close form modal
  const handleCloseProductForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  // Simulate a demand spike for selected product
  const handleSimulateDemand = () => {
    if (!selectedProductForSimulation) {
      setMessage("Please select a product to simulate demand for.");
      return;
    }
    setIsSimulating(true);
    handleGenerateReorderReport(products, true);
  };

  // Reset simulation to original values
  const resetSimulation = () => {
    setIsSimulating(false);
    setSelectedProductForSimulation("");
    setSimulationMultiplier(2);
    handleGenerateReorderReport(products, false);
    setMessage("Simulation reset. Report updated with original data.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          Smart Warehouse Reordering System (Local State)
        </h1>

        <MessageAlert message={message} onClose={() => setMessage("")} />

        <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 text-sm">
            Data stored locally in browser (localStorage).
          </p>
          <button
            onClick={handleAddProductClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add New Product
          </button>
        </div>

        {showProductForm && (
          <ProductForm
            onSave={handleSaveProduct}
            onCancel={handleCloseProductForm}
            initialData={editingProduct}
            savingProduct={savingProduct}
          />
        )}

        {/* Inventory Table */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Current Inventory
        </h2>
        <InventoryTable
          products={products}
          calculateDaysOfStockRemaining={calculateDaysOfStockRemaining}
          needsReorder={needsReorder}
          onEditProduct={handleEditProductClick}
          onDeleteProduct={handleDeleteProduct}
          deletingProduct={deletingProduct}
        />

        {/* Reorder Report & Simulation Controls */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Reorder Report & Simulation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Generate Reorder Report
            </h3>
            <p className="text-gray-600 mb-4">
              Click the button below to generate a report of all products that need
              reordering based on current stock levels and sales.
            </p>
            <button
              onClick={() => handleGenerateReorderReport(products, false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Generate Reorder Report
            </button>
          </div>

          <SimulationControls
            products={products}
            selectedProductForSimulation={selectedProductForSimulation}
            setSelectedProductForSimulation={setSelectedProductForSimulation}
            simulationMultiplier={simulationMultiplier}
            setSimulationMultiplier={setSimulationMultiplier}
            onSimulateDemand={handleSimulateDemand}
            onResetSimulation={resetSimulation}
            isSimulating={isSimulating}
          />
        </div>

        {/* Reorder Report Table */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Reorder Report
        </h2>
        <ReorderReportTable reorderReport={reorderReport} isSimulating={isSimulating} />
      </div>
    </div>
  );
};

export default App;
