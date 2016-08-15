import React from 'react'

class NotFound extends React.Component {

  constructor (props) {
    super (props);
  }

  render () {

    const styles = {
      paddingTop: "200px",
      paddingBottom: "200px"
    };

    return (
      <section style={styles} className="site-not-found">
        <h1 className="text-center">Page you are going to view is not found.</h1>
      </section>
    )
  }
}

export default NotFound
