import * as types from "constants/action-types";
import * as stream from "./stream";
import createActionMap from "util/createActionMap";

export default createActionMap({
	[types.addMessage]: stream.addMessage,
	[types.removeMessage]: stream.removeMessage,
	[types.setMessage]: stream.setMessage,
});
