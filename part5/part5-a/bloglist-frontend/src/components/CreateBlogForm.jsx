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
        <div>
          title: <input value={title} onChange={titleOnChange} />
        </div>
        <div>
          author <input type="text" value={author} onChange={authorOnChange} />
        </div>
        <div>
          url <input type="text" value={url} onChange={urlOnChange} />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default CreateBlogForm;
