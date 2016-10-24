import {connect} from 'react-redux';
import { apiActions } from '../actions';
import { default as Comp } from '../teacher-components/EditProfileForm';

const generateList = (list, rawData) => {
  if (rawData.length > 0) {
    for (let item of rawData) {
      list.push({ value: item.id, label: item.name })
    }
  }
}

const mapStateToProps = (state) => {
  const { geoResources, user } = state
  const { profile } = state.user
  const { residence_n,  residence_p,  residence_c, timezone, zoomid, tel_code, tel_num } = profile

  const countryListRaw = geoResources.countryList,
    regionListRaw = geoResources.regionList,
    cityListRaw = geoResources.cityList,
    timezoneListRaw = geoResources.timezoneList;

  var countryList = [], regionList = [], cityList = [], timezoneList = [];

  generateList(countryList, countryListRaw)
  generateList(regionList, regionListRaw)
  generateList(cityList, cityListRaw)

  if (timezoneListRaw.length > 0) {
    timezoneList = timezoneListRaw.map((item) => ({ value: item.id, label: item.en_name }))
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
    }
  }

};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountryList: () => {
      dispatch(apiActions.getCountryList())
    },
    getRegionList: (countryCode) => {
      dispatch(apiActions.getRegionList(countryCode))
    },
    getCityList: (regionCode) => {
      dispatch(apiActions.getCityList(regionCode))
    },
    getTimezoneList: () => {
      dispatch(apiActions.getTimezoneList())
    },
  }
}

const EditProfileForm = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default EditProfileForm;
