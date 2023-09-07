import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DraggableOrder from "../DnD/DraggableOrder";
import NoDataAlert from "../ToastAlerts/NoDataAlert";
import { OrderType } from "../../types";

interface Props {
    orders: OrderType[];
}

const UnassignedOrders = ({ orders }: Props) => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
                mb={1}
            >
                <Typography variant="h5" mr={1}>
                    Pedidos sin asignar
                </Typography>
                <Tooltip
                    placement="right"
                    title="Estos elementos se pueden arrastrar a las listas de los repartidores"
                >
                    <IconButton>
                        <InfoIcon sx={{ fontSize: 18 }} color={"primary"} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Grid container spacing={4}>
                {!orders.length ? (
                    <Grid item xs={12}>
                        <NoDataAlert
                            message={"No hay más pedidos para asignar"}
                        />
                    </Grid>
                ) : (
                    orders.map((order) => (
                        <Grid
                            key={order.orderId}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <DraggableOrder key={order.orderId} order={order} />
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
};

export default UnassignedOrders;
