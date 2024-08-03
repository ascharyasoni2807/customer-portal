import React, { useEffect, useState } from "react";
import axios from "axios";

import "./PhotoGrid.css";
import { Photo } from "../type";

const PhotoGrid: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const pageNumber = Math.floor(Math.random() * 9) + 1; // Random page number between 1 and 9

      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=9`
        );
        setPhotos(response.data.map((photo: any) => ({ url: photo.url })));
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();

    const interval = setInterval(fetchPhotos, 10000); // Fetch new photos every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo.url}
          alt={`photo-${index}`}
          className="photo-item"
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
