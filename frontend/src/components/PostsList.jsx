import { useQuery } from '@tanstack/react-query';
import React from "react";
import { fetchAllPosts } from '../APIServices/posts/postsAPI';

const PostsList = () => {
  //!use query
  const {isError, isLoading, data, error, isSuccess} = useQuery({
    queryKey: ["lists-posts"],
    queryFn: fetchAllPosts,
  });
  console.log(data);
return (
    <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Posts fetched</p>}
        {error && <p>{error.message}</p>}
        {data?.posts.map((post) => {
            return (
                <div key={post.id}>
                    <h2>{post?.title}</h2>
                    <p>{post?.description}</p>
                </div>
            );
        })}
    </div>
  );
};

export default PostsList