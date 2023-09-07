import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/";
import Navbar from "../components/Navbar/Navbar";
import { MemoryRouter } from "react-router-dom";
import Logo from "../components/Navbar/Logo";
import Routes from "../components/Navbar/Routes";

describe("Navbar component", () => {
    it("should render without errors", () => {
        // Genera un warning que suele tener que ver con promesas y timers...
        // No hay nada pero que presentar una prueba técnica con warnings pero
        // Lo gracioso es que si corres solo este test, no hay warning...
        const { getByText } = render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(getByText("Inicio")).toBeInTheDocument();
    });

    it("should render Logo component without errors", () => {
        render(
            <MemoryRouter>
                <Logo />
            </MemoryRouter>
        );
        expect(screen.getByText("Cafler")).toBeInTheDocument();
    });

    it("should render Routes component without errors", async () => {
        const { queryByText } = render(
            <MemoryRouter>
                <Routes />
            </MemoryRouter>
        );

        const inicioLink = queryByText("Inicio");
        const asignacionLink = queryByText("Asignación de pedidos");

        expect(inicioLink).toBeInTheDocument();
        expect(asignacionLink).toBeInTheDocument();
    });
});
