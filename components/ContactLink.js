const ContactLink = ({ title, href, icon }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <li className="mr-2 inline cursor-pointer text-4xl transition-colors duration-200 ease-in hover:text-gray-400 sm:text-6xl md:text-5xl lg:text-6xl">
        <span className="transition-colors duration-200 ease-in hover:text-primary-500 dark:hover:text-primary-400">
          {icon}
        </span>
        <span className="font-light opacity-50">@</span>
        <a className="font-mono transition-colors  duration-200 ease-in hover:text-gray-500 ">
          {title}
        </a>
      </li>
    </a>
  )
}

export default ContactLink
