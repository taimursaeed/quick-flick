import React from "react";
class MovieRow extends React.Component {
  render() {
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={this.props.img}
          alt={this.props.title}
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <p className="card-text">
            <small className="text-muted">Released: {this.props.release}</small>
          </p>
        </div>
      </div>
    );
  }
}
export default MovieRow;
