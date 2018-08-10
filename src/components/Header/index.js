import React from 'react'
const { siteTitle } = CONFIG

const liStyle = {
  display: 'inline-block',
}

const btnStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
}

const Header = ({ theme, aboutAction, newPuzzleAction, showSolutionAction, makeEasyAction}) => {
  const themedBtnStyle = Object.assign({}, btnStyle, { fontSize: theme.textSize, color: theme.textColor})
  return (
    <header style={{ color: theme.textColor }}>
      <h1 style={{ fontWeight: 900 }}>{ siteTitle }</h1>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', padding: 0 }}>
        <li style={liStyle} >
          <button style={themedBtnStyle} onClick={aboutAction} >
            About
          </button>
        </li>
        <li style={liStyle} >
          <button style={themedBtnStyle} onClick={showSolutionAction}>
            Show Solution
          </button>
        </li>
        <li>
        <button style={themedBtnStyle} onClick={makeEasyAction}>
            Make Easy
          </button>
         </li>
        <li style={liStyle} >
          <button style={themedBtnStyle} onClick={newPuzzleAction}>
            New Puzzle
          </button>
        </li>
      </ul>
    </header>
  )
}

export default Header
