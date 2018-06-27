import axios from 'axios';
import {
  HOME_SEARCH_TEAMS_BEGIN,
  HOME_SEARCH_TEAMS_SUCCESS,
  HOME_SEARCH_TEAMS_FAILURE,
  HOME_SEARCH_TEAMS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function searchTeams(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_SEARCH_TEAMS_BEGIN,
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
          const result = res.data;
          let equipes = new Array();
          for (let j = 0; j < Object.keys(result["equipes"]).length; j++){
            equipes.push(result["equipes"][Object.keys(result["equipes"])[j]]);
          }
          dispatch({
            type: HOME_SEARCH_TEAMS_SUCCESS,
            payload: equipes,
          });
          resolve(res);
          
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_SEARCH_TEAMS_FAILURE,
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
export function dismissSearchTeamsError() {
  return {
    type: HOME_SEARCH_TEAMS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SEARCH_TEAMS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        searchTeamsPending: true,
        searchTeamsError: null,
      };

    case HOME_SEARCH_TEAMS_SUCCESS:
      // The request is success
      return {
        ...state,
        equipes: action.payload,
        searchTeamsPending: false,
        searchTeamsError: null,
      };

    case HOME_SEARCH_TEAMS_FAILURE:
      // The request is failed
      return {
        ...state,
        searchTeamsPending: false,
        searchTeamsError: action.data.error,
      };

    case HOME_SEARCH_TEAMS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        searchTeamsError: null,
      };

    default:
      return state;
  }
}
