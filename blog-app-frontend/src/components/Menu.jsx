import React from "react";

function Menu({ postsData }) {
  return (
    <div className="menu">
      <h1 className="menupost heading">Other posts you may like</h1>
      <div className="menuposts">
        {postsData.map((post) => (
          <div key = {post.id} className="menupost">
            <img src={post.img} />
            <h2>{post.title}</h2>
            <button className="btn">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
