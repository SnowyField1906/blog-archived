import { dayjs } from '@/components/DayJS'

function TimeTag({ title, description, isPresent, date, icon }) {
    const birthday = dayjs('2003/12/18')

    const getDate = () => {
        return dayjs(date).format('MMMM DD, YYYY')
    }

    const getAge = (withMonth) => {
        const age = dayjs(date).diff(birthday, 'year')

        if (withMonth) {
            const month = dayjs(date).diff(birthday, 'month') % 12
            return `${age} years old and ${month} months`
        }

        return `${age} years old`
    }

    return (
        <li className="mb-4 ml-8 rounded-md border border-gray-100 bg-white  px-4  py-4 shadow-sm shadow-gray-300 dark:border-zinc-900 dark:bg-zinc-900 dark:shadow-none">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-200 ring-8 ring-white dark:bg-purple-900 dark:ring-gray-900">
                {icon}
            </span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {title}
                {isPresent && (
                    <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        Present
                    </span>
                )}
            </h3>
            <div className='my-4 flex flex-row items-center justify-between text-sm font-normal leading-none text-gray-600 dark:text-gray-400'>
                <time className="">
                    {getDate()}
                </time>
                <time className='block md:hidden'>
                    {getAge()}
                </time>
                <time className='md:block hidden'>
                    {getAge(true)}
                </time>
            </div>

            <p className="mt-1 text-sm font-normal text-gray-700 dark:text-gray-300">
                {description}
            </p>
        </li>
    )
}

export default TimeTag
