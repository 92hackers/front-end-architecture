import React, { PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import WaitForSubmit from '../universal/WaitForSubmit'
import Select from 'react-select'
// import { WrappedSelect } from '../utilities';

const WrappedSelect = ({input, ...props}) => {
  const {name, value} = input
  return (
    <Select
      name={name}
      value={value}
      {...props}
      onChange={(newValue) => {
        if (!!newValue) {
          input.onChange(newValue.value)
          if (typeof props.onChange === "function") {
            props.onChange(newValue.value)
          }
        } else {
          input.onChange(newValue)
        }
      }
      }
    />
  )
}

class EditProfileForm extends React.Component {

  constructor (props) {
    super (props)
  }

 componentWillMount () {
   const {token, getRegionList, getCityList, initialValues} = this.props
   const {countryId, regionId, cityId} = initialValues
   this.props.getCountryList(token)
   this.props.getTimezoneList(token)
   if (!!countryId) getRegionList(token, countryId)
   if (!!regionId) getCityList(token, regionId)
 }

 changeCountry (...args) {
   const {token, getRegionList} = this.props
   getRegionList(token, args[0])
 }

 changeRegion (...args) {
   const {token, getCityList} = this.props
   getCityList(token, args[0])
 }

 render () {
   const { initialValues, countryList, regionList, cityList, timezoneList, handleSubmit, pristine } = this.props

   return (
     <form onSubmit={handleSubmit}>
       <div className="location-wrap">
         <div className="caption">Location of Residence</div>
         <div className="input-wrap">
           <span className="dropdown-icon-wrap"><i className="fa fa-map-marker"></i></span>
           <Field
             name="countryId"
             placeholder="Country"
             component={WrappedSelect}
             options={countryList}
             onChange={this.changeCountry.bind(this)}
           />
           <i className="vertical-line"></i>
           <Field
             name="regionId"
             placeholder="Region"
             component={WrappedSelect}
             options={regionList}
             onChange={this.changeRegion.bind(this)}
           />
           <i className="vertical-line"></i>
           <Field
             name="cityId"
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
             name="timezoneId"
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
           <Field name="zoomId" component={TextField} type="text"/>
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
             <Field name="countryCode" style={{width: 60}} component={TextField} type="text"/>
           </div>
           <i className="vertical-line"></i>
           <Field name="phoneNumber" component={TextField} type="text"/>
         </div>
       </div>
       <div className="submit text-center">
         <div className="btn">
           <RaisedButton label="Save" labelStyle={{fontSize: 26}} style={{width: 200, height: 48}} primary={true} type="submit"></RaisedButton>
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
