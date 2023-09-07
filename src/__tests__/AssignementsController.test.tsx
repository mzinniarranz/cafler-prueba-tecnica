import React from "react";
import { render, waitFor } from "@testing-library/react";
import AssignementsController from "../components/Assignements/AssignementsController";
import "@testing-library/jest-dom/";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../components/Assignements/useGetOptimizedRoutes", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        optimizedRoutes: [
            {
                routeId: "1",
                driverId: "1",
                productsToDeliver: [
                    {
                        orderId: "1",
                    },
                    {
                        orderId: "2",
                    },
                    {
                        orderId: "3",
                    },
                ],
            },
            {
                routeId: "2",
                driverId: "3",
                productsToDeliver: [
                    {
                        orderId: "7",
                    },
                    {
                        orderId: "9",
                    },
                    {
                        orderId: "8",
                    },
                ],
            },
        ],
        isLoading: false,
        isError: false,
    })),
}));

jest.mock("../components/Orders/useGetOrders", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        orders: [
            {
                orderId: "1",
                productName: "Tuercas",
                price: 1.5,
                deliveryLocation: {
                    latitude: 41.400346647898395,
                    longitude: 2.1675147243502524,
                },
            },
            {
                orderId: "2",
                productName: "Conectores Ethernet",
                price: 5.0,
                deliveryLocation: {
                    latitude: 41.384102849621655,
                    longitude: 2.174398496434488,
                },
            },
        ],
        isLoading: false,
        isError: false,
    })),
}));

jest.mock("../components/Assignements/useGetRiders", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        riders: [
            {
                driverId: "1",
                driverName: "Carl",
                initialLocation: {
                    latitude: 47.62050627107367,
                    longitude: -122.34929885979827,
                },
            },
            {
                driverId: "3",
                driverName: "Andrés",
                initialLocation: {
                    latitude: 10.480611237042043,
                    longitude: -66.89042134597426,
                },
            },
        ],
        isLoading: false,
        isError: false,
    })),
}));

describe("AssignementsController", () => {
    const queryClient = new QueryClient();
    it("renders loading message when loading optimized routes, orders, and riders", async () => {
        jest.requireMock(
            "../components/Assignements/useGetOptimizedRoutes"
        ).default.mockImplementation(() => ({
            optimizedRoutes: [],
            isLoading: true,
            isError: false,
        }));
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <AssignementsController />
            </QueryClientProvider>
        );

        // Assert that loading message is displayed
        expect(getByText("Cargando...")).toBeInTheDocument();
    });

    it("renders error message when there is an error with optimized routes or riders", async () => {
        jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console error
        jest.requireMock(
            "../components/Assignements/useGetOptimizedRoutes"
        ).default.mockImplementation(() => ({
            optimizedRoutes: null,
            isLoading: false,
            isError: true,
        }));
        jest.requireMock(
            "../components/Assignements/useGetRiders"
        ).default.mockImplementation(() => ({
            riders: null,
            isLoading: false,
            isError: true,
        }));

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <AssignementsController />
            </QueryClientProvider>
        );

        // Assert that error message is displayed
        expect(getByText("Ha habido un error.")).toBeInTheDocument();
    });

    it('renders "Faltan datos" message when data is missing', async () => {
        jest.requireMock(
            "../components/Assignements/useGetOptimizedRoutes"
        ).default.mockImplementation(() => ({
            optimizedRoutes: [],
            isLoading: false,
            isError: false,
        }));
        jest.requireMock(
            "../components/Assignements/useGetRiders"
        ).default.mockImplementation(() => ({
            riders: [],
            isLoading: false,
            isError: false,
        }));
        jest.requireMock(
            "../components/Orders/useGetOrders"
        ).default.mockImplementation(() => ({
            orders: [],
            isLoading: false,
            isError: false,
        }));

        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <AssignementsController />
            </QueryClientProvider>
        );

        // Assert that "Faltan datos" message is displayed
        expect(
            getByText("Faltan datos para mostrar la tabla")
        ).toBeInTheDocument();
    });
});
