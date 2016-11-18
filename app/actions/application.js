import { createAction, createRequestTypes, apicall } from './lib';

// TODO:  目前对于 POST 的请求，不要设置相对应的 reducer, 因为不需要保存，我可以用 promise 直接取到数据来用。redux-saga.

// TODO: 下面的代码都是一样的，有什么办法能够减少？

export const UPLOAD_TOKEN = createRequestTypes('UPLOAD_TOKEN')
export const getUploadToken = () => apicall('file/token', UPLOAD_TOKEN)

export const UPLOAD_FILE = createRequestTypes('UPLOAD_FILE')
export const uploadFileData = data => apicall('file/upload', UPLOAD_FILE, { data })

export const INTERVIEW_LIST = createRequestTypes('INTERVIEW_LIST')
export const getInterviewList = timezoneId => apicall(`user/interview/${timezoneId}`, INTERVIEW_LIST)

export const APPLY_BASIC_INFO = createRequestTypes('APPLY_BASIC_INFO')
export const updateBasicInfo = data => apicall('apply/step1', APPLY_BASIC_INFO, { data })

export const APPLY_TEACHING_EXP = createRequestTypes('APPLY_TEACHING_EXP')
export const updateTeachingExp = data => apicall('apply/step2', APPLY_TEACHING_EXP, { data })

export const APPLY_INTERVIEW = createRequestTypes('APPLY_INTERVIEW')
export const updateInterview = data => apicall('apply/step3', APPLY_INTERVIEW, { data })

export const CHANGE_TIMEZONE = 'CHANGE_TIMEZONE'
/* eslint max-len: 0 */
export const changeTimezone = timezoneId => createAction(CHANGE_TIMEZONE, { timezoneId })
