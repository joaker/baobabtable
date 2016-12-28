import * as types from "constants/action-types";
import * as message from "./message";
import createActionMap from "util/createActionMap";

export default createActionMap({
	[types.setText]: message.setText,
	[types.setToken]: message.setToken,
	[types.setCursor]: message.setCursor,
});
