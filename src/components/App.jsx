import { Section } from './Section/Section';
import { PhoneBook } from './PhoneBook/PhoneBook';
import { Contacts } from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getContacts = JSON.parse(localStorage.getItem('contacts'));
    if (getContacts) {
      setContacts(JSON.parse(localStorage.getItem('contacts')).contacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length >= 0) {
      localStorage.setItem('contacts', JSON.stringify({ contacts: contacts }));
    }
  }, [contacts]);

  const onInput = evt => {
    evt.preventDefault();

    const inputName = evt.currentTarget.name.value.trim();
    const inputNumber = evt.currentTarget.number.value.trim();

    if (
      contacts.find(
        el => el.name.toLocaleLowerCase() === inputName.toLocaleLowerCase()
      )
    ) {
      alert(`${inputName} is already in contacts.`);
      return;
    }

    setContacts(prevState => {
      const book = {
        contacts: [
          ...prevState,
          { number: inputNumber, name: inputName, id: nanoid() },
        ],
      };

      localStorage.setItem('contacts', JSON.stringify(book));
      return book.contacts;
    });

    evt.currentTarget.number.value = '';
    evt.currentTarget.name.value = '';
  };

  const onSearch = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const deleteContact = evt => {
    setContacts(
      contacts.filter(contact => contact.id !== evt.currentTarget.id)
    );
  };

  const normalizeFilter = filter.toLocaleLowerCase();

  const visibleContacts =
    contacts.length > 0
      ? contacts.filter(contact => {
          return contact.name.toLocaleLowerCase().includes(normalizeFilter);
        })
      : [];

  console.log(contacts);

  return (
    <div className="app">
      <Section title="Phonebook">
        <PhoneBook onInput={onInput} />
      </Section>

      <Section title="Contacts">
        <Contacts contacts={visibleContacts} deleteContact={deleteContact}>
          <Filter onSearch={onSearch} value={filter} />
        </Contacts>
      </Section>
    </div>
  );
};

export default App;

// visibleContacts;
