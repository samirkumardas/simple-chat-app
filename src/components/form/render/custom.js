import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTags from 'react-tag-autocomplete';
import styles from './custom.css';

class CustomSelect extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.state = {
            tags: [],
            suggestions: []
        };
    }

    componentDidMount() {
        const {tags, suggestions} = this.props;
        this.setState({tags, suggestions});
    }

    componentDidUpdate() {
        this.props.input.onChange(this.state.tags);
    }

    handleDelete (i) {
        const tags = this.state.tags.slice(0);
        tags.splice(i, 1);
        this.setState({ tags });
    }

    handleAddition (tag) {
        let tags = this.state.tags,
            isFound = false;
        
        tags.forEach((item) => {
            if (item.id == tag.id) {
                isFound =true;
            }
        });
        if (!isFound) {
            tags = tags.concat(tag);
        }
        this.setState({ tags });
    }
   
    render() {
        const classNames = {
              root: styles['react-tags'],
              rootFocused: styles['is-focused'],
              selected: styles['react-tags__selected'],
              selectedTag: styles['react-tags__selected-tag'],
              selectedTagName: styles['react-tags__selected-tag-name'],
              search: styles['react-tags__search'],
              searchInput: styles['react-tags__search-input'],
              suggestions: styles['react-tags__suggestions'],
              suggestionActive: styles['is-active'],
              suggestionDisabled: styles['is-disabled']
         };

         return (
             <div className="form-group">
                <label>{this.props.label}</label>
                <div>
                  <ReactTags
                    classNames = {classNames}
                    placeholder = {this.props.placeholder}
                    tags = {this.state.tags}
                    autofocus={false}
                    suggestions = {this.state.suggestions}
                    handleDelete = {this.handleDelete.bind(this)}
                    handleAddition = {this.handleAddition.bind(this)}
                  />
                </div>
            </div>
         );
    }
}

CustomSelect.defaultProps = {
  tags: [],
  placeholder: 'Type to add member',
  suggestions: []
};

CustomSelect.propTypes = {
    suggestions: PropTypes.array,
    tags: PropTypes.array,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    input: PropTypes.object
};

export default CustomSelect;