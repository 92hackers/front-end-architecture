import { createAction } from './lib';

export const DISPLAY_HELP_BOX = 'DISPLAY_HELP_BOX'
export const HIDE_HELP_BOX = 'HIDE_HELP_BOX'

export const displayHelpBox = () => createAction(DISPLAY_HELP_BOX)
export const hideHelpBox = () => createAction(HIDE_HELP_BOX)

export const DISPLAY_SITE_MODAL = 'DISPLAY_SITE_MODAL'
export const HIDE_SITE_MODAL = 'HIDE_SITE_MODAL'

export const displaySiteModal = () => createAction(DISPLAY_SITE_MODAL)
export const hideSiteModal = () => createAction(HIDE_SITE_MODAL)
