import React from "react";

const InventoryTable = ({ 
  products, 
  calculateDaysOfStockRemaining, 
  needsReorder, 
  onEditProduct, 
  onDeleteProduct, 
  deletingProduct 
}) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md mb-8">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider rounded-tl-lg">
              Product Name
            </th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Stock
            </th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Avg. Sales / Day
            </th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Lead Time (Days)
            </th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Days Stock Left
            </th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Reorder Needed?
            </th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider rounded-tr-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                No products added yet. Please add a product to get started.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                  {product.currentStock}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                  {product.averageDailySales}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                  {product.supplierLeadTime}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                  {calculateDaysOfStockRemaining(product) === Infinity
                    ? "∞"
                    : calculateDaysOfStockRemaining(product).toFixed(2)}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      needsReorder(product)
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {needsReorder(product) ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEditProduct(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    title="Edit Product"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    disabled={deletingProduct === product.id}
                    className={`${
                      deletingProduct === product.id
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-600 hover:text-red-900"
                    }`}
                    title="Delete Product"
                  >
                    {deletingProduct === product.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable; 