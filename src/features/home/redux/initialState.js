const initialState = {
  windowToRender: 'jogos',
  cards : [ 
    {time1 : 'corinthias', time2: 'sao paulo', placar1: 1, placar2: 2},
    {time1 : 'palmeiras', time2: 'santos', placar1: 1, placar2: 3}
  ],
  jogosClickPending: false,
  jogosClickError: null,
  timesClickPending: false,
  timesClickError: null,
  tabelaClickPending: false,
  tabelaClickError: null,
  searchGamesPending: false,
  searchGamesError: null
};

export default initialState;
