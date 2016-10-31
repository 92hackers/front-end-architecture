import { connect } from 'react-redux';
import { notificationActions, apiActions } from '../actions';
import { default as Comp } from '../components/universal/AvatarUpload';

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => ({
  uploadFileData: data => dispatch(apiActions.uploadFileData(data)),
  showNotification: message => dispatch(notificationActions.showNotification(message)),
})

const AvatarUpload = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default AvatarUpload;
