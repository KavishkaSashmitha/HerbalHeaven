import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function LastAddedEmpImage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastEmployee, setLastEmployee] = useState(null);
  const [lastUserImage, setLastUserImage] = useState(null);
  const [userId, setLastUserId] = useState(""); // State for user ID
  

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/posts/posts"
        );
        // if (response.data.success) {
        //   setFormData(response.data.post);
        // }

        // Assuming the response contains an array of posts
        const posts = response.data.existingPosts;

        // Set the documents in state
        setDocuments(posts);

        // If there are posts, find the most recent one
        if (posts.length > 0) {
          // Find the most recent post (assuming posts are sorted)
          const lastPost = posts[posts.length - 1];

          if (lastPost.image) {
            setLastUserImage(lastPost.image);
            setLastUserId(lastPost._id);
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
        <div className="">
          <div className="w-6 h-6 border-4 border-gray-300 rounded-full border-t-teal-500 animate-spin bg-gray-100"></div>
        </div>
      ) : (
        <div>
          {lastUserImage ? (
            <Link to={`/Display_Employee_Details/${userId}`}>
            <Avatar
              src={lastUserImage}
              size="lg"
              className="mr-3 border border-blue-gray-50 bg-blue-gray-50/50 object-contain"
            />
          </Link>
          ) : (
            <p>?</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LastAddedEmpImage;
