import React, { Component } from "react";
import { Link } from "react-router-dom";

import classes from "./styles.module.css";

export class component extends Component {
  _renderAfterLogin = () => {
    return (
      <nav className={classes.Nav}>
        <div className={classes.logo}>
          <div className={classes.imgBox}>
            <img src={require("../../../assets/LOGO.svg")} alt="Bakar" />
          </div>
          <span>bakar (Logged In)</span>
        </div>
        <ul>
          <li>
            <Link to="/" className={classes.Link}>
              Upload
            </Link>
          </li>
          <li>
            <a onClick={this.props.logout} className={classes.Link}>
              Keluar
            </a>
          </li>
          <li>
            <div className={classes.avatarBox}>
              <img src="" alt="avatar" />
            </div>
          </li>
        </ul>
      </nav>
    );
  };

  _renderBeforeLogin = () => {
    return (
      <nav className={classes.Nav}>
        <div className={classes.logo}>
          <div className={classes.imgBox}>
            <img src={require("../../../assets/LOGO.svg")} alt="Bakar" />
          </div>
          <span>bakar</span>
        </div>
        <ul>
          <li>
            <Link to="/login" className={classes.Link}>
              Masuk
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={[classes.Link, classes.signUp].join(" ")}
            >
              Daftar
            </Link>
          </li>
        </ul>
      </nav>
    );
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.login
          ? this._renderAfterLogin()
          : this._renderBeforeLogin()}
      </div>
    );
  }
}

export default component;