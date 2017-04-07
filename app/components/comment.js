import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';
import {likeComment, unlikeComment} from '../server';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { likeCounter: this.props.likeCounter };
    }

  handleLikeClick(clickEvent) {
      clickEvent.preventDefault();

      if (clickEvent.button === 0) {
          var callbackFunction = (updatedLikeCounter) => {
              this.setState({likeCounter: updatedLikeCounter});
          };

          if (this.didUserLike()) {
              unlikeComment(this.props.feedItemId, this.props.index, 4, callbackFunction);
          } else {
              likeComment(this.props.feedItemId, this.props.index, 4, callbackFunction);
          }
      }
  }

    didUserLike() {
        var likeCounter = this.state.likeCounter;
        var liked = false;
        // Look for a likeCounter entry with userId 4 -- which is the
        // current user.
        for (var i = 0; i < likeCounter.length; i++) {
            if (likeCounter[i]._id === 4) {
                liked = true;
                break;
            }
        }
        return liked;
    }

  render() {
      var likeButtonText = "Like";
      if (this.didUserLike()) {
          likeButtonText = "Unlike";
      }
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>{this.props.author.fullName}</Link> {this.props.children}
          <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>{this.state.likeCounter.length} <span className="glyphicon glyphicon-thumbs-up"></span> {likeButtonText}</a> · <a href="#">Reply</a> ·
            {unixTimeToString(this.props.postDate)}
        </div>
      </div>
    )
  }
}
