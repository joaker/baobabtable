var React = require('react'),
    assert = require('assert'),
		TestUtils = require('react-addons-test-utils'),
		_ = require('lodash'),
    reducer = require('reducers/suggestion').default,
		actions = require('actions/suggestion')
    ;

const firstSuggestions = ['@aaa','@aab','@aac'];
const secondSuggestions = ['@aa42a','@aa42b','@aa42c'];

var baseState = {
  suggestions: [...firstSuggestions],
  suggestionIndex: 1,
};
var state = {};

describe.only('suggestion reducer', function(){
	beforeEach('reset the state', function(){
		state=Object.assign({}, baseState);
	});

  it('should change suggestion index', function() {
		const expected = Object.assign({},state,{
      suggestionIndex: 2,
		});
		const action = actions.setSuggestionIndex(expected.suggestionIndex);
		const next = reducer(state, action);
		assert.deepEqual(expected, next);
  });

  it('should set suggestions', function() {
    const expected = Object.assign({},state,{
      suggestions: [...secondSuggestions],
      suggestionIndex: 0,
		});
		const action = actions.setSuggestions(expected.suggestions);

		state = Object.assign({},state,{
			suggestions: [...secondSuggestions],
		});

		const next = reducer(state, action);
		assert.deepEqual(expected, next);
  });

});
