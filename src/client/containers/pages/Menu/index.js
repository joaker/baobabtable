import './index.scss';
import Section from 'components/Section';
import Card from 'components/Card';
import PageLink from 'components/PageLink';

const fixed = false;
const hidden = false;

export const Menu = ({className}) => (
			<Section id="menu">
				<Card full={true}>
				  <nav id={"menu-card"} data-view-className="views/Navigation" className={cnames("navigation","mobileOnly", "column", className, {fixed, hidden,})}>
				    <div className="container hashRoute">
				      <PageLink name="Welcome"/>
				      <PageLink name="Intro"/>
				      <PageLink name="Gallery"/>
				      <PageLink name="Reservations"/>
				      <PageLink name="Contact"/>
				      <PageLink name="@AbujaChef"/>
				    </div>
				  </nav>
				</Card>
			</Section>
);
export default Menu;
