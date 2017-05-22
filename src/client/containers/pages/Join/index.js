import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

import './index.scss';
import Section from 'components/Section';
import Card from 'components/Card';

const register = () => {
	const {value: name} = document.getElementById('name');
	const {value: email} = document.getElementById('email');
	const {value: description} = document.getElementById('description');

	const payload = {name, email, description};


	return fetch("/register", {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(payload),
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
				<p>
					To apply to join the Baobab Table Supper Club, provide your email address and a short introduction.
					If a peanut could kill you, please mention that.  We'll wait for a peanut-free night to invite you.
				</p>
				</Card>
				<Card className="fields">
					<form>
						<div><Input id="name"  type="text" label="name" hint={hints.name} floatingLabel={true} required={true} /></div>
						<div><Input id="email" type="email" label="email" hint={hints.email} floatingLabel={true} required={true} /></div>
						<div><Textarea id="description" rows="8" label="introduction" hint={hints.intro} floatingLabel={true} required={true} /></div>
						<Button type="submit" onClick={() => register()}>Apply for membership</Button>
					</form>
				</Card>
			</Section>
);
export default Join;
