import PropTypes from 'prop-types';
import React from 'react';
import getOffset from 'dom-helpers/query/offset';
import getScrollTop from 'dom-helpers/query/scrollTop';
import getScrollLeft from 'dom-helpers/query/scrollLeft';

import EventCell from './EventCell';
import { isSelected } from './utils/selection';
import { elementType, dateFormat } from './utils/propTypes';
import moment from 'moment';
import CustomScrollbar from "./utils/CustomScrollbar";

const propTypes = {
  position: PropTypes.object,
  popupOffset: PropTypes.number,
  events: PropTypes.array,
  selected: PropTypes.object,
  eventComponent: elementType,
  eventWrapperComponent: elementType,
  dayHeaderFormat: dateFormat
}
class Popup extends React.Component {

  componentDidMount() {
    let { popupOffset = 5 } = this.props
      , { top, left, width, height } = getOffset(this.refs.root)
      , viewBottom = window.innerHeight + getScrollTop(window)
      , viewRight = window.innerWidth + getScrollLeft(window)
      , bottom = top + height
      , right = left + width

    if (bottom > viewBottom || right > viewRight) {
      let topOffset, leftOffset;

      if (bottom > viewBottom)
        topOffset = bottom - viewBottom + (popupOffset.y || +popupOffset || 0)
      if (right > viewRight)
        leftOffset = right - viewRight + (popupOffset.x || +popupOffset || 0)

      this.setState({ topOffset, leftOffset }) //eslint-disable-line
    }
  }

  render() {
    let { events, selected, eventComponent, eventWrapperComponent, ...props } = this.props;

    let { left, width, top } = this.props.position
      , topOffset = (this.state || {}).topOffset || 0
      , leftOffset = (this.state || {}).leftOffset || 0;

    let style = {
      top: Math.max(0, top - topOffset),
      left: left - leftOffset,
      minWidth: width + (width / 2)
    }
    return (
      <div ref='root' style={style} className='rbc-overlay'>
        <div className='rbc-overlay-header'>
          <div className='scheduler-popup-date'>
            {
              moment(props.slotStart).format("DD")
            }
          </div>
          <div className='scheduler-popup-week-date'>
            {
              moment(props.slotStart).format("dddd")
            }
          </div>
        </div>
        <div className="scroll-wrapper"
          style={{
            height: '200px'
          }}
        >
          <CustomScrollbar>
            <div className="scroll-inner">
              {
                events.map((event, idx) =>
                  <EventCell
                    key={idx}
                    {...props}
                    event={event}
                    eventComponent={eventComponent}
                    eventWrapperComponent={eventWrapperComponent}
                    selected={isSelected(event, selected)}
                  />
                )
              }
            </div>
          </CustomScrollbar>
        </div>
      </div>
    )
  }
}

Popup.propTypes = propTypes;

export default Popup;