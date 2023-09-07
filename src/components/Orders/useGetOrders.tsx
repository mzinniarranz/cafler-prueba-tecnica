import { OrderType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../app/services/fetchData";

interface Props {
    staleTime?: number;
}
const useGetOrders = ({ staleTime }: Props) => {
    const {
        data: orders,
        isLoading,
        isError,
    } = useQuery<OrderType[]>(
        ["orders"],
        async () => await fetchData({ endpoint: "/orders" }),
        {
            refetchOnWindowFocus: false,
            staleTime: staleTime || Infinity,
        }
    );

    return { orders, isLoading, isError };
};

export default useGetOrders;
