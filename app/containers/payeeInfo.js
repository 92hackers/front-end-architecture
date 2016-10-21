import {connect} from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../teacher-components/PayeeInfo';

const mapStateToProps = (state) => {

  const {user, geoResources, payeeInfo} = state
  const {bankNameData, accountInfo} = payeeInfo
  const {region, country, name, address, accountNum, swiftCode, bankName, bankCode} = accountInfo

  const continentListRaw = geoResources.continentList,
    continentCountryListRaw = geoResources.continentCountryList

  var continentList = [], continentCountryList = []

  if (continentListRaw.length > 0) {
    continentList = continentListRaw.map(item => ({ label: item.name, value: item.id }))
  }

  if (continentCountryListRaw.length > 0) {
    continentCountryList = continentCountryListRaw.map(item => ({ label: item.name, value: item.id }))
  }

  return {
    token: user.token,
    continentList,
    continentCountryList,
    bankNameData,
    initialValues: {
      region,
      country,
      name,
      address,
      accountNum,
      swiftCode,
      bankName,
      bankCode,
    }
  }

};

const mapDispatchToProps = (dispatch) => {
  const { getPayeeInfo, getContinentList, getContinentCountryList, queryBySwiftcode, updatePayeeInfo } = apiActions
  return {
    getPayeeInfo: (token) => {
      dispatch(getPayeeInfo(token))
    },
    getContinentList: (token) => {
      dispatch(getContinentList(token))
    },
    getContinentCountryList: (token, continentId) => {
      dispatch(getContinentCountryList(token, continentId))
    },
    queryBySwiftcode: (token, code) => {
      return dispatch(queryBySwiftcode(token, code))
    },
    updatePayeeInfo: (token, data) => {
      return dispatch(updatePayeeInfo(token, data))
    },
    showNotification: (message) => {
      dispatch(notificationActions.showNotification(message));
    },
    networkError: () => {
      dispatch(notificationActions.networkError());
    }
  }
}

const PayeeInfo = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default PayeeInfo
