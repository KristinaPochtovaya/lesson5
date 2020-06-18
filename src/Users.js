import React from "react";

const Users = ({ users, activeUser, onChange }) => (
  <ul>
    {users.map((user) => (
      <li
        style={activeUser === user.id ? { backgroundColor: "green" } : null}
        key={user.id}
        onClick={() => onChange(user.id)}
      >
        {user.name}
      </li>
    ))}
  </ul>
);

class UsersPosts extends React.Component {
  state = {
    post: null,
  };

  async componentDidMount() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + this.props.post.id
    );
    const post = await response.json();

    this.setState({
      post,
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.post.id !== this.props.post.id) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?userId=" +
          this.props.post.id
      );
      const post = await response.json();

      this.setState({
        post,
      });
    }
  }

  render() {
    if (this.state.post === null) {
      return "...Loading...";
    }

    return (
      <ol>
        {this.state.post.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ol>
    );
  }
}

class UserApp extends React.Component {
  state = {
    users: null,
    activeUser: null,
  };

  async componentDidMount() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    this.setState({
      users,
      activeUser: users[0].id,
    });
  }

  render() {
    if (this.state.users === null) {
      return "...Loading...";
    }
    return (
      <>
        <Users
          users={this.state.users}
          activeUser={this.state.activeUser}
          onChange={(activeUser) =>
            this.setState({
              activeUser,
            })
          }
        />
        <UsersPosts
          post={this.state.users.find((t) => t.id === this.state.activeUser)}
        />
      </>
    );
  }
}

export default UserApp;
