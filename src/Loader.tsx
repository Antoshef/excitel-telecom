import { Backdrop, BackdropProps, CircularProgress } from "@mui/material";

const Loader = ({ open, ...rest }: { open: boolean } & BackdropProps) => (
    <Backdrop 
        {...rest} 
        open={open}
        style={{
            position: "fixed",
            zIndex: 5,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "#fff",
        }}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
);

export default Loader;