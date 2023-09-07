import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import ShowOrders from "../components/Orders/ShowOrders";
import { MemoryRouter } from "react-router-dom";

jest.mock("../components/Orders/useGetOrders", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        orders: undefined,
        isLoading: true,
        isError: false,
    })),
}));

describe("ShowOrders component", () => {
    it("should render a loading message when orders are being fetched", () => {
        const { getByText } = render(
            <MemoryRouter>
                <ShowOrders />
            </MemoryRouter>
        );

        expect(getByText("Cargando...")).toBeInTheDocument();
    });

    it("renders error message when there is an error", async () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        jest.requireMock(
            "../components/Orders/useGetOrders"
        ).default.mockImplementation(() => ({
            orders: null,
            isLoading: false,
            isError: true,
        }));

        const { getByText } = render(<ShowOrders />);

        expect(getByText("Ha habido un error")).toBeInTheDocument();
    });

    it('renders "No hay pedidos" message when there are no orders', async () => {
        jest.requireMock(
            "../components/Orders/useGetOrders"
        ).default.mockImplementation(() => ({
            orders: [],
            isLoading: false,
            isError: false,
        }));

        const { getByText } = render(
            <MemoryRouter>
                <ShowOrders />
            </MemoryRouter>
        );

        expect(getByText("No hay pedidos")).toBeInTheDocument();
    });

    it('renders orders and the "Asignar" button when data is loaded', async () => {
        jest.requireMock(
            "../components/Orders/useGetOrders"
        ).default.mockImplementation(() => ({
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
        }));
        const { getByText } = render(
            <MemoryRouter>
                <ShowOrders />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(getByText("Tuercas")).toBeInTheDocument();
            expect(getByText("Conectores Ethernet")).toBeInTheDocument();
            expect(getByText("Asignar")).toBeInTheDocument();
        });
    });
});
