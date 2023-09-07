import { Alert } from "@mui/material";

interface Props {
    message: string;
}
const NoDataAlert = ({ message }: Props) => {
    return <Alert severity="warning">{message}</Alert>;
};

export default NoDataAlert;
