import axios from "axios";
import url from "../config.d";

interface Props {
    endpoint: `/${string}`;
}
export const fetchData = async ({ endpoint }: Props) => {
    return await axios.get(`${url}${endpoint}`).then((res) => {
        return res.data;
    });
};
