const addToken = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        token: action.token
      }
    default:
      return state
  }
}

export default addToken
