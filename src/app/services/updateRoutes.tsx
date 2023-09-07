import { RiderWithOrders } from "../../types";
import url from "../config.d";
import axios from "axios";

const optimizedRoutes = async (ridersWithOrders: RiderWithOrders[]) => {
    await axios
        .post(`${url}/route-updated`, {
            payload: ridersWithOrders,
        })
        .then((res) => {
            return res.data;
        });
};

export default optimizedRoutes;
