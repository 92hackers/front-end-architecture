import { connect } from 'react-redux'
import { utilityActions } from '../actions'
import { default as Comp } from '../components/universal/SiteModal'

const mapStateToProps = state => ({
  siteModalOpen: state.utility.siteModalOpen,
})

const mapDispatchToProps = dispatch => ({
  hideSiteModal: () => dispatch(utilityActions.hideSiteModal()),
})

const SiteModal = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default SiteModal
