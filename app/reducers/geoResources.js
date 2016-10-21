import { apiActions } from '../actions'

const initialState = {
  isFetching: false,
  countryList: {
    data: []
  },
  regionList: {
    data: []
  },
  cityList: {
    data: []
  },
  timezoneList: {
    data: []
  },
  continentList: [],
  continentCountryList: [],
}

const {
  GEO_CONTINENT_REQUEST,
  GEO_CONTINENT_SUCCESS,
  GEO_CONTINENT_FAILURE,

  GEO_CONTINENTCOUNTRY_REQUEST,
  GEO_CONTINENTCOUNTRY_SUCCESS,
  GEO_CONTINENTCOUNTRY_FAILURE,

  GEO_COUNTRY_REQUEST,
  GEO_COUNTRY_SUCCESS,
  GEO_COUNTRY_FAILURE,

  GEO_REGION_REQUEST,
  GEO_REGION_SUCCESS,
  GEO_REGION_FAILURE,

  GEO_CITY_REQUEST,
  GEO_CITY_SUCCESS,
  GEO_CITY_FAILURE,

  GEO_TIMEZONE_REQUEST,
  GEO_TIMEZONE_SUCCESS,
  GEO_TIMEZONE_FAILURE,
} = apiActions

export default function countryList(state = initialState, action) {
  switch (action.type) {
    case GEO_CONTINENT_REQUEST:
      return {...state, isFetching: true}

    case GEO_CONTINENT_SUCCESS:
      return {...state, isFetching: false, continentList: action.payload.data}

    case GEO_COUNTRY_FAILURE:
      return {...state, isFetching: false}

    case GEO_CONTINENTCOUNTRY_REQUEST:
      return {...state, isFetching: true}

    case GEO_CONTINENTCOUNTRY_SUCCESS:
      return {...state, isFetching: false, continentCountryList: action.payload.data}

    case GEO_CONTINENTCOUNTRY_FAILURE:
      return {...state, isFetching: false}

    case GEO_COUNTRY_REQUEST:
      return {...state, isFetching: true}

    case GEO_COUNTRY_SUCCESS:
      return { ...state, isFetching: false, countryList: action.payload }

    case GEO_COUNTRY_FAILURE:
      return { ...state, isFetching: false, countryList: action.payload }

    case GEO_REGION_REQUEST:
      return { ...state, isFetching: true}

    case GEO_REGION_SUCCESS:
      return { ...state, isFetching: false, regionList: action.payload }

    case GEO_REGION_FAILURE:
      return { ...state, isFetching: false, regionList: action.payload }

    case GEO_CITY_REQUEST:
      return {...state, isFetching: true}

    case GEO_CITY_SUCCESS:
      return { ...state, isFetching: false, cityList: action.payload }

    case GEO_CITY_FAILURE:
      return { ...state, isFetching: false, cityList: action.payload }

    case GEO_TIMEZONE_REQUEST:
      return { ...state, isFetching: true}

    case GEO_TIMEZONE_SUCCESS:
      return { ...state, isFetching: false, timezoneList: action.payload }

    case GEO_TIMEZONE_FAILURE:
      return { ...state, isFetching: false, timezoneList: action.payload }

    default:
      return state
  }
}
