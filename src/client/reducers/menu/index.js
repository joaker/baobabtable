import * as types from "constants/action-types";
import * as menu from "./menu";
import createActionMap from "util/createActionMap";

export default createActionMap({
	[types.setMenu]: menu.setMenu,
});
