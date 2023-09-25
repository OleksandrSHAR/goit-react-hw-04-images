import { toast } from 'react-hot-toast';
import { useState } from 'react';
import {
  SearcWrap,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Seaechbar.style';
export const Searchbar = ({ SubmitValue }) => {
  const [input, setInput] = useState('');

  const onInput = ({ target }) => {
    setInput(target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (e.target.elements.search.value === '') {
      toast.error('The search field cannot be empty');
      return;
    }
    SubmitValue(e);
  };

  return (
    <SearcWrap>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <span>Search</span>
        </SearchFormButton>

        <SearchFormInput
          onChange={onInput}
          value={input}
          name="search"
          type="text"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearcWrap>
  );
};
