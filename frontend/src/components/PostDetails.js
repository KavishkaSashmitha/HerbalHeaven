import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostDetails(){
    const { id } = useParams()
    const [posts, setPosts] = useState({})

    useEffect(() => {
        const fetchData = async (id) => {
            axios.get(`/posts/${id}`).then(res => {
                if (res.data.success) {
                    setPosts(
                    res.data.post
                  );
                }
            })
        }
        fetchData(id);
    }, [id])


    return(
        <div style={{marginTop:'20px'}}>
            <h4>{posts?.topic}</h4>
            <hr/>

            <dl className='row'>

                 <dt className='col-sm-3'>Supplier Name</dt>
                <dd className='col-sm-9'>{posts?.name}</dd>

                <dt className='col-sm-3'>Category</dt>
                <dd className='col-sm-9'>{posts?.category}</dd>

                <dt className='col-sm-3'>Mobile</dt>
                <dd className='col-sm-9'>{posts?.address}</dd>

                <dt className='col-sm-3'>Address</dt>
                <dd className='col-sm-9'>{posts?.mobile}</dd>

                <dt className='col-sm-3'>Email</dt>
                <dd className='col-sm-9'>{posts?.email}</dd>
            </dl>

        </div>
    )
}