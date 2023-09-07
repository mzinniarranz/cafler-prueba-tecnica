import ShowLocations from "../components/ShowLocations/ShowLocations";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { useShowLocation } from "../store/location";

jest.mock("../store/location");
const mockedUseShowLocation = useShowLocation as jest.MockedFunction<
    typeof useShowLocation
>;

mockedUseShowLocation.mockImplementation(() => ({
    showLocation: false,
    setShowLocation: jest.fn(),
}));

describe("ShowLocations component", () => {
    it("Renders correctly", () => {
        const { container } = render(<ShowLocations />);
        expect(container).toBeInTheDocument();
    });

    it('should display "Show locations" when showLocation is false', () => {
        const { getByText } = render(<ShowLocations />);

        const button = getByText("Show locations");

        expect(button).toBeInTheDocument();
    });

    it('should display "Hide locations" when showLocation is true', () => {
        mockedUseShowLocation.mockImplementation(() => ({
            showLocation: true,
            setShowLocation: jest.fn(),
        }));

        const { getByText } = render(<ShowLocations />);

        // Realiza las pruebas según el comportamiento esperado
        const button = getByText("Hide locations");
        expect(button).toBeInTheDocument();
    });
});
