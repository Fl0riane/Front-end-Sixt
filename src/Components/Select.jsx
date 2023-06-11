import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ItemHeight = 48;
const itemPaddingTop = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ItemHeight * 4.5 + itemPaddingTop,
      width: 250,
    },
  },
};

const MultipleSelectCheckmarks = ({
  selectType,
  setSelectType,
  setcount,
  data,
}) => {
  console.log("log data length", data.length);
  const styles = ["Berline", "SUV", "Cabriolet", "Pick-up", "Coupé"];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectType(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <span style={{ color: "black" }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          placeholder="CATEGORIES DE VEHICULE"
          labelId="demo-multiple-checkbox-label"
          name="checkbox"
          multiple
          value={selectType}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          <h3>CATEGORIES DE VEHICULES</h3>{" "}
          <button
            onClick={() => {
              setSelectType([]);
            }}
          >
            reset
          </button>
          {styles.map((style) => (
            <MenuItem key={style} value={style}>
              <Checkbox checked={selectType.indexOf(style) > -1} />
              <ListItemText primary={style} />
            </MenuItem>
          ))}
          <div></div>
        </Select>
      </FormControl>
    </span>
  );
};
export default MultipleSelectCheckmarks;
