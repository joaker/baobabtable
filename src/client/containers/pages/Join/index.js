import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

import './index.scss';
import Section from 'components/Section';
import Card from 'components/Card';

const register = (e) => {
	const {value: name} = document.getElementById('name');
	const {value: email} = document.getElementById('email');
	const {value: description} = document.getElementById('description');

	const payload = {name, email, description};

	e.preventDefault();

	return fetch("/register", {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(payload),
	}).then(() => {
		console.log('registration complete');
		const form = document.getElementById('registrationForm');
		form.innerHTML = '<div className="mui--z3"><div className="mui--text-headline">We\'ll let you know, thanks.</div></div>';
	}).catch(e => {
		console.log(e);
	});
}

const hints = {} || {
	name: "Guybrush Threepwood",
	email: "ufightlike@cow.org",
	intro: "What is your quest?"
};

export const Join = () => (
			<Section id="join">
				<Card>
				<h1 className="noselect">
					Join the Table
				</h1>
				</Card>
				<Card className="fields">
					<form id="registrationForm" action="/Submitted" method="get">
						<div><Input id="name"  type="text" label="name" hint={hints.name} floatingLabel={true} required={true} /></div>
						<div><Input id="email" type="email" label="email" hint={hints.email} floatingLabel={true} required={true} /></div>
						<div><Textarea id="description" rows="8" label="introduction" hint={hints.intro} floatingLabel={true} required={true} /></div>
						<Button type="submit" onClick={(e) => register(e)}>Apply for membership</Button>
					</form>
				</Card>
			</Section>
);
export default Join;
