import {connect} from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../teacher-components/PayeeInfo';

const mapStateToProps = (state) => {

  const {geoResources, payeeInfo} = state
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
    },
  }

};

const mapDispatchToProps = (dispatch) => {
  const { getPayeeInfo, getContinentList, getContinentCountryList, queryBySwiftcode, updatePayeeInfo } = apiActions
  return {
    getPayeeInfo: () => {
      dispatch(getPayeeInfo())
    },
    getContinentList: () => {
      dispatch(getContinentList())
    },
    getContinentCountryList: (continentId) => {
      dispatch(getContinentCountryList(continentId))
    },
    queryBySwiftcode: (code) => {
      return dispatch(queryBySwiftcode(code))
    },
    updatePayeeInfo: (data) => {
      return dispatch(updatePayeeInfo(data))
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
