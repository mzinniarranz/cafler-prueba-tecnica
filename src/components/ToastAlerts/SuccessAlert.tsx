import { Alert } from "@mui/material";

interface Props {
    message: string;
}
const SuccessAlert = ({ message }: Props) => {
    return <Alert severity="success">{message}</Alert>;
};

export default SuccessAlert;
