import { OptimizedRoute } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../app/services/fetchData";

const useGetOptimizedRoutes = () => {
    const {
        data: optimizedRoutes,
        isError,
        isLoading,
    } = useQuery<OptimizedRoute[]>(
        ["optimized-routes"],
        async () => await fetchData({ endpoint: "/optimized-routes" }),
        {
            refetchOnWindowFocus: false,
        }
    );

    return { optimizedRoutes, isError, isLoading };
};

export default useGetOptimizedRoutes;
