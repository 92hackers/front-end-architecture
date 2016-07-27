// teacher's homepage.

import React from 'react';
import reqwest from 'reqwest';

class THomepage extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {
    return (
      <section className="t-homepage">

      </section>
    )
  }

  componentDidMount () {
    var profileRequest = reqwest({
      url: "http://api.weteach.test/v1/user/profile",
      method: "get",
      crossOrigin: true,
      headers: { "Authorization": "Bearer nNlVSA9i3eSYxCP5uf9jO72zMmfDnsF-"}
    })
    .then((resp) => {
      console.log(resp);
    })
    .fail((err) => {
      console.log("error request.");
    })
  }

  componentWillUnmount () {

  }
}

export default THomepage;
