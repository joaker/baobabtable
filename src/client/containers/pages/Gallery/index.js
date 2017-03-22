import './index.scss';
import Section from 'components/Section';
import Card from 'components/Card';
import ImageTile from 'components/ImageTile';
import * as actions from 'actions/gallery';
import {connect} from 'react-redux';
import SelectedTile from '../SelectedTile';

const tileCount = 20;

const defaultSources = [
	'https://abujachef.files.wordpress.com/2016/06/nd75414-1.jpg?w=2400&h=1600&crop=1',
	'https://abujachef.files.wordpress.com/2016/03/img_3321.jpg?w=2400&h=1600&crop=1',
	'https://abujachef.files.wordpress.com/2016/03/omidooteraseerchika-736.jpg?w=1172&h=780&crop=1',
	'https://abujachef.files.wordpress.com/2016/03/img_2809.jpg?w=1172&h=780&crop=1',
];

const generateTile = (sources, action) => {
	const tiles = [];
	for(let i = 0; i < tileCount; i++){
		const srcIndex = i % sources.length;
		const src = sources[srcIndex];
		console.log(`sourcing: ${src}`);
		tiles.push(<ImageTile src={src} key={i} index={i} onClick={action}/>);
	}
	return tiles;
};

const UnselectedTiles = ({tiles, selected}) => {
	const className = selected ? 'tiles-hidden' : 'tiles';
	return (
		<div className={className}>{selected ? '' : tiles}</div>
	);
};

export class RawGallery extends React.PureComponent {
	constructor(props) {
    super(props);
  }
	componentDidMount() {
		this.props.fetchTiles();
	}
	render() {
		const props = this.props;
		const {
			tiles:tileSources=[],
			selected=false,
			selectTile: select = () => {},
			deselectTile: deselect = () => {}
		} = props;
		const tiles = generateTile(tileSources, select);
		return (
				<Section id="gallery">
					<Card>
							<UnselectedTiles tiles={tiles} selected={selected}/>
							{selected ? <SelectedTile/> : null}
					</Card>
				</Section>
	)};
}

const mapState = ({gallery={}}) => {
	const {tiles=[], selected,} = gallery;
	return {
		tiles,
		selected,
	}
}

const mapDispatch = (dispatch) => {
	return {
		fetchTiles: () => dispatch(actions.fetchTiles()),
		selectTile: (id) => dispatch(actions.selectTile(id)),
		deselectTile: (id) => dispatch(actions.deselectTile(id)),
	}
}

export const Gallery = connect(mapState, mapDispatch)(RawGallery)

export default Gallery;
