// send request.
//  created by Chen yuan.

import reqwest from 'reqwest';

var host = "";
var apiVersion = "/v1/";

var host = "http://api.yiyouabc.com";

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
    name: "TNationalityList",
    options: {
      api: "geo/nationality",
      method: "get"
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
  },
  {
    name: "TInterview",
    options: {
      api: "user/interview",
      queryParam: true,             //   user/interview/{timezone_id}
      method: "get"
    }
  },
  {
    name: "TNewEmail",
    options: {
      api: "user/active",
      method: "post"
    }
  },
  {
    name: "TReqReset",
    options: {
      api: "user/reqreset",
      method: "post"
    }
  },
  {
    name: "TEmailActivate",
    options: {
      api: "user/active",
      queryParam: true,           //  plus active code behind it.
      method: "get"
    }
  },
  {
    name: "TReset",
    options: {
      api: "user/reset",
      method: "post"
    }
  },
  {
    name: "FileUploadToken",          //  need  authorization.
    options: {
      api: "file/token",
      method: "get"
    }
  },
  {
    name: "FileUpload",               //  need  authorization
    options: {
      api: "file/upload",
      method: "post"
    }
  },
  {
    name: "ChangePassword",           //  need  authorization.
    options: {
      api: "user/uppw",
      method: "post"
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
