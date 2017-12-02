import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { navigate } from './utils/constants';
import {MuiThemeProvider, RaisedButton, FloatingActionButton, DropDownMenu, MenuItem} from 'material-ui'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
  }

  render() {
    let { messages, label } = this.props;

    // edited by onursimsek94 (button to div)
    return (
      <div className='rbc-toolbar'>
        <MuiThemeProvider>
          <div className='rbc-btn-group'>
            <div
              onClick={this.navigate.bind(null, navigate.TODAY)}
            >
              <RaisedButton label={messages.today} />&nbsp;
              {/* {messages.today}&nbsp; */}
            </div>
            <div
              onClick={this.navigate.bind(null, navigate.PREVIOUS)}
            >
              <FloatingActionButton mini ><HardwareKeyboardArrowLeft /></FloatingActionButton>&nbsp;
              {/* {messages.previous}&nbsp; */}
            </div>
            <div
              onClick={this.navigate.bind(null, navigate.NEXT)}
            >
              <FloatingActionButton mini ><HardwareKeyboardArrowRight /></FloatingActionButton>
              {/* {messages.next} */}
            </div>
          </div>
        </MuiThemeProvider>

        <span className='rbc-toolbar-label'>
          { label }
        </span>

        <span className='rbc-btn-group'>
        {
          this.viewNamesGroup(messages)
        }
        </span>
      </div>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action)
  }

  view = (event, index, view) => {
    this.props.onViewChange(view)
  }

  // edited by onursimsek94
  viewNamesGroup(messages) {
    debugger
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return (
        <MuiThemeProvider>
          <DropDownMenu
            value={this.props.view}
            onChange={(event, index, value) => this.props.onViewChange(value)}
          >
            {viewNames.map(name =>
              <MenuItem
                key={name}
                value={name}
                primaryText={messages[name]}
              />
            )}
          </DropDownMenu>
        </MuiThemeProvider>
        // viewNames.map(name =>
        //   <button type='button' key={name}
        //     className={cn({'rbc-active': view === name})}
        //     onClick={this.view.bind(null, name)}
        //   >
        //     {messages[name]}
        //   </button>
        // )
      )
    }
  }
}

export default Toolbar;
