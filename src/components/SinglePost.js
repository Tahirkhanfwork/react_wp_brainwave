import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '../wp-api/api';
import { useSelector } from 'react-redux';

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const jwt_token = useSelector((state) => state.login.jwt_token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwt_token) {
      navigate('/');
      return;
    }

    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(id, jwt_token);
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, jwt_token, navigate]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article className="py-12 px-4">
      <h1 className="text-4xl text-center mb-4 font-semibold font-heading">{post.title}</h1>
      <p className="text-center">
        <span>Date: {new Date(post.date).toLocaleDateString()} By {post.author}</span>
        <a className="ml-1 text-indigo-600 hover:underline" href="#">{post.author}</a>
      </p>
      <div className="max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
