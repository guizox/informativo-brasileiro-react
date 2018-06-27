import axios from 'axios';
import {
  HOME_BUILD_TABLE_BEGIN,
  HOME_BUILD_TABLE_SUCCESS,
  HOME_BUILD_TABLE_FAILURE,
  HOME_BUILD_TABLE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function buildTable(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_BUILD_TABLE_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get('http://yfipassword.000webhostapp.com/server/YFiPassword/php/getJsonUol1.php');
      doRequest.then(
        (res) => {
          let times = new Array();
          const grupos = res.data.fases["2700"]["classificacao"]["grupo"]['Único'];
          const classficacao = [];

          for (const grupo of grupos){
            classficacao.push({"time" : grupo});
          }
          let equipes = Object.keys(res.data.fases["2700"]["classificacao"]["equipe"]);
          for (let i = 0; i < classficacao.length; i++){
            for (let j = 0; j < equipes.length; j++){
              if (classficacao[i]["time"].trim() === equipes[j].trim()){
                for (let k = 0; k < Object.keys(res.data.equipes).length; k++){
                  if (res.data.equipes[Object.keys(res.data.equipes)[k]].id === res.data.fases["2700"]["classificacao"]["equipe"][equipes[j]].id){
                    times.push({
                      "time" : classficacao[i]["time"],
                      "info" : res.data.fases["2700"]["classificacao"]["equipe"][equipes[j]],
                      "brasao" : res.data.equipes[Object.keys(res.data.equipes)[k]].brasao,
                      "nome" : res.data.equipes[Object.keys(res.data.equipes)[k]]["nome-comum"]
                    });
                  }
                }
              }
            }
          }


          dispatch({
            type: HOME_BUILD_TABLE_SUCCESS,
            payload: times,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_BUILD_TABLE_FAILURE,
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
export function dismissBuildTableError() {
  return {
    type: HOME_BUILD_TABLE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_BUILD_TABLE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        buildTablePending: true,
        buildTableError: null,
      };

    case HOME_BUILD_TABLE_SUCCESS:
      // The request is success
      return {
        ...state,
        times: action.payload,
        buildTablePending: false,
        buildTableError: null,
      };

    case HOME_BUILD_TABLE_FAILURE:
      // The request is failed
      return {
        ...state,
        buildTablePending: false,
        buildTableError: action.data.error,
      };

    case HOME_BUILD_TABLE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        buildTableError: null,
      };

    default:
      return state;
  }
}
