import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../../components/application-steps/BasicInfo';

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  showNotification: message => dispatch(notificationActions.showNotification(message)),
  networkError: () => dispatch(notificationActions.networkError()),
})

const BasicInfo = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default BasicInfo;
