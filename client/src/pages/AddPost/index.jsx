import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import axios, { API_BASE_URL } from '../../axios';
export const AddPost = () => {
  const { id} = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setimageUrl] = React.useState('');
  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);

  const handleChangeFile = async(event) => {
    
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const {data} = await axios.post('/upload', formData);
      setimageUrl(data.url);

    } catch (e) {
      console.warn( e );
      alert( "error in file loading" );

    }
  };

  const onClickRemoveImage = () => {
    setimageUrl("");
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const onSubmit = async () => {
    try{
      setLoading(true);
      const fields = {
        title,
        imageUrl,
        tags: tags.split(","),
        text
      }
      const {data} = isEditing? await axios.patch(`/posts/${id}`, fields) :await axios.post('/posts', fields); 

      const _id = isEditing? id : data._id;
      navigate(`/posts/${_id}`)
    }catch(e){
console.warn(e);
alert( "error in creation" );
    }
  };
React.useEffect(() => {
  if (!id) return;

  axios.get(`/posts/${id}`)
    .then(({ data }) => {
      setTitle(data.title);
      setText(data.text);
      setimageUrl(data.imageUrl);
      setTags(data.tags.join(","));
    })
    .catch(err => {
      console.warn(err);
      alert("error");
    });
}, [id]);
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Add text',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to = "/" />;
  }
  console.log({title, tags, text});
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick = {() => inputFileRef.current.click()}variant="outlined" size="large">
        Load preview
      </Button>
      <input ref = {inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
      <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
        <img className={styles.image} src={`${API_BASE_URL}${imageUrl}`} alt="Uploaded" />  
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title"
        value={title}
        onChange= {(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
      value = {tags}
      onChange= {(e) => setTags(e.target.value)}
      classes={{ root: styles.tags }} 
      variant="standard" 
      placeholder="Tags" 
      fullWidth />
      <SimpleMDE 
      className={styles.editor} 
      value={text} 
      onChange={onChange} 
      options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing?"Save" : "Publish"}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
