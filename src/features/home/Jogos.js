import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export class Jogos extends Component {

  constructor(props) {
    super(props);
    this.props.actions.searchGames(this.props.home.roundNumber)
  }

  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  openNewTab(url) {
    window.open(url);
  }

  render() {
    return (
      this.props.home.windowToRender === 'jogos' ?
      <div className="home-jogos">
        <TextField
          id="number"
          value={this.props.home.roundNumber}
          onChange={this.props.actions.handleRoundNumberChange}
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
          onClick={() => this.props.actions.searchGames(this.props.home.roundNumber)}>
          Procurar jogos
        </Button>
        <Grid container spacing={40}>
          {
            this.props.home.cards.map(function(card, i) {
              return (
                <Grid item xs={12} sm={6} lg={4}>
                  <Card className='card' key={i}>
                    <CardContent
                      className='card-content'>
                      <Typography 
                        gutterBottom 
                        variant="headline" 
                        component="p">
                        <img src={card.time1.brasao} />
                          {`${card.time1['nome-comum']} x ${card.time2['nome-comum']}`}
                        <img src={card.time2.brasao} />
                        
                      </Typography>
                      <Typography 
                        gutterBottom 
                        variant="headline" 
                        component="h2">
                        <span>
                          {`Data : ${card.data}`}
                        </span>
                      </Typography>
                      <Typography 
                        gutterBottom 
                        variant="headline" 
                        component="h2">
                        <span>
                          {`Horario : ${card.horario}`}
                        </span>
                      </Typography>
                      {
                        card.placar1 !== null ?
                        <Typography 
                          gutterBottom 
                          variant="headline" 
                          component="h2">
                          {`${card.placar1} x ${card.placar2}`}
                        </Typography> 
                        :
                        <Typography
                          gutterBottom 
                          variant="headline" 
                          component="h2">
                          Placar Indefinido
                        </Typography>
                      }
                      
                       
                    </CardContent>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      className='home-jogos-button'
                      onClick={() => this.props.actions.openPosJogo(card['url-posjogo'])}>
                      Pós jogo
                    </Button>
                  </Card>
                </Grid>
              ) 
            }, this)
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

