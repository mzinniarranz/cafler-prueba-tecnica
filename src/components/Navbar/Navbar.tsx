import { AppBar, Container, Toolbar } from "@mui/material";
import "./Navbar.css";
import Logo from "./Logo";
import Routes from "./Routes";

const Navbar = () => {
    return (
        <AppBar position="sticky">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Logo />
                    <Routes />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
