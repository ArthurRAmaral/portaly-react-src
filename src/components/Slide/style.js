import { makeStyles } from "@material-ui/core/styles";
import colors from "../../util/Colors";


const useStyles = makeStyles((theme) => ({

    button: {
        WebkitAppearance: "none",
        appearance: "none",
        WebkitFilter: "drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1))",
        filter: "drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1))",
        WebkitTransition: "all .5s ease",
        transition: "all .5s ease",
        border: "none",
        background: "#FFD800",
        borderRadius: "30px",
        textTransform: "capital",
        boxSizing: "border-box",
        padding: "15px 40px",
        fontWeight: "400",
        fontSize: "13px",
        cursor: "cursor",
        float: "left",
        "&:hover": {
            color: "#FFFFFF",
            background: "#222222",
            WebkitFilter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.2))",
            filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.2))",
        }
    },
    wrapper: {
        maxWidth: "1335px",
        boxSizing: "border-box",
        padding: "0 20px",
        margin: "auto",
        a: {
            display: "inline-block",
            margin: "5px"
        },
        "&:first-child": {
            marginLeft: "0"
        }
    },
    link: {
        background: "linear-gradient(317deg, rgba(255,235,220,1) 0%, rgba(255,255,255,1) 100%)",
        display: "flex",
    },
    slider: {
        wrapper: {
            position: "relative",
            height: "70vh",
            overflow: "hidden",
        },
    },
    h1: {
        fontWeight: "600",
        maxWidth: "840px",
        color: colors.orangeDark,
        fontSize: "45px",
        lineHeight: "1",
        transition: "all 0.3s ease",
        WebkitTransform: "translateY(-20px)",
        transform: "translateY(-20px)",
        textAlign: "left",
    },
    p: {
        color: colors.orangeDark,
        fontSize: "35px",
        fontWeight: "400",
        lineHeight: "1.5",
        marginBottom: "30px",
        maxWidth: "640px",
        transition: "all 0.3s ease",
        WebkitTransform: "translateY(20px)",
        transform: "translateY(20px)",
        textAlign: "left",
    },
    div: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        top: "50%",
        alignContent: "center",
        zIndex: "0",
        height: "100%",
        marginLeft: "10%"
    },
    imagemDiv: {
        float: "right",
        width: "600px",
        zIndex: "1",
        marginRight: "10%",
        height: "100%",
        position: "relative",
    },
    imagem: {
        position: "absolute",
        margin: "auto",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        width: "100%"
    },
    sliderContent: {
        textAlign: "center",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        inner: {
            padding: "0 70px",
            boxSizing: "border-box",
            position: "absolute",
            width: "100%",
            top: "50%",
            left: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
        },
        section: {
            position: "absolute",
            bottom: "20px",
            left: "20px",
            transition: "all 0.3s ease",
            span: {
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "12px",
                display: "inline-block",
                textAlign: "left",
                lineHeight: "1.4",
                verticalAlign: "middle",
                marginLeft: "10px",
                WebkitTransform: "translateY(-10px)",
                transform: "translateY(-10px)",
                opacity: "0",
                strong: {
                    color: "#FFFFFF",
                    fontSize: "14px",
                    display: "block",
                    WebkitTransform: "translateY(10px)",
                    transform: "translateY(10px)",
                    opacity: "0",
                },
            },
        },
    },
    slide: {
        height: "70vh",
        backgroundSize: "cover !important",
        before: {
            content: "''",
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "linear-gradient(transparent, rgba(0, 0, 0, 0.9))",
            bottom: "0",
            left: "0",
        },
    },
    previousButton: {
        left: "0",
        WebkitTransform: "rotate(180deg) translateY(calc(50% + 0px))",
        transform: "rotate(180deg) translateY(calc(50% + 0px))",
        "&:hover": {
            left: "-10px"
        }
    },
    nextButton: {
        right: "0",
        "&:hover": {
            right: "-10px"
        }
    },
}));

export default useStyles;