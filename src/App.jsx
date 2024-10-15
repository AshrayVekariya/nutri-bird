import ByExpert from './view/by-expert/Index';
import NutriBird from './view/nutribird/Index';
import Questions from './view/questions/Index';
import OurFormula from './view/our-formula/Index';
import OurGoal from './view/our-goal/Index';
import Website from './view/website/Index';
import './App.css';
import Demo from './view/demo/demo';

const App = () => {
  return (
    <div className='app'>
      <NutriBird />
      <ByExpert />
      <Questions />
      <OurFormula />
      <OurGoal />
      <Website />
      <Demo />
    </div>
  );
}

export default App;
