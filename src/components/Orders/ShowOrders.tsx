import { Box, Button, Grid, Typography } from "@mui/material";
import Order from "./Order";
import { Link } from "react-router-dom";
import useGetOrders from "./useGetOrders";

const ShowOrders = () => {
    const { orders, isLoading, isError } = useGetOrders({
        staleTime: 1000 * 60,
    });

    if (isLoading) return <Typography>Cargando...</Typography>;
    if (isError) return <Typography>Ha habido un error</Typography>;
    if (!orders || !orders.length)
        return <Typography>No hay pedidos</Typography>;

    localStorage.clear();

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box mt={3}>
                        <Link to={`/assignment`}>
                            <Button variant="contained" className={"btn"}>
                                Asignar
                            </Button>
                        </Link>
                    </Box>
                </Grid>

                {orders.map((order) => (
                    <Grid key={order.orderId} item xs={12} sm={6} md={4} lg={3}>
                        <Order order={order} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ShowOrders;
