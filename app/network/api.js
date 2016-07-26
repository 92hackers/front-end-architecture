// send request.

import reqwest from 'reqwest';
import config from 'config';

var host = config.env === "dev" ? config.devHost : config.productionHost;
var apiVersion = config.apiVersion;

var apis = {
  TSignUp: {
    api: "user/signup/",
    method: "post"
  },        // 教师注册
  TSignIn: {
    api: "user/login/",
    method: "post"
  },
  TProfile: {
    api: "user/profile/",
    method: "get"
  },
  TCountryList: {
    api: "loc/country/",
    method: "get"
  },
  TCityList: {
    api: "loc/city/",
    queryParam: true,            // loc/city/country_code.
    method: "get"
  },
  TTimezone: {
    api: "loc/timezone/",
    method: "get"
  }
};

apis.forEach((item, index) => {
  exports.item = (data, header, queryParam, successCall, failCall) => {
    var queryParam = item.queryParam ? queryParam : "";
    reqwest({
      url: host + apiVersion + item.api + queryParam,
      method: item.method,
      type: "json",
      headers: header,
      data: data
    })
    .then((resp) => {
      successCall(resp);
    })
    .fail((err) => {
      failCall(err);
    })
  };
});
