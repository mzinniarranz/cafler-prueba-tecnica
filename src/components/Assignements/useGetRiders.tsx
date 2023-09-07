import { Rider } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../app/services/fetchData";

const useGetRiders = () => {
    const {
        data: riders,
        isError,
        isLoading,
    } = useQuery<Rider[]>(
        ["riders"],
        async () => await fetchData({ endpoint: "/riders" }),
        {
            refetchOnWindowFocus: false,
        }
    );

    return { riders, isError, isLoading };
};

export default useGetRiders;
