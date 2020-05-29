import React from "react";

//From Marerial-ui
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

//From here
import useStyles from "./style";

export default function SearchAppBar(props) {
  const classes = useStyles();
  const { handleSubmit, handleChange } = props;

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon className={classes.icon} onClick={handleSubmit} />
        </div>
        <InputBase
          onChange={handleChange}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </div>
  );
}
