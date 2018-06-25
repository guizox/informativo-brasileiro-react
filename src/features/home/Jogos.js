import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export class Jogos extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      this.props.home.windowToRender === 'jogos' ?
      <div className="home-jogos">
        <TextField
          id="number"
          value=''
          onChange=''
          type="number"
          className='home-jogos-input'
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <Button 
          variant="outlined" 
          color="primary" 
          className='home-jogos-button'
          onClick={this.props.actions.searchGames}>
          Procurar jogos
        </Button>
        <Grid container spacing={40}>
          {
            this.props.home.cards.map(function(card, i) {
              return (
                <Grid item xs={6} sm={3}>
                  <Card className='card' key={i}>
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                        {`${card.time1} x ${card.time2}`}
                      </Typography>
                      <Typography component="p">
                        Descrição
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        className='home-jogos-button'>
                        Pós jogo
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      </div>
      : null
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
)(Jogos);

