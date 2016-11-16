import { apiActions } from '../actions'

const initialState = {
  isFetching: false,
  countryList: [],
  regionList: [],
  cityList: [],
  timezoneList: [],
  continentList: [],
  continentCountryList: [],
}

const {
  GEO_CONTINENT,
  GEO_CONTINENTCOUNTRY,
  GEO_NATIONALITY,
  GEO_COUNTRY,
  GEO_REGION,
  GEO_CITY,
  GEO_TIMEZONE,
} = apiActions

const { REQUEST: gctr, SUCCESS: gcts, FAILURE: gctf } = GEO_CONTINENT
const { REQUEST: gctcr, SUCCESS: gctcs, FAILURE: gctcf } = GEO_CONTINENTCOUNTRY
const { REQUEST: gnr, SUCCESS: gns, FAILURE: gnf } = GEO_NATIONALITY
const { REQUEST: gcr, SUCCESS: gcs, FAILURE: gcf } = GEO_COUNTRY
const { REQUEST: grr, SUCCESS: grs, FAILURE: grf } = GEO_REGION
const { REQUEST: gcir, SUCCESS: gcis, FAILURE: gcif } = GEO_CITY
const { REQUEST: gtr, SUCCESS: gts, FAILURE: gtf } = GEO_TIMEZONE

export default function countryList(state = initialState, action) {
  const { type, payload } = action
  const data = payload ? payload.data : []
  switch (type) {
    case gctr:
      return { ...state, isFetching: true }

    case gcts:
      return { ...state, isFetching: false, continentList: data }

    case gctf:
      return { ...state, isFetching: false }

    case gctcr:
      return { ...state, isFetching: true }

    case gctcs:
      return { ...state, isFetching: false, continentCountryList: data }

    case gctcf:
      return { ...state, isFetching: false }

    case gnr:
      return { ...state, isFetching: true }

    case gns:
      return { ...state, isFetching: false, nationalityList: data }

    case gnf:
      return { ...state, isFetching: false, nationalityList: payload }

    case gcr:
      return { ...state, isFetching: true }

    case gcs:
      return { ...state, isFetching: false, countryList: data }

    case gcf:
      return { ...state, isFetching: false, countryList: payload }

    case grr:
      return { ...state, isFetching: true }

    case grs:
      return { ...state, isFetching: false, regionList: data }

    case grf:
      return { ...state, isFetching: false, regionList: payload }

    case gcir:
      return { ...state, isFetching: true }

    case gcis:
      return { ...state, isFetching: false, cityList: data }

    case gcif:
      return { ...state, isFetching: false, cityList: payload }

    case gtr:
      return { ...state, isFetching: true }

    case gts:
      return { ...state, isFetching: false, timezoneList: data }

    case gtf:
      return { ...state, isFetching: false, timezoneList: payload }

    default:
      return state
  }
}
