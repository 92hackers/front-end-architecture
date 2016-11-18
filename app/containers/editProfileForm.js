import { connect } from 'react-redux';
import { geoDataActions } from '../actions';
import { default as Comp } from '../components/EditProfileForm';

const generateList = (list, rawData) => {
  if (rawData.length > 0) {
    for (const item of rawData) {
      list.push({ value: item.id, label: item.name })
    }
  }
}

const mapStateToProps = (state) => {
  const { geoData, user } = state
  const { profile } = user
  const { residence_n, residence_p, residence_c, timezone, zoomid, tel_code, tel_num } = profile

  const countryListRaw = geoData.countryList
  const regionListRaw = geoData.regionList
  const cityListRaw = geoData.cityList
  const timezoneListRaw = geoData.timezoneList

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
  getCountryList: () => dispatch(geoDataActions.getCountryList()),
  getRegionList: countryCode => dispatch(geoDataActions.getRegionList(countryCode)),
  getCityList: regionCode => dispatch(geoDataActions.getCityList(regionCode)),
  getTimezoneList: () => dispatch(geoDataActions.getTimezoneList()),
})

const EditProfileForm = connect(mapStateToProps, mapDispatchToProps)(Comp);
export default EditProfileForm;
