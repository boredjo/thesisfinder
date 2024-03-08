import React from 'react';

const FeaturesIdeas = ({ ideas }) => {
  return (
    <div>
      <h2>Features Ideas</h2>
      <ul>
        {ideas.map((idea, index) => (
          <li key={index}>{idea.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturesIdeas;