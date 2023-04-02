import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

// Replace your code here
class Home extends Component {
  state = {
    appList: [],
    isLoading: false,
    noApps: false,
  }

  componentDidMount() {
    this.getTechEra()
  }

  getTechEra = async () => {
    this.setState({
      isLoading: true,
    })
    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(coursesApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(obj => ({
        id: obj.id,
        name: obj.name,
        logoUrl: obj.logo_url,
      }))
      this.setState({
        appList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({noApps: true})
    }
  }

  renderApp = () => {
    const {appList, isLoading} = this.state

    return (
      <div className="main-container">
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
          </div>
        ) : (
          <div className="app-container">
            <h1 className="heading">Courses</h1>
            <ul className="unOrder-container">
              {appList.map(obj => (
                <li key={obj.id} className="list-app-container">
                  <Link to={`/courses/${obj.id}`} className="item-container">
                    <img
                      src={obj.logoUrl}
                      alt={obj.name}
                      className="img-style"
                    />
                    <p className="para">{obj.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  render() {
    const {noApps} = this.state
    return (
      <>
        {noApps ? (
          <div className="noCourse-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
              alt="failure view"
              className="course-img"
            />
            <h1 className="course-heading">Oops! Something Went Wrong</h1>
            <p className="course-para">
              We cannot seem to find the page you are looking for.
            </p>
            <button
              type="button"
              onClick={this.renderApp}
              className="btn-style"
            >
              Retry
            </button>
          </div>
        ) : (
          this.renderApp()
        )}
      </>
    )
  }
}

export default Home
