import momentTZ from "moment-timezone"

// move this to ts once typings support it
export default isoAlpha2 => momentTZ.tz.zonesForCountry(isoAlpha2)
