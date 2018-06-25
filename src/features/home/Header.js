import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

export class Header extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <header className="home-header">
        <AppBar position="static">
          <Toolbar>
            <IconButton  color="inherit" aria-label="Menu">
            </IconButton>
            <Typography variant="title" color="inherit" >
              ICP
            </Typography>
            <Button 
              color="inherit"
              onClick={this.props.actions.jogosClick}>Jogos</Button>
            <Button 
              color="inherit"
              onClick={this.props.actions.timesClick}>Times</Button>
            <Button 
              color="inherit"
              onClick={this.props.actions.tabelaClick}>Tabela</Button>
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
