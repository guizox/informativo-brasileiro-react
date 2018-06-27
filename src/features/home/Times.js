import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export class Times extends Component {
  constructor(props) {
    super(props);
    console.log("CHAMANDO");
    this.props.actions.searchTeams();
  }

  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      this.props.home.windowToRender === 'times' ?
        <Grid 
          container 
          spacing={40}
          className='home-times'
          >
          {
            this.props.home.equipes.map((equipe, index) => {
              return (
                <Grid item xs={12} sm={6} lg={4}>
                  <Card className='card'>
                    <CardContent
                      className='card-content'>
                      <img src={equipe.brasao}/>
                      <Typography 
                        gutterBottom 
                        variant="headline" 
                        component="p">
                        {equipe['nome-comum']}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        className='home-jogos-button'
                        onClick={() => this.props.actions.openPosJogo(equipe.uri)}>
                        Mais Informações
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      
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
)(Times);
