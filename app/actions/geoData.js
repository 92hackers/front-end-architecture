import { createRequestTypes, apicall } from './lib';

// geo data resources.
export const GEO_CONTINENT = createRequestTypes('GEO_CONTINENT')
export const getContinentList = () => apicall('geo/continent', GEO_CONTINENT)

export const GEO_CONTINENTCOUNTRY = createRequestTypes('GEO_CONTINENTCOUNTRY')
export const getContinentCountryList = continentId => apicall(`geo/continent/${continentId}`, GEO_CONTINENTCOUNTRY)

export const GEO_NATIONALITY = createRequestTypes('GEO_NATIONALITY')
export const getNationalityList = () => apicall('geo/nationality', GEO_NATIONALITY)

export const GEO_COUNTRY = createRequestTypes('GEO_COUNTRY')
export const getCountryList = () => apicall('geo/country', GEO_COUNTRY)

export const GEO_REGION = createRequestTypes('GEO_REGION')
export const getRegionList = countryCode => apicall(`geo/region/${countryCode}`, GEO_REGION)

export const GEO_CITY = createRequestTypes('GEO_CITY')
export const getCityList = regionCode => apicall(`geo/city/${regionCode}`, GEO_CITY)

export const GEO_TIMEZONE = createRequestTypes('GEO_TIMEZONE')
export const getTimezoneList = () => apicall('geo/timezone', GEO_TIMEZONE)
