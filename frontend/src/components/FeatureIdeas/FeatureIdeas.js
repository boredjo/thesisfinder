import React from 'react';
import './feature-ideas.css'

const FeaturesIdeas = ({ ideas }) => {
  return (
    <div>
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
          <p className="author">{idea.author}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesIdeas;
