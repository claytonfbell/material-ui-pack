import { Button } from "@material-ui/core"
import React from "react"
import {
  Form,
  TextField,
  useStoredState,
  removeStoredState,
} from "material-ui-pack"

export function UseStoredStateExample() {
  const [state, setState] = useStoredState("myValues", {
    myText: "",
    myDescrption: "",
  })
  return (
    <Form state={state} setState={setState} margin="normal">
      <TextField name="myText" />
      <TextField name="myDescription" />
      <Button onClick={() => removeStoredState("myValues")}>
        Remove from Local Storage
      </Button>
    </Form>
  )
}
