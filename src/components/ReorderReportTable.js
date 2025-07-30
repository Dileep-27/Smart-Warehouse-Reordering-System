import React from "react";

const ReorderReportTable = ({ reorderReport, isSimulating }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
            {reorderReport.length === 0 ? (
                <div className="bg-white py-4 px-4 text-center text-gray-500 rounded-lg">
                    No products currently need reordering, or no report has been generated.
                </div>
            ) : (
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider rounded-tl-lg">
                                Product Name
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Current Stock
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Avg. Daily Sales
                            </th>
                            {isSimulating && (
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                    Simulated Sales
                                </th>
                            )}
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Days Stock Left
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Suggested Quantity
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Estimated Cost
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider rounded-tr-lg">
                                Reason
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {reorderReport.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.productName}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                                    {item.currentStock}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                                    {item.averageDailySales}
                                </td>
                                {isSimulating && (
                                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                                        {item.simulatedAverageDailySales !== null
                                            ? item.simulatedAverageDailySales.toFixed(2)
                                            : "N/A"}
                                    </td>
                                )}
                                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                                    {item.daysOfStockRemaining}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                                    {item.suggestedQuantity}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                                    ${item.estimatedCost}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                                    {item.reason}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReorderReportTable; 