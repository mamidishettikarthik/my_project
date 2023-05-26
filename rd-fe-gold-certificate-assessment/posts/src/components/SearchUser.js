import { useState } from "react";

const SearchUser = () => {
  const [posts,setPosts] = useState([]);
  const [number,setNumber]=useState();
 
  const fetchData = e => {
    const query = e.target.value;
    fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`)
      .then(response => {
      })
      .then(data => {
        setPosts(data);
      })
  }
  clickHandler=()={
    setNumber(number+5)
  }

  return (
    <div>
        <div class="ui container center aligned">
        <h2 class="header ui blue">
            Search for the title and body
        </h2>
        <div class="ui search">
            <input class="prompt"
                   type="text"
                   onChange={fetchData}
                   placeholder="Search for title and body"/>
            <div class="results" ></div>
            <button className="btn btn-primary" onClick={clickHandler}>Load more</button>
        </div>
    </div>
      {posts.length > 0 && (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
                <h1>{post.title}</h1>
                {post.body}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default SearchUser;
