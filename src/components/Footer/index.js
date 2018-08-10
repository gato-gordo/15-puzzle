import React from 'react'

const Footer = ({ theme }) => (
  <footer style={{ color: theme.textColor, fontSize: theme.textSize }}>
    <p>
      &copy; { new Date().getFullYear() } 
      <a
        style={{
          textDecoration: 'none',
          display: 'inline-block',
          marginLeft: 20,
          color: 'inherit'
        }} 
        href="http://ignacioprado.com" 
        target="_blank" 
        rel="noopener noreferrer">
        Ignacio Prado
      </a>
    </p>
  </footer>
)

export default Footer
