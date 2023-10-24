import { useEffect, useState } from 'react'
import { TbArrowBigTop } from 'react-icons/tb'

const ScrollTop = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    <div className={`fixed right-8 bottom-8 z-20 flex flex-col gap-3`}>
      <button
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
        className="pushable"
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">
          <TbArrowBigTop className="h-5 w-5" />
        </span>
      </button>
    </div>
  )
}

export default ScrollTop
