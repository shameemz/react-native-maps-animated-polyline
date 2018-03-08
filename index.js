import React from "react";
import MapView from "react-native-maps";
import PropTypes from "prop-types";

export default class AnimatedPolyline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      coords: []
    };
  }
  componentDidMount() {
    this._animate(this.props.newCoords);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newCoords.length !== this.props.newCoords.length) {
      this._animate(nextProps.newCoords);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.coords.length !== this.state.coords.length) {
      return true;
    }
    return false;
  }
  _animate(allCoords) {
    const self = this;
    const len = allCoords.length;
    let completed = 0;
    this.state.coords = [];
    const steps = parseInt((allCoords.length / 20), 10);
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const coords = this.state.coords.slice(0);
      for (let i = completed; i < (completed + steps) && i <= len; i += 1) {
        if (allCoords[i]) {
          coords.push(allCoords[i]);
        }
      }
      self.setState({ coords });
      if (completed >= len) {
        clearInterval(self.interval);
      }
      completed += steps;
    }, 10);
  }
  render() {
    return (
      <MapView.Polyline
        coordinates={[...this.state.coords]}
        strokeWidth={4}
        lineCap="round"
      />
    );
  }
}

AnimatedPolyline.propTypes = {
  newCoords: PropTypes.arrayOf(PropTypes.object).isRequired
};
