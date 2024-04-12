import React, { useEffect, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const HighestSalaryEmpPhoto = () => {
  // Initialize state variables
  const [highestSalary, setHighestSalary] = useState(0);
  const [userWithHighestSalary, setUserWithHighestSalary] = useState("");
  const [monthOfHighestSalary, setMonthOfHighestSalary] = useState("");
  const [userImage, setUserImage] = useState(""); // State for user image URL
  const [userId, setUserId] = useState(""); // State for user ID
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data and calculate highest salary, associated username, user ID, and user image
    async function fetchData() {
      try {
        // Fetch data from the API
        const response = await fetch("http://localhost:8070/api/posts/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();

        // Variables to track maximum salary, user, month of highest salary, and user ID
        let maxSalary = 0;
        let maxSalaryUser = "";
        let maxSalaryMonth = "";
        let maxSalaryUserImage = ""; // User image URL
        let maxSalaryUserId = ""; // User ID

        // Iterate through posts to find highest salary, user, month, and ID
        responseData.existingPosts.forEach((post) => {
          if (post.salary) {
            // Check all months' salaries for the highest value
            for (const month in post.salary) {
              if (typeof post.salary[month] === "number") {
                if (post.salary[month] > maxSalary) {
                  maxSalary = post.salary[month];
                  maxSalaryUser = post.name;
                  maxSalaryMonth = month;
                  maxSalaryUserImage = post.image;

                  // Set the user ID to maxSalaryUserId using the '_id' property
                  maxSalaryUserId = post._id;
                }
              }
            }
          }
        });

        // Update state variables
        setHighestSalary(maxSalary);
        setUserWithHighestSalary(maxSalaryUser);
        setMonthOfHighestSalary(maxSalaryMonth);
        setUserImage(maxSalaryUserImage);
        setUserId(maxSalaryUserId); // Set user ID state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    // Call fetchData function
    fetchData();
  }, []);

  // Render the component
  return (
    <div>
      {loading ? (
        <div className="">
          <div className="w-6 h-6 border-4 border-gray-300 rounded-full border-t-teal-500 animate-spin bg-gray-100"></div>
        </div>
      ) : (
        <div>
          {userImage ? (
            // Use Link component for navigation to user profile with ID
            <Link to={`/Display_Employee_Details/${userId}`}>
              <Avatar
                src={userImage}
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
};

export default HighestSalaryEmpPhoto;
