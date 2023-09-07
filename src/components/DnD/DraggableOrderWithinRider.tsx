import { OrderType } from "../../types";
import { useDrag } from "react-dnd";
import { Box } from "@mui/material";
import Order from "../Orders/Order";

interface Props {
    order: OrderType;
}
const DraggableOrderWithinRider = ({ order }: Props) => {
    const [, drag] = useDrag({
        type: "ORDER",
        item: { ...order },
    });

    return (
        <Box
            key={order.orderId}
            mb={1}
            ref={drag}
            style={{
                cursor: "move",
            }}
        >
            <Order order={order} />
        </Box>
    );
};

export default DraggableOrderWithinRider;
