import { connect } from 'react-redux';
import AppContainer from '../teacher-components/AppContainer';
import { userActions } from '../actions';
import { dataIsReadyActions } from '../actions';

// const mapStateToProps = (state) => {
//
//   return {
//     token: state.user.token
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (token) => {
      dispatch(userActions.signIn(token));
    },
    getProfile: (profile) => {
      dispatch(userActions.getProfile(profile));
    }
  };
}

const App = connect(null, mapDispatchToProps)(AppContainer);
export default App;
