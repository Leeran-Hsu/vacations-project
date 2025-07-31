import About from '../About/About';
import SlidePhotos from '../SlidePhotos/SlidePhotos';

function Home(): JSX.Element {

  return (
    <div className="Home">
        <SlidePhotos/>
        <About/>
    </div>
  );
}

export default Home;
