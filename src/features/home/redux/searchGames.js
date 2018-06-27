import axios from 'axios';
import {
  HOME_SEARCH_GAMES_BEGIN,
  HOME_SEARCH_GAMES_SUCCESS,
  HOME_SEARCH_GAMES_FAILURE,
  HOME_SEARCH_GAMES_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function searchGames(args = {}) {
  const roundNumber = args;
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: HOME_SEARCH_GAMES_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get(
        'http://yfipassword.000webhostapp.com/server/YFiPassword/php/getJsonUol1.php',
      );
      doRequest.then(
        res => {
          const result = res.data;
          const jogos = new Array();
          const rodada = result.fases['2700'].jogos.rodada[roundNumber];
          const equipes = Object.keys(result['equipes']);
          const faseJogosId = result.fases['2700'].jogos.id;

          for (let jogo of rodada) {
              let time1 = parseInt(faseJogosId[jogo]['time1']),
              time2 = parseInt(faseJogosId[jogo]['time2']);

            for (let equipe of equipes) {
              if (time1 == parseInt(result['equipes'][equipe].id)) {
                time1 = result['equipes'][equipe];
              }
              if (time2 == parseInt(result['equipes'][equipe].id)) {
                time2 = result['equipes'][equipe];
              }
            }
            faseJogosId[jogo]['time1'] = time1;
            faseJogosId[jogo]['time2'] = time2;
            jogos.push(faseJogosId[jogo]);
          }

          dispatch({
            type: HOME_SEARCH_GAMES_SUCCESS,
            payload: jogos,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: HOME_SEARCH_GAMES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSearchGamesError() {
  return {
    type: HOME_SEARCH_GAMES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SEARCH_GAMES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        searchGamesPending: true,
        searchGamesError: null,
      };

    case HOME_SEARCH_GAMES_SUCCESS:
      console.log(action);
      // The request is success
      return {
        ...state,
        cards: action.payload,
        searchGamesPending: false,
        searchGamesError: null,
      };

    case HOME_SEARCH_GAMES_FAILURE:
      // The request is failed
      return {
        ...state,
        searchGamesPending: false,
        searchGamesError: action.data.error,
      };

    case HOME_SEARCH_GAMES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        searchGamesError: null,
      };

    default:
      return state;
  }
}
