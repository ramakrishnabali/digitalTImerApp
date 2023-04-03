// Write your code here
import {Component} from 'react'

import './index.css'

let buttonDisable = true

class DigitalTimer extends Component {
  state = {runningStatus: false, minutes: 25, seconds: 0}

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  startButton = () => {
    const {runningStatus} = this.state

    buttonDisable = false

    this.setState(prevState => ({
      runningStatus: !prevState.runningStatus,
    }))

    if (runningStatus === false) {
      this.timerID = setInterval(this.onChangeTime, 1000)
    } else {
      clearInterval(this.timerID)
    }
  }

  onChangeTime = () => {
    const {minutes, seconds} = this.state

    if (minutes === 0 && seconds === 0) {
      clearInterval(this.timerID)
      this.setState({runningStatus: false})
    } else if (seconds === 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
      }))
    } else {
      this.setState(prevState => ({
        minutes: prevState.minutes,
        seconds: prevState.seconds - 1,
      }))
    }
  }

  onClickReset = () => {
    clearInterval(this.timerID)

    buttonDisable = true

    this.setState({runningStatus: false, minutes: 25, seconds: 0})
  }

  decreaseMinutes = () => {
    const {minutes, runningStatus} = this.state
    if (buttonDisable) {
      if (runningStatus === false) {
        if (minutes > 0) {
          this.setState(prevState => ({
            minutes: prevState.minutes - 1,
          }))
        }
      }
    }
  }

  increaseMinutes = () => {
    const {runningStatus, minutes} = this.state
    if (buttonDisable) {
      if (runningStatus === false) {
        if (minutes >= 0) {
          this.setState(prevState => ({
            minutes: prevState.minutes + 1,
          }))
        }
      }
    }
  }

  render() {
    const {runningStatus, minutes, seconds} = this.state

    const updatedMinutes = minutes > 9 ? minutes : `0${minutes}`

    const updatedSeconds = seconds > 9 ? seconds : `0${seconds}`

    const status = runningStatus ? 'Running' : 'Paused'

    const statusIcon = runningStatus
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startButtonName = runningStatus ? 'Paused' : 'Start'

    const alt = runningStatus ? 'pause icon' : 'play icon'

    // console.log(updatedMinutes)
    console.log(alt)

    return (
      <div className="appContainer">
        <h1 className="heading">Digital Timer</h1>

        <div className="timeContainer">
          <div className="leftContainer">
            <div className="statusContainer">
              <h1 className="time">{`${updatedMinutes}:${updatedSeconds}`}</h1>
              <p className="status">{status}</p>
            </div>
          </div>

          <div className="rightContainer">
            <div className="startAndResetContainer">
              <button
                onClick={this.startButton}
                className="button"
                type="button"
              >
                <div className="buttonContainer">
                  <img src={statusIcon} alt={alt} className="playIcon" />
                  <p className="buttonName">{startButtonName}</p>
                </div>
              </button>

              <button
                onClick={this.onClickReset}
                className="button"
                type="button"
              >
                <div className="buttonContainer">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="playIcon"
                  />
                  <p className="buttonName">Reset</p>
                </div>
              </button>
            </div>

            <p className="description">Set Timer limit</p>
            <div className="decreaseAndPlusContainer">
              <button
                onClick={this.decreaseMinutes}
                type="button"
                className="decreaseButton"
              >
                -
              </button>
              <div className="limitContainer">
                <p>{updatedMinutes}</p>
              </div>
              <button
                onClick={this.increaseMinutes}
                type="button"
                className="decreaseButton"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
