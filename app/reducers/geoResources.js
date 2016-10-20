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
  }
}

export default function countryList(state = initialState, action) {
  switch (action.type) {
    case apiActions.GEO_COUNTRY_REQUEST:
      return {...state, isFetching: true}

    case apiActions.GEO_COUNTRY_SUCCESS:
      return { ...state, isFetching: false, countryList: action.payload }

    case apiActions.GEO_COUNTRY_FAILURE:
      return { ...state, isFetching: false, countryList: action.payload }

    case apiActions.GEO_REGION_REQUEST:
      return { ...state, isFetching: true}

    case apiActions.GEO_REGION_SUCCESS:
      return { ...state, isFetching: false, regionList: action.payload }

    case apiActions.GEO_REGION_FAILURE:
      return { ...state, isFetching: false, regionList: action.payload }

    case apiActions.GEO_CITY_REQUEST:
      return {...state, isFetching: true}

    case apiActions.GEO_CITY_SUCCESS:
      return { ...state, isFetching: false, cityList: action.payload }

    case apiActions.GEO_CITY_FAILURE:
      return { ...state, isFetching: false, cityList: action.payload }

    case apiActions.GEO_TIMEZONE_REQUEST:
      return { ...state, isFetching: true}

    case apiActions.GEO_TIMEZONE_SUCCESS:
      return { ...state, isFetching: false, timezoneList: action.payload }

    case apiActions.GEO_TIMEZONE_FAILURE:
      return { ...state, isFetching: false, timezoneList: action.payload }

    default:
      return state
  }
}
