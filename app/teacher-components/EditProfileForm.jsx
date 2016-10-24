import React, { PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import WaitForSubmit from '../universal/WaitForSubmit'
import WrappedSelect from '../universal/WrappedSelect';

class EditProfileForm extends React.Component {

  constructor (props) {
    super (props)
  }

 componentDidMount () {
   const {getCountryList, getTimezoneList, getRegionList, getCityList, initialValues} = this.props
   const {residence_n, residence_p, residence_c} = initialValues
   if (!!residence_n) getRegionList(residence_n)
   if (!!residence_p) getCityList(residence_p)
   getCountryList()
   getTimezoneList()
 }

 render () {
   const { initialValues, countryList, regionList, cityList, timezoneList, handleSubmit, pristine, getRegionList, getCityList } = this.props

   return (
     <form onSubmit={handleSubmit}>
       <div className="location-wrap">
         <div className="caption">Location of Residence</div>
         <div className="input-wrap">
           <span className="dropdown-icon-wrap"><i className="fa fa-map-marker"></i></span>
           <Field
             name="residence_n"
             placeholder="Country"
             component={WrappedSelect}
             options={countryList}
             onChange={getRegionList.bind(this)}
           />
           <i className="vertical-line"></i>
           <Field
             name="residence_p"
             placeholder="Region"
             component={WrappedSelect}
             options={regionList}
             onChange={getCityList.bind(this)}
           />
           <i className="vertical-line"></i>
           <Field
             name="residence_c"
             placeholder="City"
             component={WrappedSelect}
             options={cityList}
           />
         </div>
       </div>
       <div className="timezone">
         <div className="caption">Time Zone</div>
         <div className="input-wrap">
           <span className="dropdown-icon-wrap"><i className="fa fa-clock-o"></i></span>
           <Field
             name="timezone"
             placeholder="Time Zone"
             component={WrappedSelect}
             options={timezoneList}
           />
         </div>
       </div>
       <div className="zoom-id">
         <div className="caption">Zoom Personal Meeting ID</div>
         <div className="input-wrap">
           <span className="dropdown-icon-wrap"><i className="fa fa-desktop"></i></span>
           <Field name="zoomid" component={TextField} type="text"/>
         </div>
       </div>
       <div className="phone">
         <div className="caption">
           <span className="code">International Calling Code</span>
           <span className="number">Telephone Number</span>
         </div>
         <div className="input-wrap">
           <span className="dropdown-icon-wrap"><i className="fa fa-phone"></i></span>
           <div className="country-code-wrap">
             <span className="plus-icon">+</span>
             <Field name="tel_code" style={{width: 60}} component={TextField} type="text"/>
           </div>
           <i className="vertical-line"></i>
           <Field name="tel_num" component={TextField} type="text"/>
         </div>
       </div>
       <div className="submit text-center">
         <div className="btn">
           <RaisedButton disabled={pristine} className="submit-btn" label="Save" labelStyle={{fontSize: 26}} style={{width: 200, height: 48}} primary={true} type="submit"></RaisedButton>
           <WaitForSubmit ref="loader"></WaitForSubmit>
         </div>
       </div>
     </form>
   )
 }
}

// EditProfileForm.propTypes = {
//   token: PropTypes.string.isRequired,
//   countryList: PropTypes.array.isRequired,
//   regionList: PropTypes.array.isRequired,
//   cityList: PropTypes.array.isRequired,
//   timezoneList: PropTypes.array.isRequired,
//   initialValues: PropTypes.shape({
//     country: PropTypes.string.isRequired,
//     region: PropTypes.string.isRequired,
//     city: PropTypes.string.isRequired,
//     timezoneName: PropTypes.string.isRequired,
//     zoomId: PropTypes.string.isRequired,
//     countryCode: PropTypes.string.isRequired,
//     phoneNumber: PropTypes.string.isRequired,
//   }).isRequired
// }

EditProfileForm = reduxForm({
  form: "editProfile"
})(EditProfileForm)

export default EditProfileForm
