import React from 'react';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import './feature-ideas.css';


const FeaturesIdeas = ({ ideas }) => {
  // Get user's time zone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="features-ideas">
      {ideas.map((idea) => {
        const filteredTags = idea.tags.filter(tag => tag !== null);

        // Convert API date to local time zone and add 4 hours
        const apiDate = new Date(idea.date_posted);
        const userTimeZoneDate = new Date(apiDate.getTime() - 4 * 60 * 60 * 1000); // Adjust for 4-hour discrepancy

        // Format the date in the user's local time zone
        const userLocalDateTimeString = userTimeZoneDate.toLocaleString(undefined, {
          timeZone: userTimeZone,
          timeZoneName: 'short'
        });

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
            {/* Display the date in the user's local time zone */}
            <p className="date">Posted <ReactTimeAgo date={userTimeZoneDate} locale="en-US"/></p>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesIdeas;
