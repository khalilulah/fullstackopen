import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import Form from "./components/Form";
import blogService from "./services/blogs";
import DeleteUserNotification from "./components/DeleteUserNotification";
import CreateBlogForm from "./components/CreateBlogForm";
import AddUserNotification from "./components/AddUserNotification";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [addMessage, setAddMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const theError = () => {
    setAddMessage(true);
    setTimeout(() => {
      setAddMessage(false);
    }, 2000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log("logging in with", username, password);
    try {
      const user = await blogService.login({ username, password });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage(`${error.message}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleBlogCreation = async (event) => {
    event.preventDefault();

    try {
      await blogService.create({ author, title, url });
      theError();
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (error) {
      setErrorMessage(`${error.message}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handletitleChange = (e) => setTitle(e.target.value);
  const handleauthorChange = (e) => setAuthor(e.target.value);
  const handleurlChange = (e) => setUrl(e.target.value);

  return (
    <div>
      <h2>blogs</h2>

      <DeleteUserNotification message={errorMessage} />
      {addMessage ? <AddUserNotification newName={title} /> : null}

      {!user && (
        <Form
          login={handleLogin}
          username={username}
          password={password}
          passwordOnChange={handlePasswordChange}
          usernameOnChange={handleUsernameChange}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button
            onClick={() => window.localStorage.removeItem("loggedNoteappUser")}
          >
            {" "}
            logout
          </button>
        </div>
      )}

      <CreateBlogForm
        handleBlogCreation={handleBlogCreation}
        titleOnChange={handletitleChange}
        authorOnChange={handleauthorChange}
        urlOnChange={handleurlChange}
        author={author}
        url={url}
        title={title}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
