import * as types from "constants/action-types";
import * as gallery from "./gallery.js";
import createActionMap from "util/createActionMap";

export default createActionMap({
	[types.setTiles]: gallery.setTiles,
	[types.selectTile]: gallery.selectTile,

});
