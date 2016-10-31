import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default function Loading(props) {
  const style = {
    textAlign: 'center',
    display: !props.pendingCounter ? 'none' : 'block',
    paddingTop: 200,
    paddingBottom: 200,
  };

  return (
    <div className="site-loading" style={style}>
      <CircularProgress />
    </div>
  )
}
