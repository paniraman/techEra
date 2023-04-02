import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class CourseItemDetails extends Component {
  state = {
    blogData: {},
    isLoading: true,
    noCourse: false,
  }

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const obj = await response.json()

    if (obj.status_code === 404) {
      this.setState({
        noCourse: true,
      })
    } else {
      const updatedData = {
        id: obj.course_details.id,
        name: obj.course_details.name,
        imageUrl: obj.course_details.image_url,
        description: obj.course_details.description,
      }
      console.log(updatedData)

      this.setState({blogData: updatedData, isLoading: false})
    }
  }

  renderBlogData = () => {
    const {blogData, isLoading} = this.state
    const {name, imageUrl, description} = blogData

    return (
      <div className="blog-container">
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
          </div>
        ) : (
          <div className="card-container">
            <div className="content-container">
              <img src={imageUrl} alt={name} className="blog-img" />
              <div className="right-container">
                <h1 className="blog-heading">{name}</h1>
                <p className="blog-para">{description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  render() {
    const {noCourse} = this.state
    return (
      <>
        {noCourse ? (
          <div className="noCourse-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
              alt="failure view"
              className="course-img"
            />
            <h1 className="course-heading">Oops! Something Went Wrong</h1>
            <p className="course-para">
              We cannot seem to find the page you are looking for
            </p>
            <button
              type="button"
              onClick={this.getBlogItemData}
              className="btn-style"
            >
              Retry
            </button>
          </div>
        ) : (
          this.renderBlogData()
        )}
      </>
    )
  }
}

export default CourseItemDetails
