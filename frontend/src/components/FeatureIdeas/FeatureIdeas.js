import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-time-ago';
import './feature-ideas.css';
import ReactTimeAgo from 'react-time-ago';

const FeaturesIdeas = ({ ideas }) => {
  return (
    <div className="features-ideas">
      {ideas.map((idea) => {
        const filteredTags = idea.tags.filter(tag => tag !== null);
        return (
          <div key={idea.id} className="idea-container">
            {/* Link each idea title to the post page */}
            <Link to={`/post-page/${idea.id}`} className="idea-title">{idea.title}</Link>
            <div className="tags-container">
              {filteredTags.map((tag, tagIndex) => (
                <div key={tagIndex} className="tag">
                  {tag}
                </div>
              ))}
            </div>
            <div className="author-container">
              <img
                src={`https://data.thesisfinder.com/profilepicture/${idea.author}`}
                alt={`${idea.author}'s profile`}
                className="author-image"
              />
              <p className="author">{idea.author}</p>
            </div>
            {/* Pass the locale identifier string directly to TimeAgo component */}
            <p className="date">Date: <ReactTimeAgo date={idea.date_posted} locale="en-US"/></p>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesIdeas;
