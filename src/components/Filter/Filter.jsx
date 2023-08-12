import PropTypes from 'prop-types';

export const Filter = ({ value, onSearch }) => (
  <label>
    Find contacts by name
    <input type="text" value={value} onChange={onSearch} />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
