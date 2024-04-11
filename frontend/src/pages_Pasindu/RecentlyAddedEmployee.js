import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LastAddedEmp() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUser, setLastUser] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/posts/posts"
        );
        
        // Assuming response.data.existingPosts contains a list of posts
        const posts = response.data.existingPosts;

        // Set the documents
        setDocuments(posts);
        
        if (posts.length > 0) {
          // Find the most recently added post
          // Assuming the posts are already sorted by creation date in ascending order
          const lastPost = posts[posts.length - 1];
          
          // Assuming the user information is stored in lastPost.user
          setLastUser(lastPost.user);
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
            <p>Name: {lastUser.name}</p>
            // Display additional user information as needed
          ) : (
            <p>No users found.</p>
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

export default LastAddedEmp;
