import {Button, IconButton} from "@material-ui/core";
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginLeft: theme.spacing(2),
    },
    hide: {
        display: 'none',
    }
}))

export default function Drawer() {
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    return(
        <div>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => console.log('opening')}
            >
                <MenuIcon />
            </IconButton>
        </div>
    )
}