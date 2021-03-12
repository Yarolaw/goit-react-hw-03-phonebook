import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

const initialData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts);
    contacts === null || parsedContacts.length === 0 ?
      this.setState({ contacts: initialData }) :
      this.setState({contacts : parsedContacts})
  }
  componentDidUpdate(prevProps, prevState) {
  
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  addContact = ({ name, number }) => {
   
    const sameName = this.findSameName(name);
    if (sameName) {
      return alert(`${name} is already in contacts.`);
    }
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    this.setState(({contacts}) => ({
      contacts: [...contacts, newContact],
    }))
  }
  findSameName = name => {
    return this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    )
  }
  changeFilter = e => {
    const f = e.currentTarget.value
    this.setState({ filter: f })
  }
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(lowerCaseFilter) ||
        contact.number.includes(filter),
    )
  }
  deleteContact = id => {
    this.setState(({contacts}) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }))
  }
  
  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App




