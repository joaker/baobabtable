import './index.scss';
import * as pages from '../';
import Main from 'components/Main';
const {Welcome, Intro, Join} = pages;
export const Landing = () => {
  return (
    <Main>
      <Welcome></Welcome>
      <Intro></Intro>
      <Join></Join>
    </Main>
  );
}
export default Landing;
