import React, { useState } from 'react';
import '../../../../styles/global.css';
import Collapse from "@kunukn/react-collapse";

function LoadInfo({ duration="290ms" }) {
  const [toggle, setToggle] = useState<boolean>(false)

  const handleClick = () => {
    setToggle(!toggle)
    console.log('toggle click!')
  }

  const info: JSX.Element[] = []
  const features: string[] = ['Lighting', 'Size', 'Texture', 'Color', 'Material']
  features.forEach(feature => {
    info.push(
      <section>
        <button onClick={handleClick}>{`${feature}`}</button>
        <Collapse
          transition={`height ${duration} cubic-bezier(.4, 0, .2, 1)`}
          isOpen={toggle}>
          <p>Yes accordion collapse is working!!!</p>
        </Collapse>
      </section>
    )
  })

  return (
    <div className="toggleBox">
      {info}
    </div>
  )
}

export default LoadInfo