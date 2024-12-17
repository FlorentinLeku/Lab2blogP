import React, { useState } from 'react';
import { useFormik, validateYupSchema } from "formik";
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';
import ReactQuill from "react-quill";
import { useMutation } from '@tanstack/react-query';
import { createPostAPI } from '../../APIServices/posts/postsAPI';

const CreatePost = () => {
    //state for wysiwg
    const [description, setDescrition] = useState('');
    //post mutation
    const postMutation = useMutation({
        mutationKey:['create-post'],
        mutationFn: createPostAPI
    })
    const formik = useFormik({
        //initial data
        initialValues:{
            description: '',
        },
        //validation
        validateYupSchema: Yup.object({
            description: Yup.string().required("Description is required"),
        }),
        //submit
        onSubmit: (values) =>{
            const postData = {
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
        <ReactQuill
        value={formik.values.description}
        onChange={(value)=>{
            setDescrition(value);
            formik.setFieldValue("description", value);
        }}
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