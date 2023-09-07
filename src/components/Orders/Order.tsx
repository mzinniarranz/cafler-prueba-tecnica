import { Box, Divider, Paper } from "@mui/material";
import { OrderType } from "../../types";
import { addThousandsSeparator } from "../Utils/formatting";
import "./Orders.css";
import { useShowLocation } from "../../store/location";

interface Props {
    order: OrderType;
}

const Order = ({ order }: Props) => {
    const { showLocation } = useShowLocation();
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                gridTemplateColumns: { md: "1fr 1fr" },
            }}
        >
            <Paper
                className="paper-order"
                sx={{
                    p: 2,
                }}
            >
                <Box>
                    <strong>{order.productName}</strong>
                </Box>
                <Divider />
                <Box>Precio: {addThousandsSeparator(order.price)}</Box>
                <Box sx={{ display: !showLocation ? "none" : "" }}>
                    Latitud: {order.deliveryLocation.latitude}
                </Box>
                <Box sx={{ display: !showLocation ? "none" : "" }}>
                    Longitud: {order.deliveryLocation.longitude}
                </Box>
            </Paper>
        </Box>
    );
};

export default Order;
