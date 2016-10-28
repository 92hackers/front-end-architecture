import { createAction, createRequestTypes, apicall } from './lib';

// TODO:  目前对于 POST 的请求，不要设置相对应的 reducer, 因为不需要保存，我可以用 promise 直接取到数据来用。 貌似有了 redux-thunk 可用。

// TODO: 下面的代码都是一样的，有什么办法能够减少？

// geo data resources.

export const GEO_CONTINENT = createRequestTypes('GEO_CONTINENT')
export const getContinentList = () => apicall('geo/continent', GEO_CONTINENT)

export const GEO_CONTINENTCOUNTRY = createRequestTypes('GEO_CONTINENTCOUNTRY')
export const getContinentCountryList = continentId => apicall(`geo/continent/${continentId}`, GEO_CONTINENTCOUNTRY)

export const GEO_NATIONALITY = createRequestTypes('GEO_NATIONALITY')
export const getNationalityList = () => apicall('geo/nationality', GEO_NATIONALITY)

export const GEO_COUNTRY = createRequestTypes('GEO_COUNTRY')
export const getCountryList = () => apicall('geo/country', GEO_COUNTRY)

export const GEO_REGION = createRequestTypes('GEO_REGION')
export const getRegionList = countryCode => apicall(`geo/region/${countryCode}`, GEO_REGION)

export const GEO_CITY = createRequestTypes('GEO_CITY')
export const getCityList = regionCode => apicall(`geo/city/${regionCode}`, GEO_CITY)

export const GEO_TIMEZONE = createRequestTypes('GEO_TIMEZONE')
export const getTimezoneList = () => apicall('geo/timezone', GEO_TIMEZONE)

// user.

export const SIGNUP = createRequestTypes('SIGNUP')
export const signUp = data => apicall('user/signup', SIGNUP, { data })

export const SIGNIN = createRequestTypes('SIGNIN')
export const signIn = data => apicall('user/login', SIGNIN, { data })

export const PROFILE = createRequestTypes('PROFILE')
export const getProfile = () => apicall('user/profile', PROFILE)

export const PROFILE_UPDATE = createRequestTypes('PROFILE_UPDATE')
export const updateProfile = data => apicall('user/profile', PROFILE_UPDATE, { data })

export const RESEND_ACTIVATION_EMAIL = createRequestTypes('RESEND_ACTIVATION_EMAIL')
export const resendActivationEmail = data => apicall('user/active', RESEND_ACTIVATION_EMAIL, { data })

export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD')
export const resetPassword = data => apicall('user/reqreset', RESET_PASSWORD, { data })

export const ACTIVATE_ACCOUNT = createRequestTypes('ACTIVATE_ACCOUNT')
export const activateAccount = activeCode => apicall(`user/active/${activeCode}`, ACTIVATE_ACCOUNT)

export const UPLOAD_TOKEN = createRequestTypes('UPLOAD_TOKEN')
export const getUploadToken = () => apicall('file/token', UPLOAD_TOKEN)

export const UPLOAD_FILE = createRequestTypes('UPLOAD_FILE')
export const uploadFileData = data => apicall('file/upload', UPLOAD_FILE, { data })

export const UPDATE_PASSWORD = createRequestTypes('UPDATE_PASSWORD')
export const updatePassword = data => apicall('user/uppw', UPDATE_PASSWORD, { data })

// teacher application.

export const APPLY_BASIC_INFO = createRequestTypes('APPLY_BASIC_INFO')
export const updateBasicInfo = data => apicall('apply/step1', APPLY_BASIC_INFO, { data })

export const APPLY_TEACHING_EXP = createRequestTypes('APPLY_TEACHING_EXP')
export const updateTeachingExp = data => apicall('apply/step2', APPLY_TEACHING_EXP, { data })

export const APPLY_INTERVIEW = createRequestTypes('APPLY_INTERVIEW')
export const updateInterview = data => apicall('apply/step3', APPLY_INTERVIEW, { data })

export const INTERVIEW_LIST = createRequestTypes('INTERVIEW_LIST')
export const getInterviewList = timezoneId => apicall(`user/interview/${timezoneId}`, INTERVIEW_LIST)

// payee info.

export const PAYEEINFO_UPDATE = createRequestTypes('PAYEEINFO_UPDATE')
export const updatePayeeInfo = data => apicall('user/account', PAYEEINFO_UPDATE, { data })

export const PAYEEINFO = createRequestTypes('PAYEEINFO')
export const getPayeeInfo = () => apicall('user/account', PAYEEINFO)

export const SWIFT_CODE = createRequestTypes('SWIFT_CODE')
export const queryBySwiftcode = code => apicall(`data/swiftcode/${code}`, SWIFT_CODE)

// online test.

export const TEST_QUESTION = createRequestTypes('TEST_QUESTION')
export const getTestQuestions = step => apicall(`exam/q/${step}`, TEST_QUESTION)   // step = {1, 2, 3, 4, 5}

export const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS'
export const clearTestQuestions = () => createAction(CLEAR_QUESTIONS)

export const TEST_CHECK = createRequestTypes('TEST_CHECK')
export const checkAnswer = (step, data) => apicall(`exam/a/${step}`, TEST_CHECK, { data })

// lesson timetable and template.

export const WEEK_TEMPLATE = createRequestTypes('WEEK_TEMPLATE')
export const getWeekTemplate = () => apicall('lesson/template', WEEK_TEMPLATE)

export const UPDATE_WEEK_TEMPLATE = createRequestTypes('UPDATE_WEEK_TEMPLATE')
export const updateWeekTemplate = data => apicall('lesson/template', UPDATE_WEEK_TEMPLATE, { data })

export const WEEK_TIMETABLE = createRequestTypes('WEEK_TIMETABLE')
export const getWeekTimetable = week => apicall(`lesson/weekly/${week}`, WEEK_TIMETABLE)    // default to Today.

export const MONTH_TIMETABLE = createRequestTypes('MONTH_TIMETABLE')
export const getMonthTimetable = month => apicall(`lesson/monthly/${month}`, MONTH_TIMETABLE)

export const UPDATE_WEEK_TIMETABLE = createRequestTypes('UPDATE_WEEK_TIMETABLE')
export const updateWeekTimetable = data => apicall('lesson/timetable', UPDATE_WEEK_TIMETABLE, { data })
