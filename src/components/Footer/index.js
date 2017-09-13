import React, { Component } from 'react'

/**
 * Footer
 */
class Footer extends Component {
  render(){
    return(
      <footer className="footer">
        <p>Readable for the Udacity React Nanodegree Program</p>
        <p><a href="mailto:stanislav.krsv@gmail.com">Stanislav Karassyov</a>, September 2017</p>
        <p>
          <a className="footer-link footer-link--github" href="https://github.com/stanislavkrsv">Github</a>
          <a className="footer-link footer-link--ln" href="https://www.linkedin.com/in/stanislav-karassyov-19180568/">LinkedIn</a>
        </p>
      </footer>
    )
  }
}

export default Footer