import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AssignementsPage from "../components/Assignements/AssignementsPage";
import "@testing-library/jest-dom/";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

jest.mock("../components/Assignements/useAssignement", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        ridersWithOrders: [],
        unassignedOrders: [],
        setRidersWithOrders: jest.fn(),
        setUnassignedOrders: jest.fn(),
    })),
}));

jest.mock("@tanstack/react-query", () => ({
    useMutation: jest.fn(() => ({
        mutate: jest.fn(),
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
    })),
}));

describe("AssignementsPage", () => {
    it("renders the page with initial state", async () => {
        const { getByText } = render(
            <AssignementsPage riders={[]} optimizedRoutes={[]} orders={[]} />
        );
        expect(getByText("Asignación de pedidos")).toBeInTheDocument();
    });

    it("handles order drag-and-drop", () => {
        const mockUseAssignement = jest.requireMock(
            "../components/Assignements/useAssignement"
        ).default;
        mockUseAssignement.mockImplementation(() => ({
            ridersWithOrders: [
                {
                    driverId: "1",
                    driverName: "Carl",
                    initialLocation: {
                        latitude: 47.62050627107367,
                        longitude: -122.34929885979827,
                    },
                    productsToDeliver: [
                        {
                            orderId: "1",
                            productName: "Tuercas",
                            price: 1.5,
                            deliveryLocation: {
                                latitude: 41.400346647898395,
                                longitude: 2.1675147243502524,
                            },
                        },
                    ],
                },
            ],
            unassignedOrders: [
                {
                    deliveryLocation: {
                        latitude: 47.63284130847643,
                        longitude: -122.35202055409594,
                    },
                    orderId: "4",
                    price: 89000,
                    productName: "Commercial displays",
                },
            ],
            setRidersWithOrders: jest.fn(),
            setUnassignedOrders: jest.fn(),
        }));

        const { getByText } = render(
            <DndProvider backend={HTML5Backend}>
                <AssignementsPage
                    riders={[
                        {
                            driverId: "1",
                            driverName: "Carl",
                            initialLocation: {
                                latitude: 47.62050627107367,
                                longitude: -122.34929885979827,
                            },
                        },
                    ]}
                    optimizedRoutes={[
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
                        {
                            routeId: "3",
                            driverId: "2",
                            productsToDeliver: [
                                {
                                    orderId: "6",
                                },
                                {
                                    orderId: "4",
                                },
                                {
                                    orderId: "5",
                                },
                            ],
                        },
                    ]}
                    orders={[
                        {
                            deliveryLocation: {
                                latitude: 47.63284130847643,
                                longitude: -122.35202055409594,
                            },
                            orderId: "4",
                            price: 89000,
                            productName: "Commercial displays",
                        },
                    ]}
                />
            </DndProvider>
        );

        const orderElement = getByText("Tuercas");
        const riderElement = getByText("Carl");

        const droppableId = riderElement.getAttribute("data-rbd-droppable-id");

        fireEvent.dragStart(orderElement);
        fireEvent.drop(riderElement);

        expect.arrayContaining([{ driverId: droppableId }]);
    });

    it("handles routes submission correctly", async () => {
        const mockUseAssignement = jest.requireMock(
            "../components/Assignements/useAssignement"
        ).default;
        mockUseAssignement.mockImplementation(() => ({
            ridersWithOrders: [],
            unassignedOrders: [],
            setRidersWithOrders: jest.fn(),
            setUnassignedOrders: jest.fn(),
        }));

        const mockUseMutation = jest.requireMock(
            "@tanstack/react-query"
        ).useMutation;
        const mutateMock = jest.fn();
        mockUseMutation.mockImplementation(() => ({
            mutate: mutateMock,
            isLoading: false,
            isError: false,
            isSuccess: false,
            error: null,
        }));

        const { getByText } = render(
            <AssignementsPage riders={[]} optimizedRoutes={[]} orders={[]} />
        );

        fireEvent.click(getByText("Guardar cambios"));

        expect(mutateMock).toHaveBeenCalledWith(expect.any(Array));
    });
});
