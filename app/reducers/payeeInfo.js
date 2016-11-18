import { payeeInfoActions } from '../actions';

const {
  PAYEEINFO,
  SWIFT_CODE,
} = payeeInfoActions

const initialState = {
  payeeInfoIsFetching: '',
  swiftCodeIsFetching: '',
  accountInfo: { region: '', country: '', name: '', address: '', accountNum: '', swiftCode: '', bankName: '', bankCode: '' },
  failed: false,
  bankNameData: '',
}

export default function payeeInfo(state = initialState, action) {
  const { type, payload } = action
  const data = payload ? payload.data : []
  switch (type) {
    case PAYEEINFO.REQUEST:
      return { ...state, payeeInfoIsFetching: true }

    case PAYEEINFO.SUCCESS:
      return { ...state, payeeInfoIsFetching: false, accountInfo: data }

    case PAYEEINFO.FAILURE:
      return { ...state, payeeInfoIsFetching: false, failed: true }

    case SWIFT_CODE.REQUEST:
      return { ...state, swiftCodeIsFetching: true }

    case SWIFT_CODE.SUCCESS:
      return { ...state, swiftCodeIsFetching: false, bankNameData: data.length > 0 ? data[0].bankName : '' }

    case SWIFT_CODE.FAILURE:
      return { ...state, swiftCodeIsFetching: false, failed: true }

    default:
      return state
  }
}
