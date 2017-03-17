import './index.scss';
import Section from 'components/Section';
import Card from 'components/Card';
import ImageTile from 'components/ImageTile';


const defaultSources = [
	'https://abujachef.files.wordpress.com/2016/06/nd75414-1.jpg?w=2400&h=1600&crop=1',
	'https://abujachef.files.wordpress.com/2016/03/img_3321.jpg?w=2400&h=1600&crop=1',
	'https://abujachef.files.wordpress.com/2016/03/omidooteraseerchika-736.jpg?w=1172&h=780&crop=1',
	'https://abujachef.files.wordpress.com/2016/03/img_2809.jpg?w=1172&h=780&crop=1',
];

const generateTile = (sources) => {
	const tiles = [];
	for(let i = 0; i < 10; i++){
		const srcIndex = i % sources.length;
		const src = sources[srcIndex];
		console.log(`sourcing: ${src}`);
		tiles.push(<ImageTile href="/Menu" src={src} key={i}/>);
	}
	return tiles;
}


export const GalleryTiles = ({sources=defaultSources}) => {
	const tiles = generateTile(sources);
	return (
			<Section id="gallery">
				<Card>
					<div className="tiles">
						{tiles}
					</div>
				</Card>
			</Section>
)};

export class Gallery extends React.PureComponent {
	constructor(props) {
    super(props);
    this.state = {sources: []};
		this.set = this.setState;
  }
	componentDidMount() {
		let that = this;
		fetch('/tiles').then(res => res.json()).then(posts => {
			const urls = posts.map(p => {
				const postURL = p.images.standard_resolution.url;
				return postURL;
			});
			that.setState({sources: urls});
		});
	}
	render() {
		return (
			<GalleryTiles sources={this.state.sources}/>
		);
	}
}

export default Gallery;
