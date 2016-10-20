import { CALL_API } from 'redux-api-middleware';
import { apiVersion, host } from '../network/api';

export const GEO_COUNTRY_REQUEST = "/geo/country/request"
export const GEO_COUNTRY_SUCCESS = "/geo/country/success"
export const GEO_COUNTRY_FAILURE = "/geo/country/failure"

//  TODO:  考虑写成工厂方法， 每次根据传入的参数形成一个新的  action.

export const getCountryList = (token) => {
  return {
    [CALL_API]: {
      endpoint: host + apiVersion + "geo/country",
      method: "GET",
      types: [GEO_COUNTRY_REQUEST, GEO_COUNTRY_SUCCESS, GEO_COUNTRY_FAILURE],
      headers: { 'Authorization': token }
    }
  }
}


export const GEO_REGION_REQUEST = "/geo/region/request"
export const GEO_REGION_SUCCESS = "/geo/region/success"
export const GEO_REGION_FAILURE = "/geo/region/failure"

export const getRegionList = (token, countryCode) => {
  return {
    [CALL_API]: {
      endpoint: host + apiVersion + "geo/region" + "/" + countryCode,
      method: "GET",
      types: [GEO_REGION_REQUEST, GEO_REGION_SUCCESS, GEO_REGION_FAILURE],
      headers: { "Authorization": token }
    }
  }
}


export const GEO_CITY_REQUEST = "/geo/city/request"
export const GEO_CITY_SUCCESS = "/geo/city/success"
export const GEO_CITY_FAILURE = "/geo/city/failure"

export const getCityList = (token, regionCode) => {
  return {
    [CALL_API]: {
      endpoint: host + apiVersion + "geo/city" + "/" + regionCode,
      method: "GET",
      types: [GEO_CITY_REQUEST, GEO_CITY_SUCCESS, GEO_CITY_FAILURE],
      headers: { "Authorization": token }
    }
  }
}


export const GEO_TIMEZONE_REQUEST = "/geo/timezone/request"
export const GEO_TIMEZONE_SUCCESS = "/geo/timezone/success"
export const GEO_TIMEZONE_FAILURE = "/geo/timezone/failure"

export const getTimezoneList = (token) => {
  return {
    [CALL_API]: {
      endpoint: host + apiVersion + "geo/timezone",
      method: "GET",
      types: [GEO_TIMEZONE_REQUEST, GEO_TIMEZONE_SUCCESS, GEO_TIMEZONE_FAILURE],
      headers: { "Authorization": token }
    }
  }
}

export const PROFILE_UPDATE_REQUEST = "/user/profile/update/request"
export const PROFILE_UPDATE_SUCCESS = "/user/profile/update/success"
export const PROFILE_UPDATE_FAILURE = "/user/profile/update/failure"

export const updateProfile = (token, data) => {
  return {
    [CALL_API]: {
      endpoint: host + apiVersion + "user/profile",
      method: "POST",
      types: [PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAILURE],
      headers: { "Authorization": token, "Content-Type": "application/json" },
      body: JSON.stringify(data)        // body should be a JSON-encoded string.
    }
  }
}
