import resource, { RECEIVE_FOLLOWING, UNFOLLOW_SUCCESS, FOLLOW_SUCCESS, CLEAR_FOLLOW_ERROR,
                  FOLLOW_FAILURE, FETCH_FEED_SUCCESS, UPDATE_ZIP_SUCCESS, UPDATE_ZIP_FAILURE,
                UPDATE_EMAIL_SUCCESS, GET_ZIP_SUCCESS, GET_EMAIL_SUCCESS, SET_KEYWORD_SUCESS,
              GET_DOB_SUCCESS, UPDATE_DOB_SUCESS, LOGIN_TWITTER_SUCCESS, UPLOAD_AVATAR_SUCCESS, url} from '../actions'
var FormData = require('form-data')

const updateHeadlineAction = (headline) => (dispatch) =>{

  return resource('PUT', 'headline', { headline })
    .then(r =>
      dispatch({
        type: 'updateHeadlineToDo',
        payload: r
      })
    )
}

const uploadAvatarAction = (file) => (dispatch) => {

  const fd = new FormData()
  fd.append('text', "message")
  fd.append('image', file)

  return  resource('PUT', 'avatar', fd).then(r =>
  (dispatch({
    type: 'UPLOAD_AVATAR_SUCCESS',
    //id: ownProps.id,
    payload: r
  })))
}

const logoutAction = () => (dispatch) => resource('PUT', 'logout').then(r =>
  (dispatch({
    type: 'logoutToDo',
    payload: "OK"
})))

const seeIfLoggedInAction = () => (dispatch) => resource('GET', 'seeIfLoggedIn').then(r =>
  (dispatch({
    type: 'seeIfLoggedInToDo',
    payload: r
})))

const linkAccountAction = () => (dispatch) => resource('PUT', 'logout').then(r =>
  (dispatch({
    type: 'logoutToDo',
    payload: "OK"
})))

const unlinkAccountAction = () => (dispatch) => resource('PUT', 'logout').then(r =>
  (dispatch({
    type: 'logoutToDo',
    payload: "OK"
})))



const loginAction = (username, password) => (dispatch) => {
  const loginObject = {username: username, password: password}

  console.log("in login action")
  return  resource('POST', 'login', loginObject).then(r =>
  (dispatch({
    type: 'loginToDo',
    //id: ownProps.id,
    payload: r
  })))
}

const loginWithTwitterAction = (username, password) => (dispatch) => {
  const loginWithTwitterObject = {username: username, password: password}

  console.log("in login action")
  window.open(url + "/auth");
  return  resource('POST', 'login', loginWithTwitterObject).then(r =>
  (dispatch({
    type: 'loginToDo',
    //id: ownProps.id,
    payload: r
  })))

  //window.location = url + "/auth"




  /*
  return  resource('GET', 'auth').then(r =>
  (dispatch({
    type: LOGIN_TWITTER_SUCCESS,
    //id: ownProps.id,
    payload: r
  })))
  */
}

const registerAction = (user) => (dispatch) => {
const  registerObj = {
    username: user.username.value,
    email: user.email.value,
    dob: user.dob.value,
    zipcode: user.zip.value,
    password: user.password.value
  }
  console.log("Register Object is " + registerObj)
  return  resource('POST', 'register', registerObj).then(r =>
  (dispatch({
    type: 'registerToDo',
    //id: ownProps.id,
    payload: r
  })))
}

export const bindFetchFeedToDispatch = (dispatch) => () => {
  return resource('GET', 'articles')
    .then(json =>{
      console.log("json is", json)
      dispatch({
        type: FETCH_FEED_SUCCESS,
        payload: json
      })
    })
}

export const getZipAction = (dispatch) => (username) => {
  return resource('GET', `zipcode/${username}`)
    .then(json =>
      dispatch({
        type: GET_ZIP_SUCCESS,
        payload: json
      })
    )
}

export const getEmailAction = (dispatch) => () => {
  return resource('GET', 'email')
    .then(json =>
      dispatch({
        type: GET_EMAIL_SUCCESS,
        payload: json
      })
    )
}

export const getDobAction = (dispatch) => () =>{
  return resource('GET', 'dob').then(r =>
    {
      return (dispatch({
      type: GET_DOB_SUCCESS,
      payload: r
  }))})
}


export const bindFollowToDispatch = (dispatch) => (username) => {

  dispatch({ type: CLEAR_FOLLOW_ERROR })


  return  resource('PUT', `following/${username}`)
    .then(json =>
      dispatch({
        type: FOLLOW_SUCCESS,
        payload: json
      })
    )
    .catch(err =>
      dispatch({
        type: FOLLOW_FAILURE,
        error: true,
        payload: {
          followError: err.message
        }
      })
    )
}

export const updateZipAction = (newZip) => (dispatch) =>{

  console.log("new zip is ", newZip)
  return resource('PUT', 'zipcode', {
      zipcode: newZip.value
  }).then(r =>
    {
      return (dispatch({
      type: UPDATE_ZIP_SUCCESS,
      payload: r
  }))})
}

export const updateEmailAction = (newEmail) => (dispatch) =>{
  console.log("in update email action")
  return resource('PUT', 'email', {
      email: newEmail.value
  }).then(r =>
    {
      return (dispatch({
      type: UPDATE_EMAIL_SUCCESS,
      payload: r
  }))})
}

export const bindUnfollowToDispatch = (dispatch) => (username) => {
  resource('DELETE', `following/${username}`).then(json => {
    console.log('unfollow json is', json)
    dispatch({
      type: UNFOLLOW_SUCCESS,
      payload: json
    })
  })
}



const getMyFollowingAction = (dispatch) => () => {
  resource('GET', 'following').then(json => {
    dispatch({
      type: RECEIVE_FOLLOWING,
      payload: json
    })
  })
}

export {updateHeadlineAction, logoutAction, loginAction, registerAction, getMyFollowingAction, loginWithTwitterAction, uploadAvatarAction,
linkAccountAction, unlinkAccountAction, seeIfLoggedInAction}
