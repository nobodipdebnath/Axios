import React from 'react';

const User = ({user}) => {
    const {id, userId, body, title} = user;
    return (
        <div>
            <h1>id: {id}</h1>
            <h2>user id : {userId}</h2>
            <h3>{title}</h3>
            <h4>{body}</h4>
        </div>
    );
};

export default User;