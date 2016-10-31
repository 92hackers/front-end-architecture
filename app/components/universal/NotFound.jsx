import React from 'react'

export default function NotFound() {
  const styles = {
    paddingTop: '200px',
    paddingBottom: '200px',
  };

  return (
    <section style={styles} className="site-not-found">
      <h1 className="text-center">Page you are going to view is not found.</h1>
    </section>
  )
}
