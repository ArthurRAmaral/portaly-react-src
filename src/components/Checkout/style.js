import { makeStyles } from "@material-ui/core/styles";
import colors from "../../util/Colors";


const useStyles = makeStyles((theme) => ({

    cadastroContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "230px 1fr",
        gap: "1px 1px",
        gridTemplateAreas: "\"title title dados dados\" \"dados dados dados dados\""
    },
    title: {
        gridArea: "title"
    },
    dados: {
        gridArea: "dados"
    }
}));

export default useStyles;