import React from 'react';
import { Link } from 'react-router-dom';
import './feature-ideas.css';

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
            <p className="date">{idea.date_posted}</p> {/* Use date_posted instead of date */}
            <div className="author-container">
              <img
                src={"https://data.thesisfinder.com/profilepicture/" + idea.author}
                alt={`${idea.author}'s profile`}
                className="author-image"
              />
              <p className="author">{idea.author}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesIdeas;
