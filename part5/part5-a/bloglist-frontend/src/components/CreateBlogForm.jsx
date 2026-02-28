import React from "react";

function CreateBlogForm({
  handleBlogCreation,
  url,
  urlOnChange,
  title,
  titleOnChange,
  author,
  authorOnChange,
}) {
  return (
    <div>
      <h1>blog creation</h1>
      <form onSubmit={handleBlogCreation}>
        <label>
          title: <input value={title} onChange={titleOnChange} />
        </label>
        <label>
          author <input type="text" value={author} onChange={authorOnChange} />
        </label>
        <label>
          url <input type="text" value={url} onChange={urlOnChange} />
        </label>

        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default CreateBlogForm;
