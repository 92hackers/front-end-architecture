import { connect } from 'react-redux';
import { userActions } from '../actions';
import { default as Comp } from '../components/universal/SignOutButton'

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(userActions.signOut()),
})

const SignOutButton = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default SignOutButton;
