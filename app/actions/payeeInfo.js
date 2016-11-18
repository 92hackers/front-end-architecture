import { createRequestTypes, apicall } from './lib';

// payee info.

export const PAYEEINFO_UPDATE = createRequestTypes('PAYEEINFO_UPDATE')
export const updatePayeeInfo = data => apicall('user/account', PAYEEINFO_UPDATE, { data })

export const PAYEEINFO = createRequestTypes('PAYEEINFO')
export const getPayeeInfo = () => apicall('user/account', PAYEEINFO)

export const SWIFT_CODE = createRequestTypes('SWIFT_CODE')
export const queryBySwiftcode = code => apicall(`data/swiftcode/${code}`, SWIFT_CODE)
