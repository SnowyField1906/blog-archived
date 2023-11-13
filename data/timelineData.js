import { FaGraduationCap, FaBlackTie } from 'react-icons/fa'
import { AiOutlineCode } from 'react-icons/ai'
import { SiLeetcode } from 'react-icons/si'
import { HiChevronDown, HiOutlineDatabase } from 'react-icons/hi'
import { FaBaby } from 'react-icons/fa'
import { BsBuilding } from 'react-icons/bs'
import { RiDoorClosedLine } from 'react-icons/ri'
import { TbDeviceDesktopAnalytics } from 'react-icons/tb'

const timelineData = [
    {
        title: 'Full-time Artificial Intelligence Researcher',
        description: `Researching on the abiity and application of Artificial Intelligence at LECLE Vietnam`,
        isPresent: true,
        date: '2023/11/05',
        icon: <FaGraduationCap />
    },
    {
        title: 'Knowledge Engineering and Information Security Student in University of Science',
        description: `This major is not welcomed by students in my university but I find it pretty good
        Enrolled with 3.0 / 4.0 Major - GPA`,
        isPresent: true,
        date: '2023/09/25',
        icon: <AiOutlineCode />
    },
    {
        title: '4-Month Part-time Blockchain Developer and Artificial Intelligence Researcher',
        description: `Individual developed and tested Smart Contracts for MamaExchange. Researched on the abiity and application of Artificial Intelligence at LECLE Vietnam`,
        isPresent: false,
        date: '2023/06/05',
        icon: <SiLeetcode />
    },
    {
        title: '4-Month Full-time Blockchain Developer',
        description: `Individual developed and tested Smart Contracts for a DeFi project at LECLE Vietnam`,
        isPresent: false,
        date: '2023/02/05',
        icon: <FaBaby />
    },
    {
        title: '3-Month Part-time Internship Blockchain Developer',
        description: `Applied for Blockchain Developer internship but mainly worked as a Researcher`,
        isPresent: false,
        date: '2022/11/30',
        icon: <BsBuilding />
    },
    {
        title: 'Self-learned Blockchain Development',
        description: `Overcame moments of procrastination and self-doubt to conquer the complexities of Blockchain Development`,
        isPresent: false,
        date: '2022/03/30',
        icon: <RiDoorClosedLine />
    },
    {
        title: '2-Year Introduction Program in University of Science',
        description: `Successfully enrolled in Information Technology at the University of Science with an outstanding national graduation examination score of 27.6/30`,
        isPresent: false,
        date: '2021/09/25',
        icon: <TbDeviceDesktopAnalytics />
    },
]

export default timelineData