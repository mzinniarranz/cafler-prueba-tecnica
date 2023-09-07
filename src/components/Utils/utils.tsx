import { Color } from "../../types";

export const CAFLER_COLOR: Color = "#59f89c";

// Lógica para calcular la ruta más óptima para cada repartidor
// export const calculateDistance = (
//     lat1: number,
//     lon1: number,
//     lat2: number,
//     lon2: number
// ) => {
//     const R = 6371; // Radio de la tierra en kilometros
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(lat1 * (Math.PI / 180)) *
//             Math.cos(lat2 * (Math.PI / 180)) *
//             Math.sin(dLon / 2) *
//             Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // distancia entre dos puntos en kilometros
//     return distance;
// };

// export const calculateDistanceForEachRider = (
//     riders: Rider[],
//     orders: OrderType[]
// ) => {
//     // Iterate through each rider
//     const distances = riders.map((rider) => {
//         // Iterate through each order to find the closest one
//         const orderDistances = orders.map((order) => {
//             const distance = calculateDistance(
//                 rider.initialLocation.latitude,
//                 rider.initialLocation.longitude,
//                 order.deliveryLocation.latitude,
//                 order.deliveryLocation.longitude
//             );

//             return {
//                 distance,
//                 riderId: rider.driverId,
//                 orderId: order.orderId,
//             };
//         });

//         return orderDistances;
//     });
//     return distances;
// };

// export const getOptimizedAssignement = (
//     riders: Rider[],
//     orders: OrderType[]
// ) => {
//     const distances = calculateDistanceForEachRider(riders, orders);

//     const optimizedAssignement = [];

//     // Iterate through each index (position) in the distances arrays
//     for (let i = 0; i < distances[0].length; i++) {
//         let minDistance = Number.MAX_VALUE;
//         let selectedRiderId = null;
//         let selectedOrderId = null;

//         // Iterate through the arrays of distances for each rider
//         for (const distance of distances) {
//             const currentDistance = distance[i].distance;
//             const currentRiderId = distance[i].riderId;
//             const currentOrderId = distance[i].orderId;

//             // Update the minimum distance and corresponding riderId and orderId if it's smaller
//             if (currentDistance < minDistance) {
//                 minDistance = currentDistance;
//                 selectedRiderId = currentRiderId;
//                 selectedOrderId = currentOrderId;
//             }
//         }

//         // Push the result for the current index into the results array
//         optimizedAssignement.push({
//             riderId: selectedRiderId,
//             orderId: selectedOrderId,
//         });
//     }
//     return optimizedAssignement;
// };
