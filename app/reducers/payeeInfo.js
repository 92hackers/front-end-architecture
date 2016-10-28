import { apiActions } from '../actions';

const {
  PAYEEINFO,
  SWIFT_CODE,
} = apiActions

const initialState = {
  isFetching: false,
  accountInfo: { region: '', country: '', name: '', address: '', accountNum: '', swiftCode: '', bankName: '', bankCode: '' },
  isSuccess: false,
  bankNameData: '',
}

export default function payeeInfo(state = initialState, action) {
  const { type, payload } = action
  const data = payload ? payload.data : []
  switch (type) {
    case PAYEEINFO.REQUEST:
      return { ...state, isFetching: true }

    case PAYEEINFO.SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, accountInfo: data }

    case PAYEEINFO.FAILURE:
      return { ...state, isFetching: false, isSuccess: false }

    case SWIFT_CODE.REQUEST:
      return { ...state, isFetching: true }

    case SWIFT_CODE.SUCCESS:
      return { ...state, isFetching: false, isSuccess: true, bankNameData: data.length > 0 ? data[0].bankName : '' }

    case SWIFT_CODE.FAILURE:
      return { ...state, isFetching: false, isSuccess: false }

    default:
      return state
  }
}
