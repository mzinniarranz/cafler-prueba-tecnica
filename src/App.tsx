import "./App.css";
import { Container, Typography } from "@mui/material";
import ShowOrders from "./components/Orders/ShowOrders";
import { Route, Routes } from "react-router";
import AssignementsController from "./components/Assignements/AssignementsController";
import Navbar from "./components/Navbar/Navbar";
import ShowLocations from "./components/ShowLocations/ShowLocations";
function App() {
    return (
        <>
            <Container maxWidth={false} disableGutters>
                <header>
                    <Navbar />
                </header>
                <main>
                    <Container maxWidth={"lg"}>
                        <ShowLocations />
                        <Routes>
                            <Route path="/" element={<ShowOrders />} />
                            <Route
                                path="/assignment/"
                                element={<AssignementsController />}
                            />
                        </Routes>
                    </Container>
                </main>
                <footer
                    style={{
                        position: "fixed",
                        bottom: 0,
                        right: 0,
                        opacity: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        padding: "10px",
                    }}
                >
                    <img
                        alt="Logo transparente de Cafler en miniatura"
                        src={"/logo-transparent.png"}
                        className="footer-logo"
                    />
                    <Typography>Marc Zinni Arranz</Typography>
                </footer>
            </Container>
        </>
    );
}

export default App;
