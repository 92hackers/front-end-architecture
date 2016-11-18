import { createRequestTypes, apicall } from './lib';

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
