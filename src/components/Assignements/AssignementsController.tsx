import { Box, Grid, Typography } from "@mui/material";
import "./Assignements.css";
import useGetOptimizedRoutes from "./useGetOptimizedRoutes";
import useGetOrders from "../Orders/useGetOrders";
import useGetRiders from "./useGetRiders";
import AssignementsPage from "./AssignementsPage";

const AssignementsController = () => {
    const { orders } = useGetOrders({
        staleTime: Infinity,
    });

    const {
        optimizedRoutes,
        isLoading: loadingOptimizedRoutes,
        isError: errorOptimizedRoutes,
    } = useGetOptimizedRoutes();

    const {
        riders,
        isLoading: loadingRiders,
        isError: errorRiders,
    } = useGetRiders();

    if (errorOptimizedRoutes || errorRiders) return <>Ha habido un error.</>;
    if (loadingOptimizedRoutes || loadingRiders) return <>Cargando...</>;

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Box
                    sx={{
                        bgcolor: "background.default",
                        gridTemplateColumns: { md: "1fr 1fr" },
                    }}
                >
                    {!optimizedRoutes?.length ||
                    !riders?.length ||
                    !orders?.length ? (
                        <Box>
                            <Typography>
                                Faltan datos para mostrar la tabla
                            </Typography>
                        </Box>
                    ) : (
                        <AssignementsPage
                            optimizedRoutes={optimizedRoutes}
                            riders={riders}
                            orders={orders}
                        />
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default AssignementsController;
