import React from 'react';

const FeaturesIdeas = ({ ideas }) => {
  return (
    <div>
      <ul>
        {ideas.map((idea, index) => (
          <li key={index}>{idea.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturesIdeas;