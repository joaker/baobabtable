import './index.scss';
import Section from 'components/Section';
import Card from 'components/Card';
import ImageTile from 'components/ImageTile';


const tiles = [];

const srcs = [
	'https://abujachef.files.wordpress.com/2016/06/nd75414-1.jpg?w=2400&h=1600&crop=1',
	'https://abujachef.files.wordpress.com/2016/03/img_3321.jpg?w=2400&h=1600&crop=1',
	'https://abujachef.files.wordpress.com/2016/03/omidooteraseerchika-736.jpg?w=1172&h=780&crop=1',
	'https://abujachef.files.wordpress.com/2016/03/img_2809.jpg?w=1172&h=780&crop=1',
];

for(let i = 0; i < 10; i++){
	const srcIndex = i % srcs.length;
	const src = srcs[srcIndex];
	console.log(`sourcing: ${src}`);
	tiles.push(<ImageTile href="/Menu" src={src} key={i}/>)
}


export const Gallery = () => (
			<Section id="gallery">
				<Card>
					<div className="tiles">
						{tiles}
					</div>
				</Card>
			</Section>
);
export default Gallery;
