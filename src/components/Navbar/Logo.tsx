import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CAFLER_COLOR } from "../Utils/utils";

const Logo = () => {
    return (
        <Link
            to="https://cafler.com/"
            style={{ textDecoration: "none", color: "inherit" }}
            target="_blank"
            title="Este link te llevará fuera de la aplicación"
        >
            <Typography
                variant="h1"
                component="div"
                sx={{ flexGrow: 1, fontSize: "36px" }}
                color={CAFLER_COLOR}
            >
                Cafler
            </Typography>
        </Link>
    );
};

export default Logo;
