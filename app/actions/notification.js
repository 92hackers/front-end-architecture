import { createAction } from './lib';

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const NETWORK_ERROR = 'NETWORK_ERROR';

export const showNotification = message => createAction(SHOW_NOTIFICATION, { message });

export const hideNotification = () => createAction(HIDE_NOTIFICATION);

export const networkError = () => createAction(NETWORK_ERROR);
