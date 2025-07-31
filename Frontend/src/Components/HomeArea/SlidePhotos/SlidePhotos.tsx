import React, { useState } from 'react';
import photo1 from "../../../Assets/Images/HomePagePhotos/photo-1.jpeg";
import photo2 from "../../../Assets/Images/HomePagePhotos/photo-2.jpeg";
import photo3 from "../../../Assets/Images/HomePagePhotos/photo-3.jpeg";
import photo4 from "../../../Assets/Images/HomePagePhotos/photo-4.jpeg";
import './SlidePhotos.css';

const images = [photo1, photo2, photo3, photo4];

function SlidePhotos(): JSX.Element {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    // Function to show the next image
    const nextImage = () => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };
  
    // Function to show the previous image
    const prevImage = () => {
      setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    };
  
    return (
      <div className="SlidePhotos">
        
        {/* Container for displaying the current image */}
        <div className="image-container">
          <img className="slide-photo" src={images[currentImageIndex]} alt="Slideshow" />
        </div>

        <button onClick={prevImage} className="slide-button prev-button">
          &lt;
        </button>

        <button onClick={nextImage} className="slide-button next-button">
          &gt;
        </button>
      </div>
    );
}

export default SlidePhotos;
