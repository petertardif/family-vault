import React from 'react';
import './Button.css';

export default function Button(props) {
  const { tag, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      ...otherProps
    },
    props.children
  )
}

Button.defaultProps = {
  tag: 'a',
}