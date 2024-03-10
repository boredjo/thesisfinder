// FeaturesIdeas.js
import React from 'react';
import './feature-ideas.css';

const FeaturesIdeas = ({ ideas }) => {
  return (
    <div className="features-ideas">
      {ideas.map((idea, index) => (
        <div key={index} className="idea-container">
          <h3>{idea.title}</h3>
          <div className="tags-container">
            {idea.tags.map((tag, tagIndex) => (
              <div key={tagIndex} className="tag">
                {tag}
              </div>
            ))}
          </div>
          <p className="date">{idea.date}</p>
          <div className="author-container">
            <img
              src={idea.authorImage} // Assuming you've set the image path in the data
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
