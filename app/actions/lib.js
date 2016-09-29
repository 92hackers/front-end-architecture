//  to  generate actions.

export function createAction(type, payload = {}) {
  return {type, ...payload};
}
