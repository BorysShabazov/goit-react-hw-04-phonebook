import React, { Component } from 'react';
import { Section } from './Section/Section';
import { PhoneBook } from './PhoneBook/PhoneBook';
import { Contacts } from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const getContacts = JSON.parse(localStorage.getItem('contacts'));

    if (getContacts) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  onInput = evt => {
    evt.preventDefault();

    const inputName = evt.currentTarget.name.value.trim();
    const inputNumber = evt.currentTarget.number.value.trim();

    if (
      this.state.contacts.find(
        el => el.name.toLocaleLowerCase() === inputName.toLocaleLowerCase()
      )
    ) {
      alert(`${inputName} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      const book = {
        name: inputName,
        number: inputNumber,
        contacts: [
          ...prevState.contacts,
          { number: inputNumber, name: inputName, id: nanoid() },
        ],
      };

      localStorage.setItem('contacts', JSON.stringify(book.contacts));

      return book;
    });

    evt.currentTarget.number.value = '';
    evt.currentTarget.name.value = '';
  };

  onSearch = evt => {
    const { value } = evt.currentTarget;
    this.setState({
      filter: value,
    });
  };

  deleteContact = async evt => {
    await this.setState({
      contacts: this.state.contacts.filter(
        contact => contact.id !== evt.currentTarget.id
      ),
    });

    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  render() {
    const normalizeFilter = this.state.filter.toLocaleLowerCase();

    const visibleContacts = this.state.contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(normalizeFilter);
    });

    return (
      <div className="app">
        <Section title="Phonebook">
          <PhoneBook onInput={this.onInput} />
        </Section>

        <Section title="Contacts">
          <Contacts
            contacts={visibleContacts}
            deleteContact={this.deleteContact}
          >
            <Filter onSearch={this.onSearch} value={this.state.filter} />
          </Contacts>
        </Section>
      </div>
    );
  }
}

export default App;
