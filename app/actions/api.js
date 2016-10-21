import { CALL_API } from 'redux-api-middleware';
import { apiVersion, host } from '../network/api';

//  TODO:  考虑写成工厂方法， 每次根据传入的参数形成一个新的  action.   用  reduce ??
//  TODO:  目前对于 POST 的请求，不要设置相对应的 reducer, 因为不需要保存，我可以用 promise 直接取到数据来用。

export const GEO_CONTINENT_REQUEST = "/geo/continent/request"
export const GEO_CONTINENT_SUCCESS = "/geo/continent/success"
export const GEO_CONTINENT_FAILURE = "/geo/continent/failure"

export const getContinentList = (token) => {
  return {
    [CALL_API]: {
      endpoint: host + apiVersion + "geo/continent",
      method: "GET",
      types: [GEO_CONTINENT_REQUEST, GEO_CONTINENT_SUCCESS, GEO_CONTINENT_FAILURE],
      headers: { "Authorization": token }
    }
  }
}

export const GEO_CONTINENTCOUNTRY_REQUEST = "/geo/continent/country/request"
export const GEO_CONTINENTCOUNTRY_SUCCESS = "/geo/continent/country/success"
export const GEO_CONTINENTCOUNTRY_FAILURE = "/geo/continent/country/failure"

export const getContinentCountryList = (token, continentId) => {
  return {
    [CALL_API]: {
      endpoint: host + apiVersion + "geo/continent" + "/" + continentId,
      method: "GET",
      types: [GEO_CONTINENTCOUNTRY_REQUEST, GEO_CONTINENTCOUNTRY_SUCCESS, GEO_CONTINENTCOUNTRY_FAILURE],
      headers: { "Authorization": token }
    }
  }
}

export const GEO_COUNTRY_REQUEST = "/geo/country/request"
export const GEO_COUNTRY_SUCCESS = "/geo/country/success"
export const GEO_COUNTRY_FAILURE = "/geo/country/failure"


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

export const PAYEEINFO_UPDATE_REQUEST = "/user/payInfo/update/request"
export const PAYEEINFO_UPDATE_SUCCESS = "/user/payInfo/update/success"
export const PAYEEINFO_UPDATE_FAILURE = "/user/payInfo/update/failure"

export const updatePayeeInfo = (token, data) => {
  return {
    [CALL_API]: {
      endpoint: host + apiVersion + "user/account",
      method: "POST",
      types: [PAYEEINFO_UPDATE_REQUEST, PAYEEINFO_UPDATE_SUCCESS, PAYEEINFO_UPDATE_FAILURE],
      headers: { "Authorization": token, "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  }
}

export const PAYEEINFO_REQUEST = "/user/payInfo/request"
export const PAYEEINFO_SUCCESS = "/user/payInfo/success"
export const PAYEEINFO_FAILURE = "/user/payInfo/failure"

export const getPayeeInfo = (token) => {
  return {
    [CALL_API]: {
      endpoint: host + apiVersion + "user/account",
      method: "GET",
      types: [PAYEEINFO_REQUEST, PAYEEINFO_SUCCESS, PAYEEINFO_FAILURE],
      headers: { "Authorization": token }
    }
  }
}

export const SWIFT_CODE_REQUEST = "/swift_code/request"
export const SWIFT_CODE_SUCCESS = "/swift_code/success"
export const SWIFT_CODE_FAILURE = "/swift_code/failure"

export const queryBySwiftcode = (token, code) => {
  return {
    [CALL_API]: {
      endpoint: host + apiVersion + "data/swiftcode/" + code,
      method: "GET",
      types: [SWIFT_CODE_REQUEST, SWIFT_CODE_SUCCESS, SWIFT_CODE_FAILURE],
      headers: { "Authorization": token }
    }
  }
}
