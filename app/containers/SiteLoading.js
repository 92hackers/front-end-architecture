import { connect } from 'react-redux';
import Loading from '../universal/Loading';

const mapStateToProps = state => ({
  pendingCounter: state.pendingCounter,
})

const SiteLoading = connect(mapStateToProps)(Loading);

export default SiteLoading;
