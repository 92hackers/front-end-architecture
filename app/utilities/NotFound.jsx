import React from 'react'

class NotFound extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {

    const styles = {
      paddingTop: "200px"
    };

    return (
      <section className="site-not-fount">
        <h1 className="text-center">Page you are viewing is not found.</h1>
      </section>
    )
  }
}

export default NotFound
