import { Mutation } from "@tanstack/react-query";

export interface Rider {
    driverId: string;
    driverName: string;
    initialLocation: Location;
}

export interface OrderType {
    orderId: string;
    productName: string;
    price: number;
    deliveryLocation: Location;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface OptimizedRoute {
    routeId: string;
    driverId: string;
    productsToDeliver?: OrderToDeliverEntity[] | null;
}
export interface OrderToDeliverEntity {
    orderId: string;
}

export interface RiderWithOrders {
    driverId: string;
    driverName: string;
    initialLocation: Location;
    productsToDeliver: OrderType[];
}

export interface OptimizedAssignement {
    riderId: string;
    orderId: string;
}

export interface MutationMessage {
    status: "error" | "success" | null;
    message: MutationErrorMessage | MutationSuccessMessage | null;
}

export type MutationErrorMessage =
    "La solicitud enviada al servidor es incorrecta o incompleta.";
export type MutationSuccessMessage = "Pedidos asignados correctamente.";

export type Color = `#${string}`;
