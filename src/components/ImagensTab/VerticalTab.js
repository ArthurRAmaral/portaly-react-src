//From depedencies
import React from "react";
import PropTypes from "prop-types";

//From Material-ui
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//Stylesheet
import useStyles from "./style";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { images } = props.produto;

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={classes.tabs}
      >
        {images.map((image, index) => (
          <Tab
            key={`imagem-pequena${image.id}`}
            label={<img src={image.src} />}
            className={classes.tab}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {images.map((image, index) => (
        <TabPanel
          key={`imagem-grande${image.id}`}
          value={value}
          index={index}
          className={classes.tabPanel}
        >
          <img src={image.src} alt="" />
        </TabPanel>
      ))}
    </div>
  );
}

export default VerticalTabs;
