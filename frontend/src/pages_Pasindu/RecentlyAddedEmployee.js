import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUser, setLastUser] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:8070/api/posts/posts");
        
        // Assuming the response contains an array of posts
        const posts = response.data.existingPosts;
        
        // Set the documents in state
        setDocuments(posts);
        
        // If there are posts, find the most recent one
        if (posts.length > 0) {
          // Assuming the posts are sorted in ascending order of creation time,
          // otherwise, you might need to sort them
          const lastPost = posts[posts.length - 1];
          
          // Set the lastUser with the user from the most recent post
          if (lastPost && lastPost.name) {
            setLastUser(lastPost.name);
          }
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Last Added User</h3>
          {lastUser ? (
            <div>
              <p>Name: {lastUser.name}</p>
              {/* Display more information about the user if available */}
            </div>
          ) : (
            <p>No user information available.</p>
          )}
          
          <h3>Documents</h3>
          <ul>
            {documents.map((document, index) => (
              <li key={index}>{document.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Documents;
