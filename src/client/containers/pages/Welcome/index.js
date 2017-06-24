import './index.scss';
import Section from 'components/Section';
import Card from 'components/Card';
import Strung from 'components/Strung';

export const Welcome = () => (
			<Section id="marquee" className="full-height">
				<Card>
	        <h1 className="noselect"><Strung value="BaobabTable"/></h1>
	        <h3 className="noselect"><Strung value="cooking dreams - serving memories"/></h3>
				</Card>
			</Section>
		);

export default Welcome;
