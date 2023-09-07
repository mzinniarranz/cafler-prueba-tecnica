import { MutationMessage, OptimizedRoute, OrderType, Rider } from "../../types";
import { Box, Grid, Typography } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import updateRoutes from "../../app/services/updateRoutes";
import RidersWithOrders from "../DnD/RidersWithOrders";
import SaveRoutes from "./SaveRoutes";
import UnassignedOrders from "./UnassignedOrders";
import useAssignement from "./useAssignement";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
    riders: Rider[];
    optimizedRoutes: OptimizedRoute[];
    orders: OrderType[];
}

const AssignementsPage = ({ riders, optimizedRoutes, orders }: Props) => {
    const {
        ridersWithOrders,
        unassignedOrders,
        setRidersWithOrders,
        setUnassignedOrders,
    } = useAssignement({ riders, orders, optimizedRoutes });

    const { mutate, isLoading, isError, isSuccess, error } = useMutation({
        mutationFn: updateRoutes,
    });
    const axiosError = error as AxiosError;

    if (axiosError?.response?.status === 500) {
        mutate(ridersWithOrders);
    }

    const mutationMessage: MutationMessage = {
        status: isError ? "error" : isSuccess ? "success" : null,
        message: isError
            ? "La solicitud enviada al servidor es incorrecta o incompleta."
            : isSuccess
            ? "Pedidos asignados correctamente."
            : null,
    };

    const handleDrop = (order: OrderType, riderId: string) => {
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

    window.addEventListener("storage", (event) => {
        if (event.key === "ridersWithOrders") {
            const updatedValue = event.newValue;
            if (updatedValue !== null)
                setRidersWithOrders(JSON.parse(updatedValue));
        }
        if (event.key === "unassignedOrders") {
            const updatedValue = event.newValue;
            if (updatedValue !== null)
                setUnassignedOrders(JSON.parse(updatedValue));
        }
    });

    const handleSubmit = () => {
        mutate(ridersWithOrders);
    };

    return (
        <>
            <Typography variant="h4" mt={2} mb={2}>
                Asignación de pedidos
            </Typography>
            <Grid container spacing={4}>
                <DndProvider backend={HTML5Backend}>
                    <Grid item xs={12}>
                        <UnassignedOrders orders={unassignedOrders} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Typography
                                variant="h5"
                                mb={1}
                                mt={"16px"}
                                width={"100%"}
                            >
                                Repartidores y sus pedidos
                            </Typography>
                            <SaveRoutes
                                handleSubmit={handleSubmit}
                                loading={isLoading}
                                mutationMessage={mutationMessage}
                            />
                        </Box>
                        <RidersWithOrders
                            riders={ridersWithOrders}
                            onDrop={handleDrop}
                        />
                    </Grid>
                </DndProvider>
            </Grid>
        </>
    );
};

export default AssignementsPage;
