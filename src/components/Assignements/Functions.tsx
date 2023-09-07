import { OrderType, RiderWithOrders } from "../../types";

export const handleDrop = (
    order: OrderType,
    riderId: string,
    ridersWithOrders: RiderWithOrders[],
    unassignedOrders: OrderType[],
    setUnassignedOrders: React.Dispatch<React.SetStateAction<OrderType[]>>,
    setRidersWithOrders: React.Dispatch<React.SetStateAction<RiderWithOrders[]>>
) => {
    const previousRider = ridersWithOrders.find((rider) =>
        rider.productsToDeliver.find(
            (product) => product.orderId === order.orderId
        )
    )?.driverId;

    const updatedRiders = ridersWithOrders.map((rider) => {
        if (rider.driverId === riderId) {
            return {
                ...rider,
                productsToDeliver: [...rider.productsToDeliver, order],
            };
        }
        return rider;
    });
    let newUpdatedRiders = [...updatedRiders];
    if (previousRider) {
        if (previousRider !== riderId) {
            newUpdatedRiders = updatedRiders.map((rider) => {
                if (rider.driverId === previousRider) {
                    const newProducts = rider.productsToDeliver.filter(
                        (product) => product.orderId !== order.orderId
                    );
                    return { ...rider, productsToDeliver: newProducts };
                }
                return { ...rider };
            });
        }
    } else {
        const updatedUnassignedOrders = unassignedOrders.filter(
            (o) => o.orderId !== order.orderId
        );
        setUnassignedOrders(updatedUnassignedOrders);
        localStorage.setItem(
            "unassignedOrders",
            JSON.stringify([...updatedUnassignedOrders])
        );
    }

    setRidersWithOrders(newUpdatedRiders);
    localStorage.setItem(
        "ridersWithOrders",
        JSON.stringify([...newUpdatedRiders])
    );
};
