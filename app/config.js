/* eslint-disable */
let store = '';

if (ENV === 'production') {
  store = require('./store/store-build')
} else {
  store = require('./store/store-dev')
}

export {
  store
}
// 这种情况更好的办法应该怎么写？
