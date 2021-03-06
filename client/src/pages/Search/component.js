import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Masonry from "react-masonry-css";
import PageBase from "../../components/layouts/PageBase";
import Filter from "../../components/fragments/Filter";
import Sort from "../../components/fragments/Sort";
import Post from "../../components/fragments//Post";
import { FILTER_LIST } from "../../constants";
import postList from "../../constants/Dummy/postList";
import userList from "../../constants/Dummy/userList";

import classes from "./styles.module.css";

export class component extends Component {
  constructor() {
    super();

    this.state = {
      fireRedirect: true,
      term: "",
    };
  }

  componentDidMount() {
    document.title = `BaKar | Cari`;
    if (this.props.location.state) {
      this.setState({ term: this.props.location.state.term });
    }
  }

  _searchOnChange = (e) => {
    this.setState({ term: e.target.value });
  };

  render() {
    const { fireRedirect, term } = this.state;

    const users = userList
      // eslint-disable-next-line
      .filter((user) => {
        if (user.username.toLowerCase().includes(term.toLowerCase())) {
          return user;
        }
      })
      .map((user) => {
        // const maxChar = 12;
        // if (user.username.length > maxChar) {
        //   user.username = user.username.substring(0, maxChar) + "...";
        // }
        return (
          <div key={user.username} className={classes.user}>
            <div className={classes.avatarBox}>
              <img src={user.avatar} alt={`Avatar ${user.username}`} />
            </div>
            <p>{user.username}</p>
          </div>
        );
      });

    const posts = postList
      // eslint-disable-next-line
      .filter((post) => {
        if (post.title.toLowerCase().includes(term.toLowerCase())) {
          return post;
        }
      })
      .map((post) => {
        return <Post key={post.id_post} data={post} />;
      });

    return (
      <PageBase>
        <div className={classes.ResultsSec}>
          <div>
            <h1>Menampilkan Hasil dari "{term}"</h1>
            <form>
              <input
                onChange={this._searchOnChange}
                value={term}
                placeholder="Cari karya atau anggota"
                required
              />
              <button type="submit" style={{ display: "none" }}>
                Cari
              </button>
            </form>
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
        </div>
        <div className={classes.UsersSec}>
          <div>
            {users.length > 0 ? (
              users
            ) : (
              <p className={classes.notFound}>User tidak ditemukan</p>
            )}
          </div>
        </div>
        <div className={classes.PostSec}>
          <div className={classes.nav2}>
            <Filter list={FILTER_LIST} />
            <Sort />
          </div>
          {posts.length > 0 ? (
            <Masonry
              breakpointCols={3}
              className={classes.myMasonryGrid}
              columnClassName={classes.myMasonryGridColumn}
            >
              {posts}
            </Masonry>
          ) : (
            <p className={classes.notFound}>Post tidak ditemukan</p>
          )}
        </div>
      </PageBase>
    );
  }
}

export default component;
