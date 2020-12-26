// ie11 polyfill stuff - todo - put this into a convenient import
import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"
import "date-time-format-timezone"
import "@formatjs/intl-pluralrules/polyfill"
import "@formatjs/intl-pluralrules/locale-data/en" // locale-data for en

import "@formatjs/intl-relativetimeformat/polyfill"
import "@formatjs/intl-relativetimeformat/locale-data/en" // locale-data for en

import "@formatjs/intl-listformat/polyfill"
import "@formatjs/intl-listformat/locale-data/en" // locale-data for en

import "@formatjs/intl-displaynames/polyfill"
import "@formatjs/intl-displaynames/locale-data/en" // locale-data for en

import "@formatjs/intl-numberformat/polyfill"
import "@formatjs/intl-numberformat/locale-data/en" // locale-data for en

import "@formatjs/intl-locale/polyfill"

import "@formatjs/intl-getcanonicallocales/polyfill"

import "@formatjs/intl-datetimeformat/polyfill"
import "@formatjs/intl-datetimeformat/locale-data/en" // locale-data for en
import "@formatjs/intl-datetimeformat/add-all-tz" // Add ALL tz data

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))
