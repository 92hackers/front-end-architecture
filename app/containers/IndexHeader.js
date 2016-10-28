import { connect } from 'react-redux';
import { notificationActions } from '../actions';
import IndexHeaderComp from '../teacher-components/IndexHeader';

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  status: state.user.profile.status,
  examined: state.user.profile.examined,
})

const mapDispatchToProps = dispatch => ({
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const IndexHeader = connect(mapStateToProps, mapDispatchToProps)(IndexHeaderComp);

export default IndexHeader;
