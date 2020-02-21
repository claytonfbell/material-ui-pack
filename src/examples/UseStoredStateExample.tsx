import React from "react"
import Form from "../Form"
import useStoredState from "../hooks/useStoredState"
import TextField from "../TextField"

function UseStoredStateExample() {
  const [state, setState] = useStoredState("myValues", {
    myText: "",
    myDescrption: "",
  })
  return (
    <Form state={state} setState={setState} margin="normal">
      <TextField name="myText" />
      <TextField name="myDescription" />
    </Form>
  )
}

export default UseStoredStateExample
