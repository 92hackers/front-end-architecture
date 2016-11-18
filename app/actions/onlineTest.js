import { createAction, createRequestTypes, apicall } from './lib';

export const TEST_QUESTION = createRequestTypes('TEST_QUESTION')
export const getTestQuestions = step => apicall(`exam/q/${step}`, TEST_QUESTION)   // step = {1, 2, 3, 4, 5}

export const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS'
export const clearTestQuestions = () => createAction(CLEAR_QUESTIONS)

export const TEST_CHECK = createRequestTypes('TEST_CHECK')
export const checkAnswer = (step, data) => apicall(`exam/a/${step}`, TEST_CHECK, { data })
