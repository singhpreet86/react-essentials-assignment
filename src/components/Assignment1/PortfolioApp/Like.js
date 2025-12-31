   import { useState } from "react";

   function Like({bio}) {
    const [likes, setLikes] = useState(0);

        return (
            <div className="like-section">
                <button className="like-button" onClick={() => setLikes(likes + 1)}>
                    Like
                </button>
                <span className="like-count">Likes: {likes}</span>
            </div>
        )
    }

    export default Like;
