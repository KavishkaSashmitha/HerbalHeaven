import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@material-tailwind/react";

function LastAddedEmpImage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastEmployee, setLastEmployee] = useState(null);
  const [lastUserImage, setLastUserImage] = useState(null);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   jobrole: "",
  //   gender: "",
  //   mobile: "",
  //   email: "",
  //   address: "",
  //   age: "",
  // });

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
          {lastUserImage ? (
            <div>
              <Avatar
                src={lastUserImage}
                size="lg"
                className="mr-3 border border-blue-gray-50 bg-blue-gray-50/50 object-contain"
              />
            </div>
          ) : (
            <p>No employee information available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LastAddedEmpImage;
