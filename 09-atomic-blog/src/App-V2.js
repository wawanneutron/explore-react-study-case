// with Context API
import { useState } from 'react'
import { PostProvider, createRandomPost, usePosts } from './PostContext'

export default function App() {
  return (
    <section>
      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  )
}

function Header() {
  // 3) Consuming context value with usePosts(), usePosts() is a custom hook it's that a useContext
  const { onClearPosts } = usePosts()

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  )
}

function Results() {
  const { posts } = usePosts()

  return <p>🚀 {posts.length} atomic posts found</p>
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts()

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  )
}

function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  )
}

function FormAddPost() {
  const { onAddPost } = usePosts()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !body) return

    onAddPost({ title, body })
    setTitle('')
    setBody('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  )
}

function Posts() {
  const { posts } = usePosts()

  return (
    <section>
      <List posts={posts} />
    </section>
  )
}

function List() {
  const { posts } = usePosts()

  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )
}

function Archive() {
  const { onAddPost } = usePosts()

  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 100 }, () => createRandomPost())
  )

  const [showArchive, setShowArchive] = useState(false)

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? 'Hide archive posts' : 'Show archive posts'}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>
}
