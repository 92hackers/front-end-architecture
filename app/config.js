var store = "";

if (ENV === "production") {
  store = require("./store/store-build")
} else {
  store = require("./store/store-dev")
}

export {
  store
}
