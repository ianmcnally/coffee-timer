import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Observable } from 'rx'

const countdown = () => Observable.interval(1000).take(60)

class CoffeeTimer extends Component {
  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)

    this.state = { }
  }

  _tickDownTime() {
    this.setState({
      timeRemaining: this.state.timeRemaining - 1
    })
  }

  _endCountdown() {
    this.subscription.dispose()

    this.setState({ started: false })
  }

  handlePress() {
    if (this.subscription)
      this.subscription.dispose()

    this.setState({ started: true, timeRemaining: 60 })

    this.subscription = countdown()
      .subscribe(
        () => this._tickDownTime(),
        () => {},
        () => this._endCountdown()
      )
  }

  get isHalfwayOrDone() {
    return this.state.timeRemaining === 30 || this.state.timeRemaining === 0
  }

  render() {
    const countdownStyles = [
      styles.countdown,
      this.isHalfwayOrDone && styles.alertText
    ]

    const startText = this.state.started ? 'Restart' : 'Start'

    return (
      <View style={styles.container}>
          <View>
            <Text style={countdownStyles}>{this.state.timeRemaining}</Text>
            <TouchableHighlight onPress={this.handlePress}>
              <Text style={styles.start}>{startText}</Text>
            </TouchableHighlight>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  countdown: {
    fontSize: 100
  },
  alertText: {
    color: 'red'
  },
  start: {
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
})

AppRegistry.registerComponent('coffeeTimer', () => CoffeeTimer)
