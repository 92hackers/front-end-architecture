import { apiActions } from '../actions';

const {
  PAYEEINFO_REQUEST,
  PAYEEINFO_SUCCESS,
  PAYEEINFO_FAILURE,
  SWIFT_CODE_REQUEST,
  SWIFT_CODE_SUCCESS,
  SWIFT_CODE_FAILURE,
} = apiActions

const initialState = {
  isFetching: false,
  accountInfo: {region: "", country: "", name: "", address: "", accountNum: "", swiftCode: "", bankName: "", bankCode: ""},
  isSuccess: false,
  bankNameData: ""
}

export default function payeeInfo (state = initialState, action) {
  switch (action.type) {
    case PAYEEINFO_REQUEST:
      return {...state, isFetching: true}

    case PAYEEINFO_SUCCESS:
      return {...state, isFetching: false, isSuccess: true, accountInfo: action.payload.data}

    case PAYEEINFO_FAILURE:
      return {...state, isFetching: false, isSuccess: false}

    case SWIFT_CODE_REQUEST:
      return {...state, isFetching: true}

    case SWIFT_CODE_SUCCESS:
      const { data } = action.payload
      return {...state, isFetching: false, isSuccess: true, bankNameData: data.length > 0 ? data[0].bankName : ""}

    case SWIFT_CODE_FAILURE:
      return {...state, isFetching: false, isSuccess: false}

    default:
      return state
  }
}
