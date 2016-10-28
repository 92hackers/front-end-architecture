
const dashboardDisplay = (state = {}, action) => {
  switch (action.type) {
    case 'DISPLAY':
      return { ...state, comp: action.comp };

    default:
      return state;
  }
};

export default dashboardDisplay;
