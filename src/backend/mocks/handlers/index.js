export const handlers = typeof Response === 'undefined'
  ? []
  : [
    ...require('./auth').authHandlers,
    ...require('./wiki').wikiHandlers,
  ]
