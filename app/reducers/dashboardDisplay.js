const dashboardDisplay = (state = {}, action) => {
  switch (action.type) {
    case 'DASHBOARD_DISPLAY':
      return {
        component: action.component
      }
    default:
      return state;
  }
};

export default dashboardDisplay;
