import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    infoList: [],
    site: '',
    username: '',
    password: '',
    showPassword: false,
    searchInput: '',
  }

  onSite = event => {
    this.setState({site: event.target.value})
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitInfo = event => {
    event.preventDefault()
    const {site, username, password} = this.state
    const initial = site.slice(0, 1).toUpperCase()
    const newInfo = {
      id: v4(),
      site,
      username,
      password,
      initial,
    }
    this.setState(prevState => ({
      infoList: [...prevState.infoList, newInfo],
      site: '',
      username: '',
      password: '',
      searchInput: '',
    }))
  }

  boxCheck = event => {
    if (event.target.checked) {
      this.setState({showPassword: true})
    } else {
      this.setState({showPassword: false})
    }
  }

  deleteItem = id => {
    const {infoList} = this.state
    const newList = infoList.filter(eachValue => eachValue.id !== id)
    this.setState({infoList: newList})
  }

  render() {
    const {infoList, showPassword, searchInput} = this.state
    const {site, password, username} = infoList

    const newList = infoList.filter(eachValue =>
      eachValue.site.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const leng = newList.length
    const noElements = leng === 0
    console.log(infoList)
    return (
      <div className="initial-container ">
        <div className="container-sized">
          <div className="container-start-elements">
            <img
              className="logo"
              alt="app logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            />
            <div className="card-a">
              <div className="card-a-container">
                <form className="card-a-A" onSubmit={this.onSubmitInfo}>
                  <h1>Add New Password</h1>
                  <div className="card-a-A-input">
                    <img
                      alt="website"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      className="input-logo"
                    />
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter Website"
                      value={site}
                      id="site"
                      onChange={this.onSite}
                    />
                  </div>
                  <div className="card-a-A-input">
                    <img
                      alt="username"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      className="input-logo"
                    />
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter Username"
                      value={username}
                      autoComplete="username"
                      onChange={this.onUsername}
                      id="username"
                    />
                  </div>
                  <div className="card-a-A-input">
                    <img
                      alt="password"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      className="input-logo"
                    />
                    <input
                      type="password"
                      className="input"
                      placeholder="Enter Password"
                      value={password}
                      onChange={this.onPassword}
                      id="password"
                    />
                  </div>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </form>
                <img
                  className="card-a-img"
                  alt="password manager"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                />
              </div>
            </div>

            <div className="card-b">
              <div className="card-b-heading">
                <div className="card-b-container">
                  <div>
                    <h1>Your Passwords</h1>
                    <p>{leng}</p>
                  </div>
                  <div className="card-a-A-input">
                    <img
                      alt="search"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                      className="input-logo"
                    />
                    <input
                      type="search"
                      className="input"
                      placeholder="Search"
                      id="search"
                      value={searchInput}
                      onChange={this.onSearch}
                    />
                  </div>
                </div>
                <hr />
              </div>
              <hr />
              <div className="search-container">
                <input type="checkBox" id="check" onChange={this.boxCheck} />
                <label htmlFor="check">Show Passwords</label>
              </div>
              {noElements && (
                <div className="no-password-container">
                  <img
                    className="no-password-img"
                    alt="no passwords"
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  />
                  <p>No Passwords</p>
                </div>
              )}
              {!noElements && (
                <ul className="unordered-list">
                  {newList.map(eachValue => (
                    <li
                      className="a-info-box"
                      key={eachValue.id}
                      id={eachValue.id}
                    >
                      <div className="b-info-box">
                        <div className="left-info-box">
                          <p>{eachValue.initial}</p>
                          <div>
                            <p>{eachValue.site}</p>
                            <p>{eachValue.username}</p>

                            {showPassword && <p>{eachValue.password}</p>}
                            {!showPassword && (
                              <img
                                className="stars"
                                alt="stars"
                                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                              />
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={this.deleteItem(eachValue.id)}
                        >
                          <img
                            className="delete"
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                            alt="delete"
                          />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App
