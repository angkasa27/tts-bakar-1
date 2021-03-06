import React, { Component } from "react";
import Masonry from "react-masonry-css";
import PageBase from "../../components/layouts/PageBase";
import Filter from "../../components/fragments/Filter";
import Sort from "../../components/fragments/Sort";
import Post from "../../components/fragments//Post";
import { TEXT } from "../../configs";
import { FILTER_LIST } from "../../constants";
import postList from "../../constants/Dummy/postList";

import classes from "./styles.module.css";
import { Redirect } from "react-router";

export class component extends Component {
  constructor() {
    super();

    this.state = {
      fireRedirect: false,
      term: "",
    };
  }

  componentDidMount() {
    var loggedIn = localStorage.getItem("Login");
    if (loggedIn === "true") {
      document.title = "BaKar | Sealamat Datang!";
    } else {
      document.title = "BaKar";
    }
  }

  _searchOnChange = (e) => {
    this.setState({ term: e.target.value });
  };

  _searcOnSubmit = (e) => {
    e.preventDefault();
    this.setState({ fireRedirect: true });
  };

  render() {
    const { term, fireRedirect } = this.state;

    return (
      <PageBase>
        <div className={classes.Definition}>
          <section className={classes.Sec1}>
            <div>
              <h1>
                Bagikan <span>Karyamu!</span>
              </h1>
              <p>{TEXT.TOOLTIP_DEFINITON()}</p>
              <button className={classes.Button}>Cari tau</button>
            </div>
            <div>
              <p>Image Pending</p>
            </div>
          </section>
          <section className={classes.Sec2}>
            <div>
              <h2>Cari Inspirasi Karyamu</h2>
              <form onSubmit={this._searcOnSubmit}>
                <input
                  onChange={this._searchOnChange}
                  value={term}
                  placeholder="Design Web Perpustakaan!"
                  required
                />
                <button type="submit" style={{ display: "none" }}>
                  Cari
                </button>
              </form>
              <p>{TEXT.TOOLTIP_BENEFIT()}</p>
              {fireRedirect && (
                <Redirect
                  to={{
                    pathname: "/search",
                    state: {
                      term: term,
                    },
                  }}
                />
              )}
            </div>
          </section>
        </div>
        <div className={classes.PostSec}>
          <div className={classes.nav2}>
            <Filter list={FILTER_LIST} />
            <Sort />
          </div>
          <Masonry
            breakpointCols={3}
            className={classes.myMasonryGrid}
            columnClassName={classes.myMasonryGridColumn}
          >
            {postList.map((data) => (
              <Post key={data.id_post} data={data} />
            ))}
          </Masonry>
        </div>
      </PageBase>
    );
  }
}

export default component;
