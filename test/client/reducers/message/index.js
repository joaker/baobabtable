var React = require('react'),
    assert = require('assert'),
		TestUtils = require('react-addons-test-utils'),
		_ = require('lodash'),
    reducer = require('reducers/message').default,
		actions = require('actions/message')
    ;

var baseState = {
	text: 'initial text',
	token: 'initial token',
	tokenType: '', // needs to be a category or falsey
	cursorStart: 0,
	cursorEnd: 0,
};
var state = {};

describe('message reducer', function(){

	beforeEach('reset the state', function(){
		state=Object.assign({}, baseState);
	});

  it('should update the value of a token', function() {
		const expected = Object.assign({},state,{
			token: "@aFancyToken",
			tokenType: 'user',
		});
		const action = actions.setToken(expected.token, expected.tokenType);
		const next = reducer(state, action);
		assert.deepEqual(expected, next);
  });

  it('update the text', function() {
		const expected = Object.assign({},state,{
			text: 'better value'
		});
		const action = actions.setText(expected.text);
		const next = reducer(state, action);
		assert.deepEqual(expected, next);
  });

	it('set the cursor', function() {
		const expected = Object.assign({},state,{
			cursorStart: 42,
			cursorEnd: 99,
		});
		const action = actions.setCursor(expected.cursorStart, expected.cursorEnd);
		const next = reducer(state, action);
		assert.deepEqual(expected, next);
  });
});
