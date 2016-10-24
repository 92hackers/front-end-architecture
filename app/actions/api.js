import { CALL_API } from 'redux-api-middleware';
import { apiVersion, host } from '../network/api';
import { createRequestTypes, apicall } from './lib';

// TODO:  目前对于 POST 的请求，不要设置相对应的 reducer, 因为不需要保存，我可以用 promise 直接取到数据来用。

export const GEO_CONTINENT = createRequestTypes('GEO_CONTINENT')
export const getContinentList = () => {
  return apicall('geo/continent', GEO_CONTINENT)
}

export const GEO_CONTINENTCOUNTRY = createRequestTypes('GEO_CONTINENTCOUNTRY')
export const getContinentCountryList = (continentId) => {
  return apicall(`geo/continent/${continentId}`, GEO_CONTINENTCOUNTRY)
}

export const GEO_COUNTRY = createRequestTypes('GEO_COUNTRY')
export const getCountryList = () => {
  return apicall('geo/country', GEO_COUNTRY)
}

export const GEO_REGION = createRequestTypes('GEO_REGION')
export const getRegionList = (countryCode) => {
  return apicall(`geo/region/${countryCode}`, GEO_REGION)
}

export const GEO_CITY = createRequestTypes('GEO_CITY')
export const getCityList = (regionCode) => {
  return apicall(`geo/city/${regionCode}`, GEO_CITY)
}

export const GEO_TIMEZONE = createRequestTypes('GEO_TIMEZONE')
export const getTimezoneList = () => {
  return apicall('geo/timezone', GEO_TIMEZONE)
}

export const PROFILE_UPDATE = createRequestTypes('PROFILE_UPDATE')
export const updateProfile = (data) => {
  return apicall('user/profile', PROFILE_UPDATE, {data})
}

export const PAYEEINFO_UPDATE = createRequestTypes('PAYEEINFO_UPDATE')
export const updatePayeeInfo = (data) => {
  return apicall('user/account', PAYEEINFO_UPDATE, {data})
}

export const PAYEEINFO = createRequestTypes('PAYEEINFO')
export const getPayeeInfo = () => {
  return apicall('user/account', PAYEEINFO)
}

export const SWIFT_CODE = createRequestTypes('SWIFT_CODE')
export const queryBySwiftcode = (code) => {
  return apicall(`data/swiftcode/${code}`, SWIFT_CODE)
}
