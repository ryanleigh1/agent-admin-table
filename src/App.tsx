import './App.css';
import TestimonialCard from './components/TestimonialCard/TestimonialCard';
import profilePic from './assets/profile-thumbnail.png'

function App() {
  const userData = {
    imageUrl: profilePic,
    name: 'Sarah Dole',
    handle: '@sarahdole',
    testimonial: `I've been searching for high-quality abstract images for my design projects, and I'm thrilled to have found this platform. The variety and depth of creativity are astounding!`
  };
  return (
    <div className="App">
      <div>
        <TestimonialCard userData={userData}/>
      </div>
    </div>
  );
}

export default App;
