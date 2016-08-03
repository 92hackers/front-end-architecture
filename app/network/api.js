// send request.
//  created by Chen yuan.

//var reqwest = require('reqwest');

import reqwest from 'reqwest';

var host = "";
var apiVersion = "/v1/";

var host = "http://api.weteach.test";

var apis = [
    {
        name: "TSignUp",
        options: {
            api: "user/signup",
            method: "post"
        }
    },
    {
        name: "TSignIn",
        options: {
            api: "user/login",
            method: "post"
        }
    },
    {
        name: "TGetProfile",
        options: {
            api: "user/profile",
            method: "get"
        }
    },
    {
        name: "TUpdateProfile",
        options: {
            api: "user/profile",
            method: "post"
        }
    },
    {
        name: "TCountryList",
        options: {
            api: "geo/country",
            method: "get"
        }
    },
    {
        name: "TRegionList",
        options: {
            api: "geo/region",
            queryParam: true,
            method: "get"
        }
    },
    {
        name: "TCityList",
        options: {
            api: "geo/city",
            queryParam: true,            // geo/city/country_code.
            method: "get"
        }
    },
    {
        name: "TTimezone",
        options: {
            api: "geo/timezone",
            method: "get"
        }
    }
];

apis.forEach((item, index) => {
  exports[item.name] = (data, header, queryParam, successCall, failCall) => {
      var options = item.options;
      var queryParam = options.queryParam ? "/" + queryParam : "";
      return reqwest({
          url: host + apiVersion + options.api + queryParam,
          method: options.method,
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
