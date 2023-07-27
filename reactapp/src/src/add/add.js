import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Dialog from "@mui/material/Dialog";
import { Fade } from "@mui/material";
import Button from "@mui/material/Button";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Cookies from "js-cookie";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Add = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  
  const curDate = new Date().toLocaleString();
  const user = Cookies.get("Id"); // Get the user's name from the cookie

  const handleIconClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePost = async (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }

    // Create a FormData object to send the text, file, and user data
    const formData = new FormData();
    formData.append("text", text);
    formData.append("file", file);
    formData.append("user", user); 
    formData.append("comment", 0);
    formData.append("date", curDate);
    formData.append("like", 0);

    try {
      // Send the data to the backend using a POST request
      await axios.post("http://127.0.0.1:2006/Feed/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleCloseDialog();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <center>
        <div>
          <div
            className="i"
            style={{
              borderRadius: "50%",
              width: "300px",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "whitesmoke",
              marginTop: "170px",
            }}
            onClick={handleIconClick}
          >
            <AddOutlinedIcon style={{ fontSize: "72px", opacity: "50%" }} />
          </div>

          <div
            style={{
              marginTop: "30px",
              fontWeight: "bolder",
              fontSize: "25px",
              opacity: "60%",
            }}
          >
            Add Post
          </div>
        </div>
      </center>

      <Dialog
        className="dia"
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Fade}
        transitionDuration={600}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={Cookies.get("Id")}
          subheader={curDate}
        />

        <div
          className="di"
          style={{
            height: "600px",
            width: "600px",
            borderRadius: "10px",
            animation: openDialog ? "fade-in 5s ease-in-out" : "",
            backgroundColor: "whitesmoke",
          }}
        >
          <div style={{ margin: "30px" }}>
            <center>
              <h2>Post What's on your mind!</h2>
            </center>
          </div>
          <div>
            <center>
              <input
                type="text"
                placeholder="Type Something"
                value={text}
                onChange={handleTextChange}
                style={{
                  height: "300px",
                  width: "60%",
                  borderRadius: "10%",
                }}
              />
            </center>
          </div>
          <center>
            <div className="file" style={{ marginTop: "80px" }}>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none", marginRight: "50px" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={handleFileChange}
                />
                <AddPhotoAlternateOutlinedIcon
                  style={{ marginRight: "50px" }}
                />
              </label>

              <Button
                variant="contained"
                style={{ marginLeft: "60px" }}
                onClick={handlePost}
              >
                Add Post
              </Button>
            </div>
          </center>
        </div>
      </Dialog>
    </div>
  );
};

export default Add;
