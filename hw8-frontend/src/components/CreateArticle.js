import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindCreateArticleToDispatch} from '../actions/articleActions'

class CreateArticle extends Component {
  render() {
    return (
      <div>
        <p>Write a new article</p>
        <textarea ref={(textarea) => { this.textarea = textarea }}/>
        <button
          type="button"
          onClick={() => this.props.createArticle(this.textarea.value)}
        >Submit</button>
      </div>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    createArticle: bindCreateArticleToDispatch(dispatch)
  })
)(CreateArticle)
