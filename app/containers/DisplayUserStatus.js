import { connect } from 'react-redux';
import DisplayUserStatusComp from '../teacher-components/DisplayUserStatus';

const mapStateToProps = state => ({
  profile: state.user.profile,
  pendingCounter: state.pendingCounter,
})

const mapDispatchToProps = () => ({

})

const DisplayUserStatus = connect(mapStateToProps, mapDispatchToProps)(DisplayUserStatusComp);

export default DisplayUserStatus;
