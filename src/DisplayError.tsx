import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Fade from "@mui/material/Fade"
import { useTheme } from "@mui/material/styles"
import React from "react"
import ReactMarkdown from "react-markdown"

const scrollToRef = (ref: any) =>
  window.scrollTo(0, ref.current.offsetTop - 100)

interface Props {
  error: string | undefined
}
export function DisplayError(props: Props) {
  const theme = useTheme()
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
        <Box
          ref={myRef}
          sx={{
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
            width: "100%",
          }}
        >
          <Alert severity="error">
            <Box
              sx={{
                "& p": {
                  margin: 0,
                },
              }}
            >
              {props.error !== undefined && (
                <ReactMarkdown>{props.error}</ReactMarkdown>
              )}
            </Box>
          </Alert>
        </Box>
      </Fade>
    </>
  )
}
