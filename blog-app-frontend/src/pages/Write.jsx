import React, { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import authContext from '../context/auth/authContext.jsx'

function Write() {
  const {currentUser} = useContext(authContext)
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [uploadingFile, setUploadingFile] = useState("");
  const [imageUrl, setImageUrl] = useState("https://res.cloudinary.com/dib5nqqso/image/upload/v1667221718/fkgmvzg6nbejhnkguwdu.jpg");
  const [isUploaded, setIsUploaded] = useState(false)

  // useEffect(() => {
  //   console.log(uploadingFile);
  // }, [uploadingFile]);

  const uploadImage = async () => {
    const formData = new FormData();

    formData.append("file", uploadingFile);
    formData.append("upload_preset", "fsqc4zjj");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dib5nqqso/image/upload",
      formData
    );

    if (res) {
      console.log(res);
      setImageUrl(res.data.url)
      setIsUploaded(true)

      setInterval(() => {
        setIsUploaded(false)
      }, 5000)
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (title.length > 0 && value.length > 0 && category != '') {
      const postingDate =  new Date().toISOString().slice(0, 19).replace('T', ' ');

      const blogData = {
        description: value,
        title: title,
        category: category,
        date: postingDate,
        blogimage: imageUrl,
        userid: currentUser.id
      }

      console.log(blogData)
      const res = await axios.post("http://localhost:4000/posts/", blogData);
      if(res) {
        console.log(res.data)
      }      
    }
  };

  return (
    <div className="write-pad">

{
  imageUrl != '' && isUploaded === true && <div className="uploadAlert">Image has been Successfully Uploaded</div>
}
   
      <div className="content">
        <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setUploadingFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button className="btn1" onClick={uploadImage}>
              Upload Image
            </button>
            <button className="btn2">Update</button>
          </div>

          <button
            className="btn"
            style={{
              padding: "0.2rem",
              borderRadius: "0",
              backgroundColor: "transparent",
              border: "1px solid teal",
              marginTop: "1rem",
            }}
            onClick={handleSubmitPost}
          >
            Post
          </button>
        </div>

        <div className="item">
          <h1>Category</h1>
          <div>
            <div className="Cat">
              <input
                type="radio"
                value="art"
                name="Cat"
                id="art"
                onClick={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className="Cat">
              <input
                type="radio"
                value="science"
                name="Cat"
                id="science"
                onClick={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="art">Science</label>
            </div>
            <div className="Cat">
              <input
                type="radio"
                value="technology"
                name="Cat"
                id="technology"
                onClick={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="art">Technology</label>
            </div>
            <div className="Cat">
              <input
                type="radio"
                value="cinema"
                name="Cat"
                id="cinema"
                onClick={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="art">Cinema</label>
            </div>
            <div className="Cat">
              <input
                type="radio"
                value="design"
                name="Cat"
                id="design"
                onClick={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="art">Design</label>
            </div>
            <div className="Cat">
              <input
                type="radio"
                value="food"
                name="Cat"
                id="food"
                onClick={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="art">Food</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
