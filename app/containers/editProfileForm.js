import { connect } from 'react-redux';
import { apiActions } from '../actions';
import { default as Comp } from '../teacher-components/EditProfileForm';

const generateList = (list, rawData) => {
  if (rawData.length > 0) {
    for (const item of rawData) {
      list.push({ value: item.id, label: item.name })
    }
  }
}

const mapStateToProps = (state) => {
  const { geoResources, user } = state
  const { profile } = user
  const { residence_n, residence_p, residence_c, timezone, zoomid, tel_code, tel_num } = profile

  const countryListRaw = geoResources.countryList
  const regionListRaw = geoResources.regionList
  const cityListRaw = geoResources.cityList
  const timezoneListRaw = geoResources.timezoneList

  /* eslint-disable */
  let countryList = []
  let regionList = []
  let cityList = []
  let timezoneList = []
  /* eslint-enable */

  generateList(countryList, countryListRaw)
  generateList(regionList, regionListRaw)
  generateList(cityList, cityListRaw)

  if (timezoneListRaw.length > 0) {
    timezoneList = timezoneListRaw.map(item => ({ value: item.id, label: item.en_name }))
  }

  return {
    countryList,
    regionList,
    cityList,
    timezoneList,
    initialValues: {
      residence_n,
      residence_p,
      residence_c,
      timezone,
      zoomid,
      tel_code,
      tel_num,
    },
  }
}

const mapDispatchToProps = dispatch => ({
  getCountryList: () => dispatch(apiActions.getCountryList()),
  getRegionList: countryCode => dispatch(apiActions.getRegionList(countryCode)),
  getCityList: regionCode => dispatch(apiActions.getCityList(regionCode)),
  getTimezoneList: () => dispatch(apiActions.getTimezoneList()),
})

const EditProfileForm = connect(mapStateToProps, mapDispatchToProps)(Comp);
export default EditProfileForm;
