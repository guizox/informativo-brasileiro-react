import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Tabela extends Component {
  constructor(props){
    super(props); 
    this.props.actions.buildTable();
  }
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

 
  render() {
    return (
      this.props.home.windowToRender === 'tabela' ?
      <div className="home-tabela">
        <h2>Tabela do Brasileirão</h2>
        <table 
          class="table">
          <tr>
            <td><h3>Time</h3></td>
            <td><h3>Pontuacao</h3></td>
            <td><h3>Vitorias</h3></td>
            <td><h3>Empates</h3></td>
            <td><h3>Derrotas</h3></td>
            <td><h3>Saldo Gols</h3></td>
            <td><h3>Jogos</h3></td>
          </tr>
          
          {
            this.props.home.times.map((time, index) => {
              return (
                <tr>
                  <td><img src={time.brasao}/><h4>{time.nome}</h4></td>
                  <td><h4>{time.info.pg.total}</h4></td>
                  <td><h4>{time.info.v.total}</h4></td>
                  <td><h4>{time.info.e.total}</h4></td>
                  <td><h4>{time.info.d.total}</h4></td>
                  <td><h4>{time.info.sg.total}</h4></td>
                  <td><h4>{time.info.j.total}</h4></td>
                </tr>
              )
            })
          }
        </table>
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
)(Tabela);
