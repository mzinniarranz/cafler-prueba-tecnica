import { OrderType } from "../../types";
import { useDrag } from "react-dnd";
import Order from "../Orders/Order";

const DraggableOrder = ({ order }: { order: OrderType }) => {
    const [, drag] = useDrag({
        type: "ORDER",
        item: order,
    });

    return (
        <div ref={drag} style={{ cursor: "move" }}>
            <Order order={order} />
        </div>
    );
};

export default DraggableOrder;
