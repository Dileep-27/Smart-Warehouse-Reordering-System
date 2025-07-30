// Constants for order logic
export const SAFETY_STOCK_BUFFER_DAYS = 5;
export const FUTURE_SALES_COVERAGE_DAYS = 60;

// Calculate stock coverage in days
export const calculateDaysOfStockRemaining = (product) => {
    if (product.averageDailySales <= 0) return Infinity;
    return product.currentStock / product.averageDailySales;
};

// Determine if a product needs reorder
export const needsReorder = (product) => {
    const daysRemaining = calculateDaysOfStockRemaining(product);
    const threshold = product.supplierLeadTime + SAFETY_STOCK_BUFFER_DAYS;
    return daysRemaining <= threshold;
};

// Calculate optimal reorder quantity for a product
export const calculateOptimalReorderQuantity = (product) => {
    const neededForFutureSales = product.averageDailySales * FUTURE_SALES_COVERAGE_DAYS;
    const quantityToOrder = Math.max(0, neededForFutureSales - product.currentStock);
    return Math.ceil(Math.max(product.minimumReorderQuantity, quantityToOrder));
};

// Generate reorder report (optionally simulating demand spike)
export const generateReorderReport = (
    currentProducts,
    isSimulationActive = false,
    selectedProductForSimulation = "",
    simulationMultiplier = 2
) => {
    const report = [];
    currentProducts.forEach((product) => {
        const effectiveAverageDailySales =
            isSimulationActive && product.id === selectedProductForSimulation
                ? product.averageDailySales * simulationMultiplier
                : product.averageDailySales;

        const simulatedProduct = {
            ...product,
            averageDailySales: effectiveAverageDailySales,
        };

        if (needsReorder(simulatedProduct)) {
            const suggestedQuantity = calculateOptimalReorderQuantity(simulatedProduct);
            const estimatedCost = suggestedQuantity * simulatedProduct.costPerUnit;
            report.push({
                productName: product.name,
                productId: product.id,
                suggestedQuantity,
                estimatedCost: estimatedCost.toFixed(2),
                reason: isSimulationActive ? "Demand Spike Simulation" : "Low Stock",
                currentStock: product.currentStock,
                averageDailySales: product.averageDailySales,
                simulatedAverageDailySales:
                    isSimulationActive && product.id === selectedProductForSimulation
                        ? effectiveAverageDailySales
                        : null,
                daysOfStockRemaining: calculateDaysOfStockRemaining(simulatedProduct).toFixed(2),
            });
        }
    });
    return report;
}; 