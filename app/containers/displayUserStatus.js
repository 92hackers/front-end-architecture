import { connect } from 'react-redux';
import { default as Comp } from '../components/homepage/DisplayUserStatus';

const mapStateToProps = state => ({
  profile: state.user.profile,
  pendingCounter: state.pendingCounter,
})

const mapDispatchToProps = () => ({

})

const DisplayUserStatus = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default DisplayUserStatus;
