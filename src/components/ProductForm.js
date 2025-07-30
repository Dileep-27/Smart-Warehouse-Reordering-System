import React, { useState } from "react";

const ProductForm = ({ onSave, onCancel, initialData, savingProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    currentStock: 0,
    averageDailySales: 0,
    supplierLeadTime: 0,
    minimumReorderQuantity: 0,
    costPerUnit: 0,
    criticality: "medium",
    ...(initialData || {}),
  });

  // Update product state on input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Validate and submit product data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name.trim()) {
      alert("Product Name is required.");
      return;
    }
    if (
      product.currentStock < 0 ||
      product.averageDailySales < 0 ||
      product.supplierLeadTime < 0 ||
      product.minimumReorderQuantity < 0 ||
      product.costPerUnit < 0
    ) {
      alert(
        "All numeric fields (Stock, Sales, Lead Time, Reorder Quantity, Cost) must be non-negative."
      );
      return;
    }
    onSave(product);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          {initialData ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="currentStock"
              className="block text-sm font-medium text-gray-700"
            >
              Current Stock Level
            </label>
            <input
              type="number"
              id="currentStock"
              name="currentStock"
              value={product.currentStock}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="0"
              required
            />
          </div>
          <div>
            <label
              htmlFor="averageDailySales"
              className="block text-sm font-medium text-gray-700"
            >
              Average Daily Sales (past 30 days)
            </label>
            <input
              type="number"
              id="averageDailySales"
              name="averageDailySales"
              value={product.averageDailySales}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="0"
              required
            />
          </div>
          <div>
            <label
              htmlFor="supplierLeadTime"
              className="block text-sm font-medium text-gray-700"
            >
              Supplier Lead Time (Days)
            </label>
            <input
              type="number"
              id="supplierLeadTime"
              name="supplierLeadTime"
              value={product.supplierLeadTime}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="0"
              required
            />
          </div>
          <div>
            <label
              htmlFor="minimumReorderQuantity"
              className="block text-sm font-medium text-gray-700"
            >
              Minimum Reorder Quantity
            </label>
            <input
              type="number"
              id="minimumReorderQuantity"
              name="minimumReorderQuantity"
              value={product.minimumReorderQuantity}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="0"
              required
            />
          </div>
          <div>
            <label
              htmlFor="costPerUnit"
              className="block text-sm font-medium text-gray-700"
            >
              Cost Per Unit ($)
            </label>
            <input
              type="number"
              id="costPerUnit"
              name="costPerUnit"
              value={product.costPerUnit}
              onChange={handleChange}
              step="0.01"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="0"
              required
            />
          </div>
          <div>
            <label
              htmlFor="criticality"
              className="block text-sm font-medium text-gray-700"
            >
              Criticality Level
            </label>
            <select
              id="criticality"
              name="criticality"
              value={product.criticality}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="essential">Essential</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={savingProduct}
              className={`font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${savingProduct
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
            >
              {savingProduct ? "Saving..." : initialData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm; 