import React from 'react';
import { useFormik, validateYupSchema } from "formik";
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { createPostAPI } from '../../APIServices/posts/postsAPI';

const CreatePost = () => {
    //post mutation
    const postMutation = useMutation({
        mutationKey:['create-post'],
        mutationFn: createPostAPI
    })
    const formik = useFormik({
        //initial data
        initialValues:{
            title:'',
            description: ''
        },
        //validation
        validateYupSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
        }),
        //submit
        onSubmit: (values) =>{
            const postData = {
                title: values.title,
                description: values.description,
            };
            postMutation.mutate(postData);
        },
    });
    console.log("mutation", postMutation);
    //get loading state
    const isLoading = postMutation.isPending;
    //isErr
    const isError = postMutation.isError;
    //success
    const isSuccess = postMutation.isSuccess;
    //Error
    const error = postMutation.error;

    const errorMsg = postMutation?.error?.response?.data?.message;
    console.log(errorMsg);
  return (
    <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Post created successfully</p>}
        {isError && <p>{errorMsg}</p>}
        <form onSubmit={formik.handleSubmit}>
            <input type="text" name="title" placeholder="Enter Title" 
            {   ...formik.getFieldProps('title')}
            />
            {/*display error message */}
            {formik.touched.title && formik.errors.title && (
          <span style={{ color: "red" }}>{formik.errors.title}</span>
        )}
            <input type="text" name="description" placeholder="Enter description" 
            {   ...formik.getFieldProps('description')}
            />
            <button type="submit">Create</button>
        </form>
    </div>
  );
};

export default CreatePost;