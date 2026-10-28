import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { API_BASE_URL } from '../axios';
import {useDispatch, useSelector} from "react-redux";
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags} from '../redux/slices/posts';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';

export const Home = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const UserData= useSelector(state => state.auth.data); 
  const {posts, tags} = useSelector(state => state.posts); 
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const visiblePosts = tag
    ? posts.items.filter((post) =>
        post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
      )
    : posts.items;
  React.useEffect(() => {
  
    dispatch(fetchPosts());
    dispatch(fetchTags())
    
  }, [dispatch]);
  console.log(posts);
  console.log(tags);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      {tag && <h2>Posts tagged #{tag}</h2>}
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {posts.status === "error" && (
            <Alert severity="error">Could not load posts. Check that the API server is running.</Alert>
          )}
          {!isPostsLoading && posts.status === "loaded" && tag && visiblePosts.length === 0 && (
            <p>No posts found with this tag.</p>
          )}
          {(isPostsLoading ? [...Array(5)] : visiblePosts).map((obj, index) =>
            isPostsLoading ? (
            <Post key ={index} isLoading={true} />
              ) : (
            <Post
              key={obj._id}
              id={obj._id}
              title= {obj.title}
              imageUrl= {obj.imageUrl ? `${API_BASE_URL}${obj.imageUrl}` : ""}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
  
              isEditable = {UserData?._id === obj.user._id}
            />
          ),
          )}
        </Grid>
        <Grid xs={4} item>
          {tags.status === "error" && (
            <Alert severity="error">Could not load tags. Check that the API server is running.</Alert>
          )}
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            /*items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}*/
          />
        </Grid>
      </Grid>
    </>
  );
};
