import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

interface NavbarRoute {
    to: `/${string}`;
    title: string;
}
const Routes = () => {
    const routes: NavbarRoute[] = [
        {
            to: "/",
            title: "Inicio",
        },
        {
            to: "/assignment",
            title: "Asignación de pedidos",
        },
    ];
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            {routes.map((route) => (
                <NavLink
                    key={route.title}
                    to={route.to}
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                        marginRight: "20px",
                    }}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontSize: "16px" }}
                    >
                        {route.title}
                    </Typography>
                </NavLink>
            ))}
        </Box>
    );
};

export default Routes;
