var React = require('react'),
    assert = require('assert'),
		TestUtils = require('react-addons-test-utils'),
		_ = require('lodash'),
    reducer = require('reducers/stream').default,
		actions = require('actions/stream')
    ;

var baseState = {
	posts: [],
};
var state = {};

const first = { message: 'first post!', id: 1, timestamp: 42 };
const updated = { message: 'updated first post!', id: 1, timestamp: 42 };

describe('stream reducer', function(){
	beforeEach('reset the state', function(){
		state=Object.assign({}, baseState);
	});

  it('should add message', function() {
		const expected = Object.assign({},state,{
			posts: [first],
		});
		const action = actions.addMessage(first.message, first.id, first.timestamp);
		const next = reducer(state, action);
		assert.deepEqual(expected, next);
  });

  it('should update the text', function() {
		const expected = Object.assign({},state,{
			posts: [updated],
		});

		state = Object.assign({},state,{
			posts: [first],
		});

		const action = actions.setMessage(updated.message, first.id);
		const next = reducer(state, action);
		assert.deepEqual(expected, next);
  });

	it('should remove a message', function() {
		const expected = Object.assign({},state,{
			posts: [],
		});

		state = Object.assign({},state,{
			posts: [first],
		});

		const action = actions.removeMessage(first.id);
		const next = reducer(state, action);
		assert.deepEqual(expected, next);  });
});
