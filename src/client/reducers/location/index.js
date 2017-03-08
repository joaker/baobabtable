import * as types from "constants/action-types";
import * as location from "./location.js";
import createActionMap from "util/createActionMap";

export default createActionMap({
	[types.changeLocation]: location.changeLocation,
});
