import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../components/PayeeInfo';

const mapStateToProps = (state) => {
  const { geoResources, payeeInfo } = state
  const { bankNameData, accountInfo } = payeeInfo
  const { region, country, name, address, accountNum, swiftCode, bankName, bankCode } = accountInfo

  const continentListRaw = geoResources.continentList
  const continentCountryListRaw = geoResources.continentCountryList

  let continentList = []
  let continentCountryList = []

  if (continentListRaw.length > 0) {
    continentList = continentListRaw.map(item => ({ label: item.name, value: item.id }))
  }

  if (continentCountryListRaw.length > 0) {
    continentCountryList = continentCountryListRaw.map(
      item => ({ label: item.name, value: item.id })
    )
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
}

const mapDispatchToProps = (dispatch) => {
  const {
    getPayeeInfo,
    getContinentList,
    getContinentCountryList,
    queryBySwiftcode,
    updatePayeeInfo,
  } = apiActions

  return {
    getPayeeInfo: () => dispatch(getPayeeInfo()),
    getContinentList: () => dispatch(getContinentList()),
    getContinentCountryList: continentId => dispatch(getContinentCountryList(continentId)),
    queryBySwiftcode: code => dispatch(queryBySwiftcode(code)),
    updatePayeeInfo: data => dispatch(updatePayeeInfo(data)),
    showNotification: message => dispatch(notificationActions.showNotification(message)),
    networkError: () => dispatch(notificationActions.networkError()),
  }
}

const PayeeInfo = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default PayeeInfo
