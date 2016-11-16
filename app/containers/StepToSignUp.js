import { connect } from 'react-redux';
import { notificationActions, apiActions, utilityActions } from '../actions';
import { default as Comp } from '../components/application-steps/StepToSignUp';

const generateList = (list, rawData) => {
  if (rawData.length > 0) {
    for (const item of rawData) {
      list.push({ value: item.id, label: item.name })
    }
  }
}

const mapStateToProps = (state) => {
  const { geoResources, utility, application } = state
  const { timezoneId } = utility
  const { interviewTimeList } = application

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
    timezoneId,
    interviewTimeList,
  }
};

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(apiActions.getProfile()),
  getNationalityList: () => dispatch(apiActions.getNationalityList()),
  getCountryList: () => dispatch(apiActions.getCountryList()),
  getRegionList: () => dispatch(apiActions.getRegionList()),
  getCityList: () => dispatch(apiActions.getCityList()),
  getTimezoneList: () => dispatch(apiActions.getTimezoneList()),
  getInterviewList: timezoneId => dispatch(apiActions.getInterviewList(timezoneId)),

  updateBasicInfo: data => dispatch(apiActions.updateBasicInfo(data)),
  updateTeachingExp: data => dispatch(apiActions.updateTeachingExp(data)),
  updateInterview: data => dispatch(apiActions.updateInterview(data)),

  /* eslint max-len: 0 */
  changeTimezoneAtApplication: timezoneId => dispatch(utilityActions.changeTimezoneAtApplication(timezoneId)),

  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const StepToSignUp = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default StepToSignUp;
