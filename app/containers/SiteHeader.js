import { connect } from 'react-redux'
import { default as Comp } from '../components/SiteHeader'

const mapStateToProps = (state) => {
  const { loggedIn, profile } = state.user
  return {
    loggedIn,
    profile,
  }
};

const mapDispatchToProps = null

const SiteHeader = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default SiteHeader;
