import React, { useEffect, useState } from "react";
import { getPosts, getAuthor } from "../wp-api/api";
import { loginActions } from "../slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState({});

  const jwt_token = useSelector((state) => state.login.jwt_token);
  const expiration_time = useSelector((state) => state.login.expiration_time);
  const dispatch = useDispatch();

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    if (now < expiration_time) {
      const fetchPosts = async () => {
        try {
          const posts = await getPosts(jwt_token);
          setPosts(posts);

          const authorIds = posts.map((post) => post.author);
          const uniqueAuthorIds = [...new Set(authorIds)];

          const authorPromises = uniqueAuthorIds.map((id) => getAuthor(id, jwt_token));
          const authorData = await Promise.all(authorPromises);
          const authorMap = authorData.reduce((acc, author) => {
            acc[author.id] = author;
            return acc;
          }, {});
          setAuthors(authorMap);
        } catch (error) {
          console.error("Error fetching posts or authors:", error);
        }
      };

      fetchPosts();
    } else {
      dispatch(loginActions.logout());
    }
  }, [expiration_time, jwt_token, dispatch]);

  function handleLogout() {
    dispatch(loginActions.logout());
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blog Posts{" "}
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            All the wordpress blog posts are listed below
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article className="flex max-w-xl flex-col items-start justify-between" key={post.id}>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Link to={`/post/${post.id}`}>
                    <span className="absolute inset-0"></span>
                    {post.title.rendered}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={authors[post.author]?.avatar_urls[24]}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      {authors[post.author]?.name || "Unknown Author"}
                    </a>
                  </p>
                  <p className="text-gray-600">Author</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
