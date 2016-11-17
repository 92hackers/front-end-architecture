import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../components/homepage/Settings';

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
  updatePassword: data => dispatch(apiActions.updatePassword(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const UserSettings = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default UserSettings;
