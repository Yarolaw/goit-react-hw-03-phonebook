import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css'

class ContactForm extends Component {
        state = {
        name: '',
        number:''
    }

handleInput = e => {
    const { name, value } = e.currentTarget
    this.setState({ [name]: value, })
}
handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({name:'', number: ''})
}
render() {
    const { name, number } = this.state
    
    return (
        <form onSubmit={this.handleSubmit} className={styles.form}>
            <label className={styles.label}>
                Name
                <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={this.handleInput}
                    placeholder='Enter name...'
                >
                </input>
            </label>
            <label className={styles.label}>
                Number
                <input
                    type='text'
                    name='number'
                    value={number}
                    onChange={this.handleInput}
                    placeholder='Enter number...'>
                </input>
            </label >
            <button
                className={styles.button} type='submit'>
                Add a contact
            </button>
        </form>
    )
  }
}
ContactForm.propTypes = {
    onSubmit:PropTypes.func.isRequired
}
export default ContactForm