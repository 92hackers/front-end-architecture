import { connect } from 'react-redux'
import {
  notificationActions,
  userActions,
  applicationActions,
  geoDataActions,
} from '../../actions'
import { default as Comp } from '../../components/application-steps/BasicInfo'

const generateList = (list, rawData) => {
  if (rawData.length > 0) {
    for (const item of rawData) {
      list.push({ value: item.id, label: item.name })
    }
  }
}

const mapStateToProps = (state) => {
  const { geoResources, user } = state
  const { profile, token } = user
  const { residence_n, residence_p, residence_c,
    zoomid, tel_code,
    firstname, lastname, gender,
    nationality, isNative, avatar,
    timeAdjust, eduexp, experience,
    workexp, tel_num,
  } = profile

  let { certs, timezone } = profile

  const {
    countryList: countryListRaw,
    regionList: regionListRaw,
    cityList: cityListRaw,
    nationalityList: nationalityListRaw,
    timezoneList: timezoneListRaw,
  } = geoResources

  const nationalityList = []
  const countryList = []
  const regionList = []
  const cityList = []
  let timezoneList = []

  generateList(nationalityList, nationalityListRaw)
  generateList(countryList, countryListRaw)
  generateList(regionList, regionListRaw)
  generateList(cityList, cityListRaw)


  if (timezoneListRaw.length > 0) {
    timezoneList = timezoneListRaw.map(item => ({ value: item.id, label: item.timezone }))
  }

  let timezoneIndex = 0

  if (!timezone) {
    const today = new Date();
    const localTimezone = today.toString().match(/GMT[+-]\d{2}/)[0].replace('+', '\\+');

    timezoneList.forEach((item, index) => {
      if (item.label.search(new RegExp(localTimezone)) !== -1) {
        timezone = item.value
        timezoneIndex = index
      }
    })
  } else {
    timezoneList.forEach((item, index) => {
      if (item.value === timezone) {
        timezoneIndex = index
      }
    })
  }
  if (typeof certs[0] !== 'object') {
    certs = []
  }

  return {
    token,
    cityList,
    regionList,
    countryList,
    timezoneList,
    nationalityList,
    timezoneIndex,
    initialValues: {
      certs, workexp, tel_num,
      timezone, zoomid, tel_code,
      firstname, lastname, gender,
      nationality, isNative, avatar,
      timeAdjust, eduexp, experience,
      residence_n, residence_p, residence_c,
    },
  }
}

const mapDispatchToProps = dispatch => ({
  getNationalityList: () => dispatch(geoDataActions.getNationalityList()),
  getCountryList: () => {
    dispatch(geoDataActions.getCountryList())
  },
  getRegionList: (countryCode) => {
    dispatch(geoDataActions.getRegionList(countryCode))
  },
  getCityList: (regionCode) => {
    dispatch(geoDataActions.getCityList(regionCode))
  },
  getTimezoneList: () => {
    dispatch(geoDataActions.getTimezoneList())
  },
  updateBasicInfo: data => dispatch(applicationActions.updateBasicInfo(data)),
  getProfile: () => dispatch(userActions.getProfile()),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const BasicInfo = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Comp);

export default BasicInfo
