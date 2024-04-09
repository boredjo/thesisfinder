import React from 'react';
import { Link } from 'react-router-dom';
import './feature-ideas.css';

const FeaturesIdeas = ({ ideas }) => {
  return (
    <div className="features-ideas">
      {ideas.map((idea) => (
        <div key={idea.id} className="idea-container">
          {/* Link each idea title to the post page */}
          <Link to={`/post-page/${idea.id}`} className="idea-title">{idea.title}</Link>
          <div className="tags-container">
            {idea.tags.map((tag, tagIndex) => (
              <div key={tagIndex} className="tag">
                {tag}
              </div>
            ))}
          </div>
          <p className="date">Date Posted: {idea.date}</p>
          <div className="author-container">
            <img
              src={idea.authorImage}
              alt={`${idea.author}'s profile`}
              className="author-image"
            />
            <p className="author">{idea.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesIdeas;
