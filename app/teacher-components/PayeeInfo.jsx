import React, { PropTypes } from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form'
import { browserHistory } from 'react-router'
import { TextField } from 'redux-form-material-ui'
import Tooltip from 'react-tooltip'
import WaitForSubmit from '../universal/WaitForSubmit'
import WrappedSelect from '../universal/WrappedSelect';

class PayeeInfo extends React.Component {

 constructor (props) {
   super (props);
   this.state = {
     isAustraliaSelected: false
   }
 }

 componentDidMount () {
   const { getPayeeInfo, getContinentList, getContinentCountryList, initialValues } = this.props
   const { region } = initialValues
   getPayeeInfo()
   getContinentList()
   if (!!region) getContinentCountryList(region)
 }

 componentWillReceiveProps (nextProps) {
   const {getContinentCountryList, bankNameData, change, initialValues } = nextProps
   const { region, country } = initialValues
   const field = document.querySelector("[name='bankName']")

   if (bankNameData !== this.props.bankNameData) {
     field.value = bankNameData
     change("bankName", bankNameData)
   }

   if (region !== this.props.initialValues.region && !!region) {
     getContinentCountryList(region)
     if (!!country && country === 2036) {
       this.setState({
         isAustraliaSelected: true
       });
     }
   }
 }

 changeCountry (...args) {
   var isAustraliaSelected = false
   if (args[0] === 2036) {
     isAustraliaSelected = true
   }
   this.setState({
     isAustraliaSelected: isAustraliaSelected
   });
 }

 handleSubmit (values) {
   const { region, country, name, address, accountNum, swiftCode, bankName, bankCode } = values
   const { updatePayeeInfo, showNotification, networkError } = this.props

   var warn = ""
   if (!region) {
     warn = "Please select payee's region of found collection."
   } else if (!country) {
     warn = "Please select payee's country of residence."
   } else if (!name) {
     warn = "Please input payee's name."
   } else if (name.length > 70) {
     warn = "The length of payee's name should be less than 70 characters."
   } else if (!address) {
     warn = "Please input payee's address."
   } else if (address.length > 105) {
     warn = "The length of payee's address should be less than 105 characters."
   } else if (!accountNum) {
     warn = "Please input payee's account number."
   } else if (!swiftCode) {
     warn = "Please input payee's bank's SWIFT code."
   } else if (!bankName) {
     warn = "Please click Confirm button to complete payee's bank full name."
   } else if (country === 2036 && !bankCode) {          // Notes:  only located at australia, you need enter bank code.
     warn = "Please input payee's bank's bank code."
   }

   if (warn.length > 0) {
     showNotification(warn)
     return
   } else {
     updatePayeeInfo(values).then(res => {
       if (res.payload.success) {
         showNotification("Payee's information saved successfully.")
         const timeId = setTimeout(() => {
           browserHistory.replace('/teacher-homepage')
         }, 4100)
       } else {
         networkError()
       }
     })
   }

 }

 sendSwiftCode () {
   const { queryBySwiftcode, showNotification } = this.props
   const code = document.querySelector("[name='swiftCode']").value.trim()
   if (!code) {
     showNotification("Please input your swift code.")
   } else {
     queryBySwiftcode(code).then(res => {
       if (!res.payload.data.length) {
         showNotification("Code you entered is incorrect, please try again.")
       }
     })
   }
 }

 render () {

   const { continentList, continentCountryList, initialValues, handleSubmit, pristine, getContinentCountryList } = this.props

   return (
     <section className="payee-info">
       <div className="wrap">
         <header className="text-center">Please fill in payee's information</header>
         <section className="content">
           <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
             <ul className="fields-list">
               <li className="select">
                 <span className="label">Region of found collection:</span>
                 <Field
                   className="field"
                   name="region"
                   component={WrappedSelect}
                   options={continentList}
                   onChange={getContinentCountryList.bind(this)}
                 />
               </li>
               <li className="select">
                 <span className="label">Payee's country(region) of residence:</span>
                 <Field
                   className="field"
                   name="country"
                   component={WrappedSelect}
                   options={continentCountryList}
                   onChange={this.changeCountry.bind(this)}
                 />
               </li>
               <li>
                 <span className="label">Payee's name:</span>
                 <Field
                   data-for="payee-info"
                   data-tip="You can input 70 more characters."
                   data-event="click"
                   className="field"
                   name="name"
                   component={TextField}
                 />
               </li>
               <li className="address">
                 <span className="label">Payee's address:</span>
                 <Field
                   data-for="payee-info"
                   data-tip="You can input 105 more characters."
                   data-event="click"
                   className="field"
                   name="address"
                   component={TextField}
                   multiLine={true}
                   rows={3}
                   rowsMax={3}
                   maxLength="105"
                 />
               </li>
               <li>
                 <span className="label">Payee's account number:</span>
                 <Field
                   data-for="payee-info"
                   data-tip="Please fill in the IBAN. No links or spaces."
                   data-event="click"
                   className="field"
                   name="accountNum"
                   component={TextField}
                 />
               </li>
               <li className="swift-code">
                 <span className="label">Payee's bank's SWIFT code:</span>
                 <div className="field">
                   <Field
                     data-for="payee-info"
                     data-tip="A combination of 11 English characters and<br />numerals. No hyphens or blank spaces."
                     data-event="click"
                     name="swiftCode"
                     className="input-box"
                     component={TextField}
                   />
                   <RaisedButton disabled={pristine} label="Confirm" primary={true} onClick={this.sendSwiftCode.bind(this)}></RaisedButton>
                 </div>
               </li>
               <li>
                 <span className="label">Payee's bank full name:</span>
                 <Field
                   data-for="payee-info"
                   data-tip="The full name of the receiving bank must<br />contain branch name. Maximum length<br />is 105 characters."
                   data-event="click"
                   className="field"
                   name="bankName"
                   disabled={true}
                   component={TextField}
                 />
               </li>
               {
                 this.state.isAustraliaSelected ? (
                   <li>
                     <span className="label">Payee's bank's bank code</span>
                     <Field
                       data-for="payee-info"
                       data-tip="Please fill in the payee's bank's BSB,<br />a combination of 6 numerals."
                       data-event="click"
                       className="field"
                       name="bankCode"
                       component={TextField}
                     />
                   </li>
                     ) : (<li></li>)
               }
             </ul>
             <div className="submit text-center">
               <div className="btn">
                 <RaisedButton disabled={pristine} className="submit-btn" label="Save" labelStyle={{fontSize: 26}} style={{width: 200, height: 48}} primary={true} type="submit"></RaisedButton>
                 <WaitForSubmit ref="loader"></WaitForSubmit>
               </div>
             </div>
           </form>
         </section>
       </div>
       <Tooltip id="payee-info" html={true} multiLine={true} place="bottom" type="dark" effect="solid" globalEventOff='click'></Tooltip>
     </section>
   )
 }
}

PayeeInfo = reduxForm({
  form: "payeeInfo",
  enableReinitialize: true        // allow comp to re initialize.
})(PayeeInfo)

export default PayeeInfo
