import { OrderType, RiderWithOrders } from "../../types";
import { useDrop } from "react-dnd";
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import DraggableOrderWithinRider from "./DraggableOrderWithinRider";
import { CAFLER_COLOR } from "../Utils/utils";

interface Props {
    rider: RiderWithOrders;
    onDrop: (order: OrderType, riderId: string) => void;
}
const Rider = ({ rider, onDrop }: Props) => {
    const [{ isOver, highlighted }, drop] = useDrop({
        accept: "ORDER",
        drop: (item: OrderType) => onDrop(item, rider.driverId),
        collect: (monitor) => ({
            highlighted: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });

    return (
        <Card variant="outlined" ref={drop}>
            <CardContent
                style={{
                    border: isOver
                        ? "2px dashed " + CAFLER_COLOR
                        : highlighted
                        ? "2px dashed #ccc"
                        : "2px solid transparent",

                    opacity: highlighted ? 0.7 : 1,
                }}
            >
                <Typography variant="h5">{rider.driverName}</Typography>
                <Divider />
                <Stack mt={1}>
                    {rider.productsToDeliver?.map((order) => (
                        <DraggableOrderWithinRider
                            key={order.orderId}
                            order={order}
                        />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Rider;
