import React, { useEffect, useState } from "react";
import {
    Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const HighestSalaryEmpPhoto = () => {
  // Initialize state variables for tracking the highest salary, the associated username, the user image, and the month of the highest salary
  const [highestSalary, setHighestSalary] = useState(0);
  const [userWithHighestSalary, setUserWithHighestSalary] = useState("");
  const [monthOfHighestSalary, setMonthOfHighestSalary] = useState("");
  const [userImage, setUserImage] = useState(""); // New state for user image URL

  useEffect(() => {
    // Function to fetch data from the API and calculate the highest salary, associated username, user image, and the month of the highest salary
    async function fetchData() {
      try {
        // Fetch data from the API
        const response = await fetch("http://localhost:8070/api/posts/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();

        // Initialize variables to track the maximum salary, the associated user, and the month of the highest salary
        let maxSalary = 0;
        let maxSalaryUser = "";
        let maxSalaryMonth = "";
        let maxSalaryUserImage = ""; // New variable for the user image URL

        // Iterate through all posts and find the highest salary, associated user, and user image
        responseData.existingPosts.forEach((post) => {
          if (post.salary) {
            // Check all months' salaries for the highest value
            for (const month in post.salary) {
              if (typeof post.salary[month] === "number") {
                if (post.salary[month] > maxSalary) {
                  maxSalary = post.salary[month];
                  maxSalaryUser = post.name; // Assuming 'name' is a property in each 'post' object
                  maxSalaryMonth = month; // Store the month of the highest salary
                  maxSalaryUserImage = post.image; // Assuming 'image' is the property for user image URL
                }
              }
            }
          }
        });

        // Update the state variables with the highest salary, associated username, month of highest salary, and user image
        setHighestSalary(maxSalary);
        setUserWithHighestSalary(maxSalaryUser);
        setMonthOfHighestSalary(maxSalaryMonth);
        setUserImage(maxSalaryUserImage); // Update state with user image URL
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Call the function to fetch data and calculate the highest salary, associated username, and the month of the highest salary
    fetchData();
  }, []);

  // Render the component with the highest salary, associated username, user image, and the month of the highest salary
  return (
    <div>
      {userImage && (
        <div>
          <Avatar
            src={userImage}
            size="lg"
            className="mr-3 border border-blue-gray-50 bg-blue-gray-50/50 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default HighestSalaryEmpPhoto;
