import resource, {CREATE_ARTICLE_SUCCESS} from '../actions'

export const bindCreateArticleToDispatch = (dispatch) => (articleText) => {
  resource('POST', 'article', {text:articleText})
    .then(json =>
      dispatch({
        type: CREATE_ARTICLE_SUCCESS,
        payload: json
      })
    )
}
