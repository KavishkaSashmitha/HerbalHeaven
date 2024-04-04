import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostDetails() {
  const { id } = useParams();
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchData = async (id) => {
      axios.get(`/posts/${id}`).then((res) => {
        if (res.data.success) {
          setPosts(res.data.post);
        }
      });
    };
    fetchData(id);
  }, [id]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h4 className="text-center text-xl font-bold mb-4">{posts?.topic}</h4>
      <hr className="border border-gray-300 mb-4" />

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        <div className="flex items-center">
          <dt className="font-semibold text-gray-700">Employee Name</dt>
          <dd className="ml-2">{posts?.name}</dd>
        </div>

        <div className="flex items-center">
          <dt className="font-semibold text-gray-700">Jobrole</dt>
          <dd className="ml-2">{posts?.jobrole}</dd>
        </div>

        <div className="flex items-center">
          <dt className="font-semibold text-gray-700">Gender</dt>
          <dd className="ml-2">{posts?.gender}</dd>
        </div>

        <div className="flex items-center">
          <dt className="font-semibold text-gray-700">Mobile</dt>
          <dd className="ml-2">{posts?.mobile}</dd>
        </div>

        <div className="flex items-center">
          <dt className="font-semibold text-gray-700">Email</dt>
          <dd className="ml-2">{posts?.email}</dd>
        </div>

        <div className="flex items-center">
          <dt className="font-semibold text-gray-700">Address</dt>
          <dd className="ml-2">{posts?.address}</dd>
        </div>

        <div className="flex items-center">
          <dt className="font-semibold text-gray-700">Age</dt>
          <dd className="ml-2">{posts?.age}</dd>
        </div>
      </dl>
    </div>
  );
}
