import { Button } from "@mui/material";
import { useShowLocation } from "../../store/location";

const ShowLocations = () => {
    const { setShowLocation, showLocation } = useShowLocation();
    return (
        <Button
            className={"btn"}
            variant={"contained"}
            onClick={() => {
                setShowLocation(showLocation);
            }}
            sx={{
                position: "fixed",
                bottom: 15,
                left: 15,

                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "10px",
            }}
        >
            {showLocation ? "Hide locations" : "Show locations"}
        </Button>
    );
};

export default ShowLocations;
