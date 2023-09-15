"use client"
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import Header from '../Header';
import InfiniteScroll from 'react-infinite-scroll-component';
const Container = styled.div`
  padding: 20px;
`;

const SearchBar = styled.input`
  display: block;
  width: 100%;
  padding: 12px 20px;
  margin: 0 0 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 4px;
`;

const GridItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export default function Search(){
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Replace this function with a real API call
  const fetchImages = async () => {
    const newImages = [ 
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140522_96%2F2999c_1400685866270c202X_JPEG%2FIMG_1466.JPG&type=sc960_832',
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20141213_270%2Frbalsdlsp_1418458444436qk1Gb_JPEG%2F1417763768151.jpeg&type=ofullfill340_600_png',
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151029_182%2Fgksdudwkd32_1446119380513e3Klv_JPEG%2FIMG_14050584611756.jpeg&type=sc960_832',
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MTZfMTc4%2FMDAxNjUwMTA3NjQ5MDQ1.Ts7ckXJjN0aHFe4uUqfyM3GtY2fzyWcqbVelw39Uk74g.8BI9uVR1sm-QsfwuE4JaEcWZXDB8YKI1x-UprYzL4b4g.JPEG.0happy1%2FKakaoTalk_20220416_150826482_14.jpg&type=sc960_832',

      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ];

    setImages((prevImages) => [...prevImages, ...newImages]);

    // Set 'hasMore' to false when there are no more images to load
    // setHasMore(false);
  };

  const handleSearch = (event) => {
    console.log('Search:', event.target.value);
    // Implement search functionality here
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <Header/>
      <Container>
        <SearchBar
          type="text"
          placeholder="Search for users or hashtags..."
          onChange={handleSearch}
        />
        <InfiniteScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Grid>
            {images.map((image, index) => (
              <GridItem key={index} src={image} alt="Thumbnail" />
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
      <MenuBar />
    </div>
  )
}