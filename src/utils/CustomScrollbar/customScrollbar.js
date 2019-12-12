import React from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

export default (props) => {
  const { scrollBarRef } = props;
  const clonedProps = { ...props };
  delete clonedProps.scrollBarRef;

  return (
    <Scrollbars
      autoHideTimeout={ 1000 }
      autoHideDuration={ 200 }
      { ...clonedProps }
      ref={ scrollBarRef }
      renderTrackHorizontal={ props => <div { ...props } className="track-horizontal" /> }
      renderTrackVertical={ props => <div { ...props } className="track-vertical" /> }
      renderThumbHorizontal={ props => <div { ...props } className="thumb-horizontal" /> }
      renderThumbVertical={ props => <div { ...props } className="thumb-vertical" /> }
      // autoHide
    />
  );
};