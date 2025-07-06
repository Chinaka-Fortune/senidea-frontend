import React, { useState, useEffect } from "react";
import { getComments, addComment, toggleLike, getLikes, getBlogPosts } from "../../utils/api";
import "../Blog.css";

const BlogContentComp = ({ posts, total, currentPage, postsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(total / postsPerPage);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [usernames, setUsernames] = useState({});
  const [likes, setLikes] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    const fetchCommentsAndLikes = async () => {
      try {
        const commentPromises = posts.map(post => 
          getComments(post.id).then(res => ({ postId: post.id, comments: res }))
        );
        const likePromises = posts.map(post => 
          getLikes(post.id).then(res => ({ postId: post.id, ...res }))
        );
        const commentResults = await Promise.all(commentPromises);
        const likeResults = await Promise.all(likePromises);

        const commentsMap = commentResults.reduce((acc, { postId, comments }) => ({
          ...acc,
          [postId]: comments
        }), {});
        const likesMap = likeResults.reduce((acc, { postId, like_count, user_liked }) => ({
          ...acc,
          [postId]: { like_count, user_liked }
        }), {});
        console.log("Initial likesMap:", likesMap);
        setComments(commentsMap);
        setLikes(likesMap);
      } catch (err) {
        console.error("Error fetching comments or likes:", err.message, err.response?.data);
        setErrors(prev => ({ ...prev, global: "Failed to load comments or likes" }));
      }
    };
    if (posts.length > 0) {
      fetchCommentsAndLikes();
    }
  }, [posts]);

  const validateComment = (username, content) => {
    if (!username?.trim() || username.length > 50) {
      return "Username is required and must be 50 characters or less";
    }
    if (!content?.trim() || content.length > 500) {
      return "Comment is required and must be 500 characters or less";
    }
    return null;
  };

  const handleCommentSubmit = async (postId) => {
    const username = usernames[postId]?.trim();
    const content = newComment[postId]?.trim();
    const validationError = validateComment(username, content);
    if (validationError) {
      setErrors(prev => ({ ...prev, [postId]: validationError }));
      return;
    }

    setLoading(prev => ({ ...prev, [postId]: true }));
    try {
      await addComment(postId, username, content);
      const updatedComments = await getComments(postId);
      setComments({ ...comments, [postId]: updatedComments });
      setNewComment({ ...newComment, [postId]: "" });
      setUsernames({ ...usernames, [postId]: "" });
      setErrors(prev => ({ ...prev, [postId]: null }));
    } catch (err) {
      console.error(`Error adding comment to post ${postId}:`, err.message, err.response?.data);
      setErrors(prev => ({ ...prev, [postId]: "Failed to add comment: " + err.message }));
    } finally {
      setLoading(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleLikeToggle = async (postId) => {
    setLoading(prev => ({ ...prev, [`like_${postId}`]: true }));
    try {
      console.log(`Calling toggleLike for post ${postId}`);
      const toggleResult = await toggleLike(postId);
      console.log(`toggleLike response for post ${postId}:`, toggleResult);
      console.log(`Calling getLikes for post ${postId}`);
      const updatedLikes = await getLikes(postId);
      console.log(`getLikes response for post ${postId}:`, updatedLikes);
      setLikes(prev => {
        const newLikes = { ...prev, [postId]: updatedLikes };
        console.log(`Updating likes state for post ${postId}:`, newLikes);
        return newLikes;
      });
      if (currentPage > 0 && totalPages >= currentPage) {
        try {
          console.log(`Calling getBlogPosts for page ${currentPage}`);
          const updatedPosts = await getBlogPosts({ page: currentPage, limit: postsPerPage });
          console.log(`getBlogPosts response:`, updatedPosts);
          onPageChange(currentPage, updatedPosts.posts, updatedPosts.total);
        } catch (postErr) {
          console.error(`Error fetching blog posts after like toggle for post ${postId}:`, postErr.message, postErr.response?.data);
        }
      } else {
        console.warn(`Skipping getBlogPosts: invalid page ${currentPage} or totalPages ${totalPages}`);
      }
      setErrors(prev => ({ ...prev, [postId]: null }));
    } catch (err) {
      console.error(`Error toggling like for post ${postId}:`, err.message, err.response?.data);
      // Only set error if likes didn't update
      if (!likes[postId] || likes[postId].like_count !== (await getLikes(postId)).like_count) {
        setErrors(prev => ({ ...prev, [postId]: "Failed to toggle like: " + err.message }));
      }
    } finally {
      setLoading(prev => ({ ...prev, [`like_${postId}`]: false }));
    }
  };

  return (
    <div className="container my-5">
      {errors.global && <div className="alert alert-danger text-center">{errors.global}</div>}
      {posts.map((post) => {
        console.log("BlogContentCompImg:", post.imageUrl);
        const sanitizedText = post.content.replace(/<[^>]+>/g, "");
        return (
          <div className="row justify-content-center mb-5" key={post.id}>
            <div className="col-12 col-md-10 col-lg-8">
              <div className="card shadow-sm">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Blog content display"
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-user me-2 iconColor"></i>
                      <span>Senidea</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-comments me-2 iconColor"></i>
                      <span>{comments[post.id]?.length || 0} comments</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i
                        className={`fa-solid fa-heart me-2 ${likes[post.id]?.user_liked ? 'text-danger' : 'iconColor'}`}
                        onClick={() => handleLikeToggle(post.id)}
                        style={{ cursor: loading[`like_${post.id}`] ? 'wait' : 'pointer' }}
                      ></i>
                      <span>{likes[post.id]?.like_count || 0} likes</span>
                    </div>
                  </div>
                  <h2 className="card-title">{post.title}</h2>
                  <p className="card-text">{sanitizedText.substring(0, 100) + "..."}</p>
                  <div className="comments-section mt-4">
                    <h4>Comments</h4>
                    {comments[post.id]?.length > 0 ? (
                      comments[post.id].map(comment => (
                        <div key={comment.id} className="comment mb-2">
                          <p><strong>{comment.username}</strong> ({new Date(comment.created_at).toLocaleDateString()}): {comment.content}</p>
                        </div>
                      ))
                    ) : (
                      <p>No comments yet.</p>
                    )}
                    {errors[post.id] && <div className="alert alert-danger mt-2">{errors[post.id]}</div>}
                    <div className="comment-form mt-3">
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={usernames[post.id] || ""}
                        onChange={(e) => setUsernames({ ...usernames, [post.id]: e.target.value })}
                        placeholder="Your name (max 50 characters)"
                        maxLength={50}
                        disabled={loading[post.id]}
                      />
                      <textarea
                        className="form-control mb-2"
                        value={newComment[post.id] || ""}
                        onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                        placeholder="Add a comment (max 500 characters)"
                        maxLength={500}
                        disabled={loading[post.id]}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => handleCommentSubmit(post.id)}
                        disabled={loading[post.id] || !newComment[post.id]?.trim() || !usernames[post.id]?.trim()}
                      >
                        {loading[post.id] ? "Posting..." : "Post Comment"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="pagination mt-5 d-flex justify-content-center">
        {currentPage > 1 && (
          <button
            className="btn btn-primary me-2"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        <span className="align-self-center mx-3">
          Page {currentPage} of {totalPages} (Total posts: {total})
        </span>
        {currentPage < totalPages && (
          <button
            className="btn btn-primary ms-2"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogContentComp;