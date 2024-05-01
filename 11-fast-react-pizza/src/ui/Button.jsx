import { Link } from 'react-router-dom'

function Button({ to, disabled, type, size, onClick, children }) {
  const primary =
    'inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wider text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed'

  const secondary =
    'inline-block rounded-full bg-red-300 font-semibold uppercase tracking-wider text-stone-800 transition-colors duration-300 hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed'

  const sizes = {
    md: ' px-4 py-3 md:px-6 md:py-3 text-xs md:text-base',
    xs: ' px-3 py-2 md:px-5 md:py-3 text-xs',
    small: ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
  }

  const styles = {
    primary,
    secondary,
  }

  if (to)
    return (
      <Link to={to} className={[styles[type], sizes[size]]}>
        {children}
      </Link>
    )

  if (onClick)
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={[styles[type], sizes[size]]}
      >
        {children}
      </button>
    )

  return (
    <button disabled={disabled} className={[styles[type], sizes[size]]}>
      {children}
    </button>
  )
}

export default Button
