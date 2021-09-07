import { Fade } from "@material-ui/core"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { Alert } from "material-ui-bootstrap"
import React from "react"
import ReactMarkdown from "react-markdown"

const scrollToRef = (ref: any) =>
  window.scrollTo(0, ref.current.offsetTop - 100)

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  md: {
    "& p": {
      margin: 0,
    },
  },
}))

interface Props {
  error: string | undefined
}
export function DisplayError(props: Props) {
  const classes = useStyles()
  const [show, setShow] = React.useState(false)

  const myRef = React.useRef(null)
  const executeScroll = () => scrollToRef(myRef)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(props.error !== undefined)
    }, 1)
    return () => clearTimeout(timer)
  }, [props.error])

  React.useEffect(() => {
    if (show) {
      executeScroll()
    }
  }, [show, props.error])

  return (
    <>
      <Fade in={show} unmountOnExit>
        <div ref={myRef} className={classes.root}>
          <Alert show={show}>
            {props.error !== undefined && (
              <ReactMarkdown className={classes.md}>
                {props.error}
              </ReactMarkdown>
            )}
          </Alert>
        </div>
      </Fade>
    </>
  )
}
