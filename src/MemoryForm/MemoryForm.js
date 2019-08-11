import React, { Component } from 'react';
import './MemoryForm.css';

export default class MemoryForm extends Component {
  render() {
    const { className, ...otherProps } =this.props
    return (
      <form
        className={['Memory-form', className].join(' ')}
        action='#'
        {...otherProps}
      />
    )
  }
}

