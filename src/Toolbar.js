import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { navigate } from './utils/constants';
import {MuiThemeProvider, RaisedButton, FloatingActionButton, DropDownMenu, MenuItem} from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onLeftMenu: PropTypes.func,
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
            <div onClick={this.props.onLeftMenu} style={{display: this.props.onLeftMenu ? 'inherit' : 'none'}}>
              <FloatingActionButton
                mini
                style={{boxShadow: 'none'}}
                backgroundColor='none'
                iconStyle={{color: 'rgb(117, 117, 117)', fill: 'rgb(117, 117, 117)'}}>
                <NavigationMenu />
              </FloatingActionButton>&nbsp;
            </div>
            <div onClick={this.navigate.bind(null, navigate.TODAY)}>
              <RaisedButton
                label={messages.today}
                style={{boxShadow: 'none', borderRadius: '5px'}}
                buttonStyle={{backgroundColor: 'rgb(245, 245, 245)', width: '90%', borderRadius: '5px'}}
                labelStyle={{color: 'rgb(74, 74, 74)'}} />&nbsp;
              {/* {messages.today}&nbsp; */}
            </div>
            <div onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
              <FloatingActionButton
                mini 
                style={{boxShadow: 'none'}}
                backgroundColor='none'
                iconStyle={{color: 'rgb(117, 117, 117)', fill: 'rgb(117, 117, 117)'}}>
                <HardwareKeyboardArrowLeft />
              </FloatingActionButton>&nbsp;
              {/* {messages.previous}&nbsp; */}
            </div>
            <div onClick={this.navigate.bind(null, navigate.NEXT)}>
              <FloatingActionButton
                mini 
                style={{boxShadow: 'none'}}
                backgroundColor='none'
                iconStyle={{color: 'rgb(117, 117, 117)', fill: 'rgb(117, 117, 117)'}}>
                <HardwareKeyboardArrowRight />
              </FloatingActionButton>
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
