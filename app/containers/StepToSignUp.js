import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import StepToSignUpComp from '../teacher-components/StepToSignUp';

const generateList = (list, rawData) => {
  if (rawData.length > 0) {
    for (const item of rawData) {
      list.push({ value: item.id, label: item.name })
    }
  }
}

const mapStateToProps = (state) => {
  const { user, geoResources } = state
  const { profile } = user

  const {}        //  初始化哪些数据很关键， 是否要把三个 form 分开来。

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

    },
  }
};

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(apiActions.getProfile()),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const StepToSignUp = connect(mapStateToProps, mapDispatchToProps)(StepToSignUpComp);

export default StepToSignUp;
