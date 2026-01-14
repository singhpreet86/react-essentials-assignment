/* cusomer hooks, personal expence tracker 

psychology of custom hooks 
the art of logoc extraction
state management patterns
data presistence magic
real work architecture 


Why expences -> ( expences, categories, filters) 
local storage( saving/loading data)
calculation logic
form handling




state complexity
data relationships
real world persisence
busiines login
practical value


Custom hooks ->
  starts with use
  can call other hooks
  return vaues that component can use
  encapsulate logic

*/

//In below functions we have duplicated code for fetching user data

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); 

//   useEffect(() => {
//     fetchUser()
//     .then(setUser)
//     .then(setError)
//     .finally(() => setLoading(false));
//   }, []);

  
// }

// const UserSettings = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); 

//   useEffect(() => {
//     fetchUser()
//     .then(setUser)
//     .then(setError)
//     .finally(() => setLoading(false));
//   }, []);

  
// }

//In above functions we have duplicated code for fetching user data


//We can extract this logic into a custom hook
// const useUserData = () => { 

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); 

//   useEffect(() => {
//     fetchUser()
//     .then(setUser)
//     .then(setError)
//     .finally(() => setLoading(false));
//   }, []);
//   return {user, loading, error};
// }

// const UserProfile = () => {
//   const {user, loading, error} = useUserData();
// }

// const UserSetting = () => {
//   const {user, loading, error} = useUserData();
// }


/* always start with use
only call at the top level
only call from react functions
keep them focused
can call other hooks
return values that component can use
encapsulate logic


when to use custom hooks
- you are copying useState and useEffect logic across multiple components
  A component has more than 2.4 useState calls
  your useEffect logic is complex and involves multiple steps
  you want to share logic between components without repeating code
  you want to abstract away complex logic for better readability
  local storage or session storage management
  form handling and validation
  data fetching and caching
  authentication and authorization
  theming and styling management
  performance optimizations like debouncing or throttling
  real-time data handling with websockets or subscriptions
*/




import React, {useState, useEffect} from 'react';
import './App.css';
import './index.css';

function App() {

  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [editingPost, setEditingPost] = useState(null);

  // const[editForm, setEditForm] = useState({
  //   title: '',
  //   body: ''
  // }); 

  // const[updating, setUpdating] = useState (false);

  // const [showForm, setShowForm] = useState(false);
  // const [newPost, setNewPost] = useState({
  //   title: '',
  //   body: '',
  //   userId: 1
  // });

  // const [submitting, setSubmitting] = useState(false);



  //useEffect to fetch when component mounts

  // useEffect( () => {
  //   fetchPosts();
  // },[]);

  //fetch all posts api

  // const fetchPosts = async() => {
  //   try{
  //     setLoading(true); //set loading true when starting request

  //     setError(null); //clear all prev errors

  //     const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  //     if(!response.ok){
  //       throw new Error(`Httpt error! status: ${response.status}`);
  //     }

  //     //convert response to JSON

  //     const data = await response.json();

  //     setPosts(data);

  //   }catch(err){
  //     setError(err.message);
  //     console.error("Error fetching posts : ", err);
  //   }finally{
  //     setLoading(false);
  //   }
  // }


  //function to create new post
  // const createPost = async (postData) => {
  //   try{
  //     //set submitting state to show loading the form
  //     setSubmitting(true);

  //     setError(null);

  //     //make post reqquest to create new post

  //     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  //       method: 'POST',
  //       headers:{
  //         'Content-Type':'application/json'
  //       },
  //       body: JSON.stringify(postData)

  //     });

  //   if(!response.ok){
  //       throw new Error(`Httpt errorQ staus: ${response.status}`);
  //     }

  //     //  Get the created post data from response

  //     const createdPost = await response.json();


  //     //Add new post to begining of or posts array

  //     setPosts(prevPosts => [createdPost, ...prevPosts]);

  //     //reset the form

  //     setNewPost({
  //       title: '',
  //       body: '',
  //       userId: 1
  //     });


  //     //hide the form
  //     setShowForm(false);

  //     console.log('Post created', createdPost);

  //   }catch(err){
  //     setError(`Falied to create post ${err.message}`);
  //     console.error("Error creating post");
  //   }finally{
  //     setSubmitting(false);
  //   }
  // };


  //function to  handle form submission

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   //validate form

  // if(!newPost.title.trim() || !newPost.body.trim()){
  //   setError('Fill all the fields');
  //   return;
  // }

  // //clear error
  // setError(null);

  // //call our create function 

  // createPost(newPost);

  // };


  // //function to handle input changes

  // const handleInputChange = (field, value) => {
  //   setNewPost(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };

  // const deletePost = async (postId) => {
  //   try{
  //     setError(null);

  //     //Make delete request to API
  //     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
  //       method: 'DELETE'
  //     });


  //     if(!response.ok){
  //       throw new Error (`Http error! status: ${response.status}`);
  //     } 

  //     //remove the deleted post from state

  //     setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));

  //     console.log(`Post with id ${postId} deleted successfully`);


  //   }catch(err){
  //     setError(`Failed to delete post: ${err.message}`);
  //     console.error("Error deleting post", err);
  //   }
  // };

  // //function to handle delete with confirmation

  // const handleDelete = (post) => {
  //   //show confirmation dialog
  //   const confirmDelete = window.confirm(`Are you sure you want to delete the post titled "${post.title}"?\n\nThis cannot be undone.`);

  //   if(confirmDelete){
  //     deletePost(post.id);
  //   } 
  // };

  // //function to update a post

  // const updatePost = async (postId, updatedData) => {
  //   try{
  //     setUpdating(true);
  //     setError(null);

  //     //make put request to update post

  //     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
  //       method: 'PUT',
  //       headers:{
  //         'Content-Type':'application/json'
  //       },
  //       body: JSON.stringify({
  //         id: postId,
  //         ...updatedData, 
  //         userId: 1 //assuming userId is 1 for simplicity 
        
  //       })
  //     });

  //     if(!response.ok){
  //       throw new Error(`Http error! status: ${response.status}`);
  //     }

  //     //get updated post data from response

  //     const updatedPost = await response.json();

  //     //update the post in state

  //     setPosts (prevPosts => prevPosts.map(post => post.id === postId ? {...post, ...updatedPost } : post));

  //     console.log('Post updated', updatedPost);

  //     //clear editing state

  //     setEditingPost(null);
  //     setEditForm({
  //       title: '',
  //       body: ''
  //     });

  //   } 
  //   catch(err){
  //     setError(`Failed to update post: ${err.message}`);
  //     console.error("Error updating post", err);
  //   }finally{
  //     setUpdating(false);
  //   }
  // };


  // //function to start editing a post

  // const startEditing = (post) => {
  //   setEditingPost(post.id);
  //   setEditForm({
  //     title: post.title,
  //     body: post.body
  //   });
  // };

  // // function to cancel editing

  // const cancelEditing = () => {
  //   setEditingPost(null);
  //   setEditForm({
  //     title: '',
  //     body: ''
  //   });
  // };

  // // function so sbmit edited 

  // const submitEdit = (e) => {
  //   //validate form
  //    if(!editForm.title.trim() || !editForm.body.trim()){
  //     setError('Fill all the fields');
  //     return;
  //   }
   

  //   updatePost(editingPost, editForm);
  // }




  return (
    <div className="App">
      <header className='app-header'>
        <h1> Pessonale expence tracker </h1>
        <p> We will build step by step</p>
      </header>

      <div className='add-post-section'>
      </div>  


    </div>
  );
}

export default App;
