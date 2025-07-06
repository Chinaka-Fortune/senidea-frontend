import React, { useState, useEffect } from "react";
import BlogContentComp from "./BlogContentComp";
import { getBlogPosts } from "../../utils/api";
import ImageProxy from "../../utils/ImageProxy";
import "../Blog.css";

const BlogContent = () => {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const postsPerPage = 3;

  const loadPosts = async (pageNum = 1) => {
    try {
      console.debug(`Loading blog posts for page ${pageNum}`);
      const cachedPosts = localStorage.getItem('blogPosts');
      const cacheTimestamp = localStorage.getItem('blogPostsTimestamp');
      const cachedTotal = localStorage.getItem('blogPostsTotal');
      const cachedPage = localStorage.getItem('blogPostsPage');
      const cacheDuration = 5 * 60 * 1000;

      if (
        cachedPosts &&
        cacheTimestamp &&
        cachedTotal &&
        cachedPage &&
        parseInt(cachedPage) === pageNum &&
        Date.now() - parseInt(cacheTimestamp) < cacheDuration
      ) {
        console.debug("Using cached blog posts");
        setPosts(JSON.parse(cachedPosts));
        setTotal(parseInt(cachedTotal));
        setPage(pageNum);
        return;
      }

      console.debug("Fetching blog posts");
      const response = await getBlogPosts(`blog?limit=${postsPerPage}&offset=${(pageNum - 1) * postsPerPage}`);
      console.log("API Response:", response);
      const postsWithImages = await Promise.all(
        response.posts.map(async (post) => {
          const imageUrl = post.image_path
            ? await ImageProxy(post.id)
            : 'https://via.placeholder.com/150';
          console.log(`Post ${post.id} image_url:`, imageUrl);
          return { ...post, imageUrl };
        })
      );

      localStorage.setItem('blogPosts', JSON.stringify(postsWithImages));
      localStorage.setItem('blogPostsTimestamp', Date.now().toString());
      localStorage.setItem('blogPostsTotal', response.total.toString());
      localStorage.setItem('blogPostsPage', pageNum.toString());
      setPosts(postsWithImages);
      setTotal(response.total);
      setPage(pageNum);
    } catch (err) {
      console.error("Error loading blog posts:", err);
      setError("Failed to load blog posts: " + err.message);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(total / postsPerPage)) {
      loadPosts(newPage);
    }
  };

  return (
    <div className="ps-md-5 mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {posts.length === 0 && !error && <p>No blog posts available.</p>}
      <BlogContentComp
        posts={posts}
        total={total}
        currentPage={page}
        postsPerPage={postsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogContent;