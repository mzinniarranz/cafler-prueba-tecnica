import { OrderType, RiderWithOrders } from "../../types";
import { Grid } from "@mui/material";
import Rider from "./Rider";

interface Props {
    riders: RiderWithOrders[];
    onDrop: (order: OrderType, riderId: string) => void;
}
const RidersWithOrders = ({ riders, onDrop }: Props) => {
    return (
        <Grid container spacing={4}>
            {riders.map((rider) => (
                <Grid key={rider.driverId} item xs={12} sm={6} md={4}>
                    <Rider rider={rider} onDrop={onDrop} />
                </Grid>
            ))}
        </Grid>
    );
};
export default RidersWithOrders;
