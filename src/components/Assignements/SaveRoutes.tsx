import { Box, Button, CircularProgress, Grid } from "@mui/material";
import ErrorAlert from "../ToastAlerts/ErrorAlert";
import SuccessAlert from "../ToastAlerts/SuccessAlert";
import { MutationMessage } from "../../types";
import { CAFLER_COLOR } from "../Utils/utils";

interface Props {
    handleSubmit: () => void;
    loading: boolean;
    mutationMessage: MutationMessage;
}
const SaveRoutes = ({ handleSubmit, loading, mutationMessage }: Props) => {
    return (
        <Grid item xs={12} display={"flex"} justifyContent={"end"}>
            <Box flexDirection={"column"} alignItems={"end"} display={"flex"}>
                {" "}
                <Box mt={2} mb={2}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        className={"btn"}
                    >
                        {loading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : (
                            "Guardar cambios"
                        )}
                    </Button>
                </Box>
                <Box mb={1}>
                    {mutationMessage.status === "error" &&
                        mutationMessage.message && (
                            <ErrorAlert message={mutationMessage.message} />
                        )}
                    {mutationMessage.status === "success" &&
                        mutationMessage.message && (
                            <SuccessAlert message={mutationMessage.message} />
                        )}
                </Box>
            </Box>
        </Grid>
    );
};

export default SaveRoutes;
