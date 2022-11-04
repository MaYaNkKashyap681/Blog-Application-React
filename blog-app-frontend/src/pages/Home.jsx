import React, { useState, useEffect} from "react";
// import { posts } from "../dummydata.js";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios'
import DOMPurify from "dompurify";

function Home() {
  const [posts, setPosts] = useState([])

  const location = useLocation()

  // console.log(`http://localhost:4000/posts${location.search}`)

  const q = location.search === '' ? `http://localhost:4000/posts` : `http://localhost:4000/posts${location.search}`

  useEffect(() => {
   const fetchPosts = async () => {
    const res = await axios.get(q)
    if(res) {
      // console.log(res.data)
      setPosts(res.data)
    } 
   }
   fetchPosts();
  }, [location])

  return (
    <div className="blogs-container section__padding">
      {posts.map((post) => (
        <div key={post.b_id} className="post_container">
          <div className="post-image">
            <img src={post.blogimage} />
            <div className="shadow-detail"></div>
          </div>

          <div className="post-body">
            <div className="post-content">
              <h1>{post.title}</h1>
              <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description)}}></p>
            </div>
            <div className="readbutton">
              <Link to={`/blog/${post.b_id}`}>
                <button className="btn">Read More</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
