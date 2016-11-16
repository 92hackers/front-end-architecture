import { connect } from 'react-redux'
import { utilityActions } from '../actions'
import { default as Comp } from '../components/DisplayHelp'

const mapStateToProps = state => ({ open: state.utility.guideBoxOpen })

const mapDispatchToProps = dispatch => ({
  hideHelpBox: () => dispatch(utilityActions.hideHelpBox),
})

const DisplayHelp = connect(mapStateToProps, mapDispatchToProps)(Comp);

export default DisplayHelp
