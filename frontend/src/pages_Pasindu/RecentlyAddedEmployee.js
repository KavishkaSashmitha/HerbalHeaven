import React, { useEffect, useState } from "react";
import axios from "axios";

function LastAddedEmp() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastEmployee, setLastEmployee] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/posts/posts"
        );

        // Assuming the response contains an array of posts
        const posts = response.data.existingPosts;

        // Set the documents in state
        setDocuments(posts);

        // If there are posts, find the most recent one
        if (posts.length > 0) {
          // Find the most recent post (assuming posts are sorted)
          const lastPost = posts[posts.length - 1];

          // If there is a user in the last post, set it as the last employee
          if (lastPost && lastPost.name) {
            setLastEmployee(lastPost);
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
        <div className="pl-10 py-3">
          <div className="w-6 h-6 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin bg-gray-100"></div>
        </div>
      ) : (
        <div>
          {lastEmployee ? (
            <div>
              <p>{lastEmployee.name}</p>
            </div>
          ) : (
            <p>?</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LastAddedEmp;
