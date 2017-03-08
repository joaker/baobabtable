import './index.scss';
import Section from 'components/Section';
import Card from 'components/Card';

export const Intro = () => (
			<Section id="intro">
				<Card>
				<blockquote>
					<p>When a ripe fruit sees an honest man, it drops</p>
          <cite>Nigerian Proverb</cite>
				</blockquote>
				</Card>
				<Card>
					<p>With an emphasis on sourcing from local farms and cuisine highlighted by seasonal <br/>ingredients, Executive Chef/Partner <a href="giuseppe-tentori.html">Giuseppe Tentori</a> has curated a meat-centric menu <br/>indicative of his signature sharable plates at sister restaurant, <a href="http://www.gtoyster.com" target="_blank">GT Fish &amp; Oyster</a>.</p>
					<p>Indulge. Imbibe. Explore.</p>
					<p><a href="giuseppe-tentori.html">Giuseppe Tentori</a></p>
				</Card>
			</Section>
);
export default Intro;
