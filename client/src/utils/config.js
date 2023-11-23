
const FINNA_PREFIX = "https://api.finna.fi/api/v1/search?lookfor="
const FINNA_SUFFIX = "&type=AllFields&sort=relevance%2Cid%20asc&page=1&limit=20&prettyPrint=false&lng=fi"
const FINNA_SUFFIX_RAWDATA = "&type=AllFields&field%5B%5D=rawData&sort=relevance%2Cid%20asc&page=1&limit=20&prettyPrint=false&lng=fi"
const FINNA_SUFFIX_RAWDATA_BOOKS ="&type=AllFields&field%5B%5D=rawData&filter%5B%5D=%3D~format%3A%220%2FBook%2F%22&sort=relevance%2Cid%20asc&page=1&limit=20&prettyPrint=false&lng=fi"
const BASE_URL= "http://localhost:3000/api"


module.exports = {
  FINNA_PREFIX,
  FINNA_SUFFIX,
  FINNA_SUFFIX_RAWDATA,
  FINNA_SUFFIX_RAWDATA_BOOKS,
  BASE_URL
}