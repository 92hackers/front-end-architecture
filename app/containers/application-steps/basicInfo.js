import { connect } from 'react-redux'
import { notificationActions, apiActions, utilityActions } from '../../actions'
import { default as Comp } from '../../components/application-steps/BasicInfo'

const generateList = (list, rawData) => {
  if (rawData.length > 0) {
    for (const item of rawData) {
      list.push({ value: item.id, label: item.name })
    }
  }
}

const mapStateToProps = (state) => {
  const { geoResources } = state

  const nationalityListRaw = geoResources.nationalityList
  const countryListRaw = geoResources.countryList
  const regionListRaw = geoResources.regionList
  const cityListRaw = geoResources.cityList
  const timezoneListRaw = geoResources.timezoneList

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
  getNationalityList: () => dispatch(apiActions.getNationalityList()),
  getCountryList: () => dispatch(apiActions.getCountryList()),
  getRegionList: () => dispatch(apiActions.getRegionList()),
  getCityList: () => dispatch(apiActions.getCityList()),
  getTimezoneList: () => dispatch(apiActions.getTimezoneList()),

  updateBasicInfo: data => dispatch(apiActions.updateBasicInfo(data)),
  /* eslint max-len: 0 */
  changeTimezoneAtApplication: timezoneId => dispatch(utilityActions.changeTimezoneAtApplication(timezoneId)),

  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const BasicInfo = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default BasicInfo
