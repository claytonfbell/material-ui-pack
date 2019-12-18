import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PropTypes } from "@material-ui/core";

import FormProvider, { FieldSizeType } from "./FormProvider";
import Debug from "./Debug";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  }
}));

export interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  busy?: boolean;
  debug?: boolean;
  margin?: PropTypes.Margin;
  size?: FieldSizeType;
}

function FormComponent(props: FormProps) {
  const classes = useStyles(props);
  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      {props.debug && <Debug object={props.state} />}
      {props.children}
    </form>
  );
}
const Form = (props: FormProps) => (
  <FormProvider {...props}>
    <FormComponent {...props} />
  </FormProvider>
);
export default Form;
