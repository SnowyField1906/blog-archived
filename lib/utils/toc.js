export const bullets = {
  1: {
    class: 'truncate flex pointer-cursor',
    textClass:
      'my-auto hover:underline text-primary-700 dark:text-primary-300 font-bold text-[1rem]',
    bulletClass:
      'font-sans my-auto text-primary-700 dark:text-primary-300 mr-2 font-extrabold text-[1rem]',
    symbol: '✿',
  },
  2: {
    class: 'truncate flex pointer-cursor',
    textClass:
      'my-auto hover:underline text-primary-700 dark:text-primary-300 font-bold text-[1rem]',
    bulletClass:
      'font-sans my-auto text-primary-700 dark:text-primary-300 mr-2 font-extrabold text-[1rem]',
    symbol: '✿',
  },
  3: {
    class: 'truncate flex pointer-cursor pl-4',
    textClass:
      'my-auto hover:underline text-secondary-700 dark:text-secondary-300 font-semibold text-[0.95rem]',
    bulletClass:
      'font-sans my-auto text-secondary-700 dark:text-secondary-300 mr-2 font-bold text-[0.95rem]',
    symbol: '◎',
  },
  4: {
    class: 'truncate flex pointer-cursor pl-8',
    textClass:
      'my-auto hover:underline text-tertiary-600 dark:text-tertiary-400 font-medium text-[0.9rem]',
    bulletClass:
      'font-sans my-auto text-tertiary-600 dark:text-tertiary-400 mr-2 font-semibold text-[0.9rem]',
    symbol: '▣',
  },
  5: {
    class: 'truncate flex pointer-cursor pl-12',
    textClass:
      'my-auto hover:underline text-primary-600 dark:text-primary-400 font-medium text-[0.85rem]',
    bulletClass:
      'font-sans my-auto text-primary-600 dark:text-primary-400 mr-2 font-semibold text-[0.85rem]',
    symbol: '◈',
  },
  5: {
    class: 'truncate flex pointer-cursor pl-12',
    textClass:
      'my-auto hover:underline text-primary-600 dark:text-primary-400 font-medium text-[0.85rem]',
    bulletClass:
      'font-sans my-auto text-primary-600 dark:text-primary-400 mr-2 font-semibold text-[0.85rem]',
    symbol: '◈',
  },
}

export const headingLimit = (depth) => 35 - depth

export const content = ({ value, depth, url }) => {
  let limit = headingLimit(depth)

  return (
    <a className={bullets[depth].class} key={url} href={url}>
      <p className={bullets[depth].bulletClass}>{bullets[depth].symbol}</p>
      <p className={bullets[depth].textClass}>
        {value.length > limit ? value.slice(0, limit) + '...' : value}
      </p>
    </a>
  )
}
