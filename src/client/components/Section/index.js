import './index.scss';
import Nav from 'components/Nav'

export const Section = ({id, className="", fullHeight=true, children}) => (
			<section id={id} className={cnames(className, "section", { fullHeight, "full-height": fullHeight,})}>
        <Nav fixed={false} hidden={true} className="buffer"/>
				<div className="section-content-frame">
          <div className="section-content">
            {children}
          </div>
				</div>
			</section>
);
export default Section;
