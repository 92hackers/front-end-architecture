// send request.
//  created by Chen yuan.

import reqwest from 'reqwest';

var apiVersion = "/v1/";
var host = "http://api.weteach.info";

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
    name: "TApplyStep1",
    options: {
      api: "apply/step1",
      method: "post"
    }
  },
  {
    name: "TApplyStep2",
    options: {
      api: "apply/step2",
      method: "post"
    }
  },
  {
    name: "TApplyStep3",
    options: {
      api: "apply/step3",
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
  },
  {
    name: "LessonTemplateInfo",       //  need  authorization.
    options: {
      api: "lesson/template",
      method: "get"
    }
  },
  {
    name: "NewLessonTemplate",         //  need  authorization.
    options: {
      api: "lesson/template",
      method: "post"
    }
  },
  {
    name: "NewLessonTimeTable",         //  need authorization.     teacher schedule lessons.
    options: {
      api: "lesson/timetable",
      method: "post"
    }
  },
  {
    name: "WeeklyTimeTable",         //  authorization,   get weekly time table.
    options: {
      api: "lesson/weekly",
      method: "get",
      queryParam: true                //   need  date,  default today.
    }
  },
  {
    name: "MonthlyTimeTable",         // authorization,   get monthly time table.
    options: {
      api: "lesson/monthly",
      method: "get",
      queryParam: true                //   need  date,    default  today.
    }
  },

  //  online test qpis.

  {
    name: "OnlineTestQuestion",       //  need  authorization.
    options: {
      api: "exam/q",
      method: "get",
      queryParam: true                //  need  step parameter, must provided. step = {1,2,3,4,5,6};
    }
  },
  {
    name: "onlineTestCheck",           //  need authorization.
    options: {
      api: "exam/a",
      method: "post",
      queryParam: true                 //  need  step parameter, must provided. step = {1,2,3,4,5,6};
    }
  }

];

apis.forEach((item, index) => {
  exports[item.name] = (data, header, queryParam, successCall, failCall) => {
    var options = item.options;
    var queryParam = options.queryParam && !!queryParam ? "/" + queryParam : "";
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
