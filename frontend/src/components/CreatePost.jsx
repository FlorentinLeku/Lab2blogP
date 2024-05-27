import React from 'react';
import { useFormik, validateYupSchema } from "formik";
import * as Yup from 'yup';

const CreatePost = () => {
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
            console.log(values);
        },
    });
  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <input type="text" name="title" placeholder="Enter Title" 
            {   ...formik.getFieldProps('title')}
            />
            <input type="text" name="description" placeholder="Enter description" 
            {   ...formik.getFieldProps('description')}
            />
            <button type="submit">Create</button>
        </form>
    </div>
  );
};

export default CreatePost;