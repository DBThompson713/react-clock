import React, { Component } from "react";
import Clock from "./Clock";

class App extends Component {
  state = { latitude: null, errorMessage: null, value: 1 };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ latitude: position.coords.latitude });
      },
      error => {
        this.setState({ errorMessage: "Something Went wrong" });
      }
    );
    setInterval(() => {
      this.setState((state, props) => {
        return { value: state.value + 1 };
      });
    }, 1000);
  }

  componentDidUpdate() {
    console.log("seconds since started");
  }

  isItWarm() {
    const month = new Date().getMonth() + 1;
    const { latitude } = this.state;

    if (!latitude) {
      return false;
    }
    if (month >= 2 && month <= 8) {
      if (latitude < 0) {
        // southern hemisphere during winter
        return false;
      }
      // northern hemisphere during summer
      return true;
    } else {
      if (latitude < 0) {
        // southern hemisphere during summer
        return true;
      }
      // northern hemisphere during winter
      return false;
    }
  }

  getClockIcon = () => {
    if (this.isItWarm()) {
      return "sun.svg";
    } else {
      return "snowflake.svg";
    }
  };

  render() {
    const { latitude, errorMessage } = this.state;

    this.isItWarm();
    return (
      <div>
        {errorMessage || (
          <Clock
            icon={latitude != null ? this.getClockIcon() : null}
            timezone={"Sydney/Australia"}
            date={new Date()}
          />
        )}
      </div>
    );
  }
}

export default App;
