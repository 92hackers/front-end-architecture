import { connect } from 'react-redux';
import { default as Comp } from '../components/universal/Loading';

const mapStateToProps = state => ({
  pendingCounter: state.pendingCounter,
})

const SiteLoading = connect(mapStateToProps)(Comp);

export default SiteLoading;
