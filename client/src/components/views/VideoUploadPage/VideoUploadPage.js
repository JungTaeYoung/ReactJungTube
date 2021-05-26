import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon, Select } from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";
import {useSelector} from 'react-redux'

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOptions = [
  { value: 0, label: "list1" },
  { value: 1, label: "list2" },
  { value: 2, label: "list3" },
  { value: 3, label: "list4" },
];

function VideoUploadPage(props) {
    const user = useSelector(state => state.user)
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("list1");

  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const onVideoTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };
  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };
  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };
  const onDrop = (files) => {
    let formData = new FormData();
    const config = { "content-type": "multipart/form-data" };
    console.log(files[0])
    formData.append("file", files[0]);
    Axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);

        let variable = {
          url: response.data.url,
          fileName: response.data.fileName,
        };
        setFilePath(response.data.url);
        Axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration);
            setThumbnailPath(response.data.url);
          } else {
            alert("thumbnail create error");
          }
        });
      } else {
        console.log(response.data);
        alert("video uplaod error");
      }
    });
  };

  const onSumit = (e) => {
      e.preventDefault();

    let variables = {
        writer: user.userData._id,
        title: VideoTitle,
        description: Description,
        privacy: Private,
        filepath: FilePath,
        category: Category,
        duration: Duration,
        thumbnail: ThumbnailPath,

    }

      Axios.post('/api/video/videoUpload', variables)
        .then(response=>{
          console.log(333)
          console.log(variables)
            if(response.data.success) {
                message.success('성공적으로 업로드를 했습니다.')
                setTimeout(() => {
                    props.history.push('/')
                }, 3000);
                console.log(response.data)
            } else {
                alert('비디오 업로드 실패')
            }
        })
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Page</Title>
      </div>
      <Form onSubmit={onSumit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* 드롭 영역 */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  display: "flex",
                  border: "1px solid lightgray",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>
          {/* 썸네일 영역 */}
          {ThumbnailPath && (
            <div>
              <img
                src={`http://localhost:5000/${ThumbnailPath}`}
                alt="thumbnail"
              />
            </div>
          )}
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onVideoTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <Button type="primary" size="large" onClick={onSumit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;