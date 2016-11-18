import { connect } from 'react-redux';
import { notificationActions, payeeInfoActions, geoDataActions } from '../actions';
import { default as Comp } from '../components/PayeeInfo';

const mapStateToProps = (state) => {
  const { geoData, payeeInfo } = state
  const { bankNameData, accountInfo } = payeeInfo
  const { region, country, name, address, accountNum, swiftCode, bankName, bankCode } = accountInfo

  const continentListRaw = geoData.continentList
  const continentCountryListRaw = geoData.continentCountryList

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
    queryBySwiftcode,
    updatePayeeInfo,
  } = payeeInfoActions
  const {
    getContinentList,
    getContinentCountryList,
  } = geoDataActions

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
