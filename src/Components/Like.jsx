import React, { Component } from "react";

class Like extends Component {
  render() {
    return (
      <i
        onClick={this.props.onLike}
        className={this.getLikeFormat()}
        aria-hidden="true"
      ></i>
    );
  }

  getLikeFormat() {
    let classes = "btn fa fa-heart";
    classes += this.props.like ? "" : "-o";
    return classes;
  }
}

export default Like;
