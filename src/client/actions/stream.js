import * as types from 'constants/action-types';
import uuid from 'uuid';
import * as messageActions from './message';

const getTimestamp = (d = new Date()) => d.getTime();

export const removeMessage = (id) => ({type: types.removeMessage, id,});
export const setMessage = (value, id) => ({type: types.setMessage, post: {message: value, id},});
export const addMessage = (value, id = uuid.v1(), timestamp = getTimestamp()) => (
  {
    type: types.addMessage,
    message: value,
    id,
    timestamp,
  }
);

export const sendMessage = () => {
  return (dispatch, getState) => {

    const beforeAdd = getState() || {};
    const {message: messageState = {}} = beforeAdd;
    const {text: message = ""} = messageState;
    const id = uuid.v1();

    if(!message) return Promise.resolve(false);

    dispatch(messageActions.setText(""));
    dispatch(messageActions.setToken(""));
    dispatch(messageActions.setCursor(0,0));

    dispatch(addMessage(message, id)); // optimistically add the message
    const payload = {
      message,
      id,
    };


    // post the optimistically added message to the server
    return fetch(`/message/${id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(payload)
      })
      .then((res) => res.json()).then((res) => {
        const {data, success=false} = res;
        const { message = "", id, } = data;
        if(!success) throw Error(`Message post for <${id}> failed: ${message}`);

        dispatch(setMessage(message, id));
      })
      .catch((res) => {
        console.log(res)
        removeMessage(id); // the fetch failed.  Delete the optimistic update
      });
  };
};
