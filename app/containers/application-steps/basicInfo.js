import { connect } from 'react-redux'
import { notificationActions, geoDataActions, applicationActions } from '../../actions'
import { default as Comp } from '../../components/application-steps/BasicInfo'

const generateList = (list, rawData) => {
  if (rawData.length > 0) {
    for (const item of rawData) {
      list.push({ value: item.id, label: item.name })
    }
  }
}

const mapStateToProps = (state) => {
  const { geoData } = state

  const nationalityListRaw = geoData.nationalityList
  const countryListRaw = geoData.countryList
  const regionListRaw = geoData.regionList
  const cityListRaw = geoData.cityList
  const timezoneListRaw = geoData.timezoneList

  /* eslint-disable */
  let nationalityList = []
  let countryList = []
  let regionList = []
  let cityList = []
  let timezoneList = []
  /* eslint-enable */

  generateList(nationalityList, nationalityListRaw)
  generateList(countryList, countryListRaw)
  generateList(regionList, regionListRaw)
  generateList(cityList, cityListRaw)

  if (timezoneListRaw.length > 0) {
    timezoneList = timezoneListRaw.map(item => ({ value: item.id, label: item.en_name }))
  }

  return {
    nationalityList,
    countryList,
    regionList,
    cityList,
    timezoneList,
  }
}

const mapDispatchToProps = dispatch => ({
  getNationalityList: () => dispatch(geoDataActions.getNationalityList()),
  getCountryList: () => dispatch(geoDataActions.getCountryList()),
  getRegionList: () => dispatch(geoDataActions.getRegionList()),
  getCityList: () => dispatch(geoDataActions.getCityList()),
  getTimezoneList: () => dispatch(geoDataActions.getTimezoneList()),

  updateBasicInfo: data => dispatch(applicationActions.updateBasicInfo(data)),
  /* eslint max-len: 0 */
  changeTimezone: timezoneId => dispatch(applicationActions.changeTimezone(timezoneId)),

  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const BasicInfo = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default BasicInfo
