import React, { useEffect, useState } from "react";
import { OptimizedRoute, OrderType, Rider, RiderWithOrders } from "../../types";

interface Props {
    riders: Rider[];
    orders: OrderType[];
    optimizedRoutes: OptimizedRoute[];
}
const useAssignement = ({ riders, orders, optimizedRoutes }: Props) => {
    const [ridersWithOrders, setRidersWithOrders] = useState<RiderWithOrders[]>(
        []
    );
    const [unassignedOrders, setUnassignedOrders] = useState<OrderType[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const localRidersWithOrdersString =
            localStorage.getItem("ridersWithOrders");
        const localUnassignedOrdersString =
            localStorage.getItem("unassignedOrders");

        let ridersWithOrdersHasValue = false;
        let unassignedOrdersHasValue = false;

        if (localRidersWithOrdersString !== null) {
            ridersWithOrdersHasValue = true;
            setRidersWithOrders([...JSON.parse(localRidersWithOrdersString)]);
        }

        if (localUnassignedOrdersString !== null) {
            unassignedOrdersHasValue = true;
            setUnassignedOrders([...JSON.parse(localUnassignedOrdersString)]);
        }

        if (!ridersWithOrdersHasValue) {
            // Creamos un map de drivers y sus datos iniciales
            // Map nos permite crear una colección de objetos y usar sus métodos para acceder y a ellos
            const ridersMap = new Map();

            riders.forEach((rider) => {
                ridersMap.set(rider.driverId, {
                    driverName: rider.driverName,
                    initialLocation: rider.initialLocation,
                    productsToDeliver: [],
                });
            });

            // Añadimos las orders a cada rider
            optimizedRoutes.forEach((route) => {
                const driverId = route.driverId;
                const productsToDeliver = route.productsToDeliver?.map(
                    (product) => {
                        const order = orders.find(
                            (order) => order.orderId === product.orderId
                        );
                        if (order) {
                            const deliveryLocation = order.deliveryLocation;
                            return {
                                orderId: order.orderId,
                                productName: order.productName,
                                price: order.price,
                                deliveryLocation,
                            };
                        }
                        return null; // No se encontró la orden (unassigned)
                    }
                );

                if (ridersMap.has(driverId) && productsToDeliver) {
                    ridersMap
                        .get(driverId)
                        .productsToDeliver.push(...productsToDeliver);
                }
            });

            const newRidersWithOrders: RiderWithOrders[] = [];

            // Convertimos el map de drivers a un array
            ridersMap.forEach((driver, driverId) => {
                const riderWithOrders = {
                    driverId,
                    driverName: driver.driverName,
                    initialLocation: driver.initialLocation,
                    productsToDeliver: driver.productsToDeliver,
                };

                newRidersWithOrders.push(riderWithOrders);
            });
            setRidersWithOrders([...newRidersWithOrders]);
            localStorage.setItem(
                "riderWithOrders",
                JSON.stringify([...newRidersWithOrders])
            );
            if (!unassignedOrdersHasValue) {
                const newUnassignedOrders: OrderType[] = [];

                // Vemos que ordenes no están asignadas con "some", un método que nos dice si el array contiene el elemento almenos una vez. Devuelve un booleano
                orders?.forEach((order) => {
                    const assigned = newRidersWithOrders.some((rider) =>
                        rider.productsToDeliver?.some(
                            (product) => product.orderId === order?.orderId
                        )
                    );

                    if (!assigned) {
                        newUnassignedOrders.push(order);
                    }
                });
                setUnassignedOrders([...newUnassignedOrders]);
                localStorage.setItem(
                    "unassignedOrders",
                    JSON.stringify([...newUnassignedOrders])
                );
            }
        }
    }, [riders, optimizedRoutes, orders]);

    return {
        ridersWithOrders,
        unassignedOrders,
        loading,
        setLoading,
        setRidersWithOrders,
        setUnassignedOrders,
    };
};

export default useAssignement;
