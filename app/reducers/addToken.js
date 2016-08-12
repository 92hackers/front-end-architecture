const addToken = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        token: action.token
      }
    case 'REMOVE_TOKEN':
      return {
        token: ""
      }
    default:
      return state
  }
}

export default addToken
