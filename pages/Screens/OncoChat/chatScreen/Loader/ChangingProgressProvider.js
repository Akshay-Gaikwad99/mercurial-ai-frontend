import React from "react";

class ChangingProgressProvider extends React.Component {
  static defaultProps = {
    interval: 1000,
    values: [0],
  };

  state = {
    valuesIndex: 0,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        valuesIndex: (prevState.valuesIndex + 1) % this.props.values.length,
      }));
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { valuesIndex } = this.state;
    const { values, children } = this.props;

    if (!values || values.length === 0) {
      return null;
    }

    const currentValue = values[valuesIndex];
    if (typeof children !== 'function') {
      return null; 
    }

    return children(currentValue);
  }
}

export default ChangingProgressProvider;
