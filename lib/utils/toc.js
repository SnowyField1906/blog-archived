export const bullets = {
  1: {
    class: 'truncate flex pointer-cursor',
    textClass: 'my-auto hover:underline text-primary-600 font-bold text-[1rem]',
    bulletClass: 'my-auto text-primary-600 mr-2 font-extrabold text-[1rem]',
    symbol: '✿',
  },
  2: {
    class: 'truncate flex pointer-cursor pl-4',
    textClass: 'my-auto hover:underline text-secondary-600 font-semibold text-[0.95rem]',
    bulletClass: 'my-auto text-secondary-600 mr-2 font-bold text-[0.95rem]',
    symbol: '◎',
  },
  3: {
    class: 'truncate flex pointer-cursor pl-8',
    textClass: 'my-auto hover:underline text-tertiary-500 font-medium text-[0.9rem]',
    bulletClass: 'my-auto text-tertiary-500 mr-2 font-semibold text-[0.9rem]',
    symbol: '▣',
  },
  4: {
    class: 'truncate flex pointer-cursor pl-12',
    textClass: 'my-auto hover:underline text-primary-500 font-normal text-[0.85rem]',
    bulletClass: 'my-auto text-primary-500 mr-2 font-medium text-[0.85rem]',
    symbol: '◈',
  },
  5: {
    class: 'truncate flex pointer-cursor pl-16',
    textClass: 'my-auto hover:underline text-secondary-400 font-light text-[0.8rem]',
    bulletClass: 'my-auto text-secondary-400 mr-2 font-normal text-[0.8rem]',
    symbol: '■',
  },
  6: {
    class: 'truncate flex pointer-cursor pl-20',
    textClass: 'my-auto hover:underline text-tertiary-400 font-extralight text-[0.75rem]',
    bulletClass: 'my-auto text-tertiary-400 mr-2 font-light text-[0.75rem]',
    symbol: '◆',
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
