import { createAction } from './lib';

export const DISPLAY = 'DISPLAY';
export const dashboardDisplay = comp => createAction(DISPLAY, { comp });
