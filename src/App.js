/* state manageent, loading and error states, crud, child components, Post list, postform, searchbar, postitem */


import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    userId: 1
  });

  const [submitting, setSubmitting] = useState(false);



  //useEffect to fetch when component mounts

  useEffect( () => {
    fetchPosts();
  },[]);

  //fetch all posts api

  const fetchPosts = async() => {
    try{
      setLoading(true); //set loading true when starting request

      setError(null); //clear all prev errors

      const response = await fetch('https://jsonplaceholder.typicode.com/posts');

      if(!response.ok){
        throw new Error(`Httpt error! status: ${response.status}`);
      }

      //convert response to JSON

      const data = await response.json();

      setPosts(data);

    }catch(err){
      setError(err.message);
      console.error("Error fetching posts : ", err);
    }finally{
      setLoading(false);
    }
  }


  //function to create new post
  const createPost = async (postData) => {
    try{
      //set submitting state to show loading the form
      setSubmitting(true);

      setError(null);

      //make post reqquest to create new post

      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(postData)

      });

    if(!response.ok){
        throw new Error(`Httpt errorQ staus: ${response.status}`);
      }

      //  Get the created post data from response

      const createdPost = await response.json();


      //Add new post to begining of or posts array

      setPosts(prevPosts => [createdPost, ...prevPosts]);

      //reset the form

      setNewPost({
        title: '',
        body: '',
        userId: 1
      });


      //hide the form
      setShowForm(false);

      console.log('Post created', createdPost);

    }catch(err){
      setError(`Falied to create post ${err.message}`);
      console.error("Error creating post");
    }finally{
      setSubmitting(false);
    }
  };


  //function to  handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();

    //validate form

  if(!newPost.title.trim() || !newPost.body.trim()){
    setError('Fill all the fields');
    return;
  }

  //clear error
  setError(null);

  //call our create function 

  createPost(newPost);

  };


  //function to handle input changes

  const handleInputChange = (field, value) => {
    setNewPost(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="App">
      <header className='app-header'>
        <h1> Posts Manager </h1>
        <p> Manage your blogs</p>
      </header>

      <div className='add-post-section'>
        <button
        className='toggle-form-btn'
        onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add new Post'}

        </button>

        {showForm && (
          <form className='post-form' onSubmit={handleSubmit}>
              <h3> create New Post </h3>
              <div className='form-group'>
              <label htmlFor='title'> Post Title:</label>
              <input
                type="text"
                id="title"
                value={newPost.title}
                onChange={(e)=> handleInputChange('title', e.target.value)}
                placeholder='Ener title'
                disabled={submitting}
                />
              </div>

          <div className='form-group'>
              <label htmlFor='body'> Post Content:</label>
              <textarea
                id="body"
                value={newPost.body}
                onChange={(e)=> handleInputChange('body', e.target.value)}
                placeholder='Ener post content'
                rows="6"
                disabled={submitting}
                />
              </div>
  
          <div className='form-actions'>
              <button
              type='submit'
              disabled={submitting || !newPost.title.trim() || !newPost.body.trim()}
              className='submit-btn'
              >
              {submitting ? "Creating Post..." : "Create Post"}

              </button>

              <button
              type='button'
              onClick={() => setShowForm(false)}
              disabled={submitting}
              className='cancel-btn'
              >
              Cancel

              </button>
           </div>   

          </form>

        )}

      </div>


      {loading && (
        <div className='loading'>
          <h2> loading posts .....</h2>
        </div>  
      )}

      {error && (
        <div className='error'>
          <h2> Error </h2>
          <p> {error}</p>
          <button onClick={fetchPosts}>TryAgain</button>
        </div>  
      )} 

       {!loading && !error && (
        <div className='post-container'>
          <h2> All Posts ({posts.length}) </h2>
          {posts.length == 0 ? (
              <p> No posts found</p>
          ): (
            <div className='posts-grid'>
              {posts.map(post => (
                <div key={post.id} className='post-card'>
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                      <small> Post Id: {post.id} | User Id: {post.userId}</small>
                  </div>
              ))

              }
            </div>  
          )
          

          }
          <button className='error' onClick={fetchPosts}>TryAgain</button>
        </div>  
      )} 


    </div>
  );
}

export default App;
