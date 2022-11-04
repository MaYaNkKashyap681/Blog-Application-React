import React, { useState, useEffect, useContext } from "react";
import Menu from "../components/Menu";
import { posts } from "../dummydata.js";
import User from "../assets/User.jpg";
import Remove from "../assets/Remove.png";
import Edit from "../assets/Edit.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/auth/authContext.jsx";
import DOMPurify from "dompurify";

function Single() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [singlePost, setSinglePost] = useState("");

  const blog_id = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchSinglePost = async () => {
      const res = await axios.get(`http://localhost:4000/posts/${blog_id}`);

      if (res) {
        console.log(res);
        setSinglePost(res.data[0]);
      }
    };
    fetchSinglePost();
  }, [blog_id]);

  const dates = new Date(singlePost.date);
  const day = dates.getDay();
  const _date = dates.getDate();
  const _year = dates.getFullYear();
  const postDate = `${_date}/${day}/${_year} `;

  const handleDelete = async () => {
    console.log("Delete Function Called");
    const res = await axios.delete(`http://localhost:4000/posts/${blog_id}`);
    if (res) {
      navigate("/");
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="post">
      <div className="singlePost">
        <div className="singlePostImage">
          <img src={singlePost.blogimage} />
        </div>
        <div className="userdetails">
          <img src={singlePost.profilepic} className="userImage" />
          <div className="userContent">
            <span>{singlePost.username}</span>
            <p>Posted on {postDate}</p>
          </div>

          {currentUser != null && currentUser.id === singlePost.userid && (
            <div className="btn-utils">
              <Link to={`/write?${blog_id}`} state = {singlePost}>
                <button className="btn utilbtn edit">
                  <img src={Edit} />
                </button>
              </Link>
              <button className="btn utilbtn remove" onClick={handleDelete}>
                <img src={Remove} />
              </button>
            </div>
          )}
        </div>
        <div className="postContent">
          <h1>{singlePost.title}.</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(singlePost.description),
            }}
          >
            {/* {singlePost.description} */}
          </p>
        </div>
      </div>
      <Menu postsData={posts} />
    </div>
  );
}

export default Single;
