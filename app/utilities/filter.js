// fields verification.
/* eslint-disable */

// const messages = {
//   required: 'The %s field is required.',
//   matches: 'The %s field does not match the %s field.',
//   default: 'The %s field is still set to default, please change.',
//   valid_email: 'The %s field must contain a valid email address.',
//   valid_emails: 'The %s field must contain all valid email addresses.',
//   min_length: 'The %s field must be at least %s characters in length.',
//   max_length: 'The %s field must not exceed %s characters in length.',
//   exact_length: 'The %s field must be exactly %s characters in length.',
//   greater_than: 'The %s field must contain a number greater than %s.',
//   less_than: 'The %s field must contain a number less than %s.',
//   alpha: 'The %s field must only contain alphabetical characters.',
//   alpha_numeric: 'The %s field must only contain alpha-numeric characters.',
//   alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
//   numeric: 'The %s field must contain only numbers.',
//   integer: 'The %s field must contain an integer.',
//   decimal: 'The %s field must contain a decimal number.',
//   is_natural: 'The %s field must contain only positive numbers.',
//   is_natural_no_zero: 'The %s field must contain a number greater than zero.',
//   valid_ip: 'The %s field must contain a valid IP.',
//   valid_base64: 'The %s field must contain a base64 string.',
//   valid_credit_card: 'The %s field must contain a valid credit card number.',
//   is_file_type: 'The %s field must contain only %s files.',
//   valid_url: 'The %s field must contain a valid URL.',
//   greater_than_date: 'The %s field must contain a more recent date than %s.',
//   less_than_date: 'The %s field must contain an older date than %s.',
//   greater_than_or_equal_date: 'The %s field must contain a date that\'s at least as recent as %s.',
//   less_than_or_equal_date: 'The %s field must contain a date that\'s %s or older.'
// };
//
// var ruleRegex = /^(.+?)\[(.+)\]$/,
//     numericRegex = /^[0-9]+$/,
//     integerRegex = /^\-?[0-9]+$/,
//     decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
//     emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
//     alphaRegex = /^[a-z]+$/i,
//     alphaNumericRegex = /^[a-z0-9]+$/i,
//     alphaDashRegex = /^[a-z0-9_\-]+$/i,
//     naturalRegex = /^[0-9]+$/i,
//     naturalNoZeroRegex = /^[1-9][0-9]*$/i,
//     ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
//     base64Regex = /[^a-zA-Z0-9\/\+=]/i,
//     numericDashRegex = /^[\d\-\s]+$/,
//     urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
//     dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;

export const emailValidate = (value) => {
  let result = ''
  if (value.length > 0) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRegex.test(value)) {
      result = 'The email field must contain a valid email address.'
    }
  } else {
    result = 'Please enter your email address.'
  }
  return result
}
