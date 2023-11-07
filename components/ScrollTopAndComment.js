import { useEffect, useState } from 'react'
import { ClapButton } from '@lyket/react'
import ScrollTop from '@/components/ScrollTop'

const ScrollTopAndComment = () => {
  return (
    <>
      <div className={`fixed right-8 bottom-8 flex flex-col gap-6`}></div>
      <ScrollTop />
    </>
  )
}

export default ScrollTopAndComment
