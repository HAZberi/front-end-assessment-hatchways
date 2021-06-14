import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((_) => ({
  inputField: {
    fontSize: "1rem",
    padding: 0,
  },
  inputStyles: {
    opacity: 0.6,
  },
  submitStyles: {
    visibility: "hidden",
  },
}));

const TagForm = ({ id, createNewTag }) => {
  const styleClasses = useStyles();

  const [newTag, setNewTag] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    createNewTag(id, newTag);
    setNewTag("");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <TextField
        id={id}
        InputProps={{ classes: { root: styleClasses.inputField } }}
        className={styleClasses.inputStyles}
        placeholder="Add a tag"
        margin="normal"
        color="secondary"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />
      <input className={styleClasses.submitStyles} type="submit" />
    </form>
  );
};

export default TagForm;
