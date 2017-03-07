import './index.scss';
import Section from 'components/Section';
import Card from 'components/Card';
import Strung from 'components/Strung';

export const Welcome = () => (
			<Section id="marquee" className="full-height">
				<Card>
        <h1><Strung value="BaobabTable"/></h1>
        <h3><Strung value="cooking dreams - serving memories"/></h3>
				</Card>
				{
          " " || <p><a href="https://goo.gl/maps/as4PKRZ2dNE2" target="_blank" className="fade">707 N Wells Street &nbsp;|&nbsp; Chicago, IL 60654</a></p>
        }
				{" " || <div className="credits-wrapper">
					<a href="http://www.bokagrp.com" target="_blank" className="brg-logo">
						<div className="brg-symbol"></div>
						<div className="brg-logotype"></div>
					</a>
					<a href="http://www.gripdesign.com" target="_blank" className="grip-link">Site By Grip</a>
				</div>}
			</Section>);

// const unused = (
//   <main>
// 			<section id="mobile-dashboard" className="mobileOnly">
//         <Nav />
// 				{" " || <nav>
// 					<ul>
// 						<li><a href="tel:3126006305">Call Us</a></li>
// 						<li><a href="#reservations">Reserve a Table</a></li>
// 						<li><a href="https://goo.gl/maps/as4PKRZ2dNE2" target="_blank">Get Directions</a></li>
// 						<li><a href="https://gifts.opentable.com/GT-Prime?ref=1" target="_blank">Buy a Gift Card</a></li>
// 						<li><a href="http://www.bokagrp.com" target="_blank">Other BRG Restaurants</a></li>
// 					</ul>
// 				</nav>}
//
// 				<p><a href="https://goo.gl/maps/as4PKRZ2dNE2" target="_blank" className="strike">707 N Wells Street</a></p>
// 				<p><a href="tel:3126006305" className="strike">312.600.6305</a></p>
// 				<p>
// 						    Sunday – Monday 4:30 PM – 10:00 PM
// 							<br/>
// 							Tuesday – Thursday 4:30 PM – 11:00 PM
// 							<br/>
// 							Friday – Saturday 4:30 PM – 12:00 AM
// 				</p>
// 			</section>
//
// 			<section id="about" className="content-wrapper">
// 				<div className="container">
// 					<blockquote>
// 						<p>“Fox, you are the most cunning <br/>of all animals, you shall be <br/>general and lead us.”</p>
// 						<cite><strong>Jacob Grimm</strong>, <br/>Grimm's Fairy Tales</cite>
// 					</blockquote>
// 					<p>With an emphasis on sourcing from local farms and cuisine highlighted by seasonal <br/>ingredients, Executive Chef/Partner <a href="giuseppe-tentori.html">Giuseppe Tentori</a> has curated a meat-centric menu <br/>indicative of his signature sharable plates at sister restaurant, <a href="http://www.gtoyster.com" target="_blank">GT Fish &amp; Oyster</a>.</p>
// 					<p>Indulge. Imbibe. Explore.</p>
// 					<p><a href="giuseppe-tentori.html">Giuseppe Tentori</a></p>
// 				</div>
// 			</section>
//
// 			<section id="tour" className="full-height" >
// 				<h2>A Steakhouse, Redefined <span>From Boka Restaurant Group</span></h2>
// 				<div className="swiper-container full-height swiper-container-horizontal" >
// 					<div className="swiper-wrapper" ><div className="swiper-slide swiper-slide-duplicate swiper-slide-next" data-swiper-slide-index="6" ><img src="img/gtprime-food-4.jpg" alt="GT Prime pasta dish" className="img-fill"  /></div>
// 						<div className="swiper-slide" data-swiper-slide-index="0" ><img src="img/gtprime-interior-1.jpg" alt="GT Prime interior" className="img-fill"  /></div>
// 						<div className="swiper-slide" data-swiper-slide-index="1" ><img src="img/gtprime-interior-2.jpg" alt="GT Prime interior" className="img-fill"  /></div>
// 						<div className="swiper-slide" data-swiper-slide-index="2" ><img src="img/gtprime-food-5.jpg" alt="GT Prime meat dish" className="img-fill"  /></div>
// 						<div className="swiper-slide" data-swiper-slide-index="3" ><img src="img/gtprime-food-2.jpg" alt="GT Prime steak dish" className="img-fill"  /></div>
// 						<div className="swiper-slide" data-swiper-slide-index="4" ><img src="img/gtprime-interior-3.jpg" alt="GT Prime interior" className="img-fill"  /></div>
// 						<div className="swiper-slide" data-swiper-slide-index="5" ><img src="img/gtprime-food-3.jpg" alt="GT Prime side dishes" className="img-fill"  /></div>
// 						<div className="swiper-slide swiper-slide-prev" data-swiper-slide-index="6" ><img src="img/gtprime-food-4.jpg" alt="GT Prime pasta dish" className="img-fill"  /></div>
//
// 					<div className="swiper-slide swiper-slide-duplicate swiper-slide-active" data-swiper-slide-index="0" ><img src="img/gtprime-interior-1.jpg" alt="GT Prime interior" className="img-fill"  /></div></div>
//
// 					<div className="slider-nav">
// 						<a href="#" className="swiper-prev fade"></a>
// 						<a href="#" className="swiper-next fade"></a>
// 					</div>
// 				</div>
// 			</section>
//     </main>
// );
export default Welcome;
