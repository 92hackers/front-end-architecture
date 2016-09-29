import {connect} from 'react-redux';
import Loading from '../universal/Loading';
import { pendingCounterActions } from '../actions';

const mapStateToProps = (state) => {
  return {
    pendingCounter: state.pendingCounter
  }
};

const SiteLoading = connect(mapStateToProps)(Loading);

export default SiteLoading;
