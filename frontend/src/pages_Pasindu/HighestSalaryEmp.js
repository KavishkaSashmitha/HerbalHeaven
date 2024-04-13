import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const HighestSalary = () => {
  // Initialize state variables for tracking the highest salary, the associated username, and the month of the highest salary
  const [highestSalary, setHighestSalary] = useState(0);
  const [userWithHighestSalary, setUserWithHighestSalary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from the API and calculate the highest salary, associated username, and the month of the highest salary
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

        // Iterate through all posts and find the highest salary and associated user
        responseData.existingPosts.forEach((post) => {
          if (post.salary) {
            // Check all months' salaries for the highest value
            for (const month in post.salary) {
              if (typeof post.salary[month] === "number") {
                if (post.salary[month] > maxSalary) {
                  maxSalary = post.salary[month];
                  maxSalaryUser = post.name; // Assuming 'username' is a property in each 'post' object
                  maxSalaryMonth = month; // Store the month of the highest salary
                }
              }
            }
          }
        });

        // Update the state variables with the highest salary, associated username, and the month of the highest salary
        setHighestSalary(maxSalary);
        setUserWithHighestSalary(maxSalaryUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    // Call the function to fetch data and calculate the highest salary, associated username, and the month of the highest salary
    fetchData();
  }, []);

  function capitalizeFirstPart(name) {
    if (!name) return ""; // Return an empty string if the input is empty or falsy

    const parts = name.split(" "); // Split the name into parts

    // Capitalize the first letter of the first part (first name) and convert the rest to lowercase
    const firstPart = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();

    // Return the capitalized first part of the name
    return firstPart;
}


  // Render the component with the highest salary, associated username, and the month of the highest salary
  return (
    <div>
      {loading ? (
        <div className="pl-10 py-1">
          <div className="w-6 h-6 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin bg-gray-100"></div>
        </div>
      ) : (
        <div>
          <div>
            <div className="font-bold">
              {capitalizeFirstPart(userWithHighestSalary)}
            </div>
            <div>Salary: {highestSalary}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighestSalary;
