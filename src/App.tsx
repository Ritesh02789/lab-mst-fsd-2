import { useState } from "react";
import "./index.css";

function App() {
  const [platform, setPlatform] = useState("Twitter / X");
  const [content, setContent] = useState("");
  const [drafts, setDrafts] = useState([]);

  const characterCount = content.length;
  const limit = 280;

  const isEmpty = content.trim() === "";
  const isExceeded = characterCount > limit;

  const saveDraft = () => {
    if (isEmpty || isExceeded) return;

    const newDraft = {
      platform: platform,
      content: content,
    };

    setDrafts([...drafts, newDraft]);
    setContent("");
  };

  return (
    <div className="app">
      <h1>Post Composer</h1>

      <p className="subtitle">
        Compose, validate, and manage drafts across platforms.
      </p>

      <div className="card">
        <h2>Compose Post</h2>

        <label>Platform</label>

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Twitter / X</option>
          <option>Instagram</option>
          <option>LinkedIn</option>
        </select>

        <label>Content</label>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
          rows="7"
        />

        <div className="counter">
          {characterCount} / {limit} characters
        </div>

        {isEmpty && (
          <p className="error">
            Post content cannot be empty
          </p>
        )}

        {isExceeded && (
          <p className="error">
            Limit exceeded
          </p>
        )}

        <button
          onClick={saveDraft}
          disabled={isEmpty || isExceeded}
        >
          Save Draft
        </button>
      </div>

      <div className="drafts">
        <h2>Saved Drafts</h2>

        {drafts.length === 0 ? (
          <p>
            No drafts yet. Compose a post and save it above.
          </p>
        ) : (
          drafts.map((draft, index) => (
            <div className="draft" key={index}>
              <strong>{draft.platform}</strong>
              <p>{draft.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;