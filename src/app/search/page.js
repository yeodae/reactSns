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
      
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMjZfMjQ5%2FMDAxNjc3MzkwNDU1NTkw.JT1UIFHDBBfgGBf6HLARzIODmvTC8iLXU_p7XnOxPdgg.zhZro-nZNdIFUHspyvR7oZAbgrSYq9s1vtdXZdLJcL4g.JPEG.jaewonth90%2FIMG_1041.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA2MDRfMjIg%2FMDAxNjg1ODA1MjI4MDU4.MzJQy_bSFqMq4x5r_QIJ-z03LdVwaIXFF4mJ1mnO--Mg.ollmmMlUGE3Jw5imbZV1eUf9ES8Sh2KQtJjrVW0y5AIg.JPEG.wkddkwls8036%2FIMG_4752.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA2MjhfNTMg%2FMDAxNjg3OTA1MTQxNjg5.ORrHZ2LPSq1q-7FcY0zSTcK7g9toJfisVpSCYsK1u6cg.UX1ZP-kdgPbZOo7TBBuLfOl-Ng79QWErzta6oMpN2B4g.JPEG.whxofo1000%2F4.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MjBfMjE3%2FMDAxNjg5ODE2NDIxMjUy.umoEQxoXYF56yBHf1hEO72bH0CoyhjlVGkz7BAcMBpAg.w-S_WOnMvcL0GRqyIl2qFZF2aNKc5fm2WTs0nzN2gtog.PNG.china2712%2F20230720_102629.png&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fimage.nmv.naver.net%2Fblog_2023_04_05_1664%2Ff54718c3-d38d-11ed-9bb4-505dac8c3607_01.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MjVfMTM1%2FMDAxNjY0MTA3MTA1MjM4.KB39_Tyo6otLMVSZ37CgkyTniouWueZjHAnoGke9lfog.-dPX_PuFjFETpqWUssZBAHP_zTzjoKzgnTdMwbHanj8g.JPEG.dewysoul%2FIMG_7800.JPG&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEwMDVfMTgg%2FMDAxNjY0OTY2NTg3OTgz.UR8KlLAtZh7zld8HCXoKjX-ZFWSaifyosDztmif_xQIg.99y0PxBh15PUuUlXBlVoUJeLvjaHNI4RmWSLo3Us-LIg.JPEG.dasom_plaza%2FKakaoTalk_20221005_144921333_07.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMTlfMTAw%2FMDAxNjc0MTE1Njg1ODQz.UROqj7Fe5AEljpmrZEEZ2DwHk-y8W3YogaiTizODYY8g.-1xc543NG5us0Y2K-j2cz0HLijZRJbGPVMMCbOl2en4g.JPEG.emandoo1221%2FIMG_1518.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTZfMTQ5%2FMDAxNjc4OTc4NjUyOTc0.U4gpq8HyVe5Nu8ZNnz6nS5tUXNi3OefIX4_pH23-ayYg.DHuFSHyj4lSi18Mg7XH3iXIu2n8QGzP6WNDsgN-HrNgg.JPEG.sunny2251%2FIMG_4387.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMDlfMjE2%2FMDAxNjc4MzY1MDI0Mjcy.PEASOMsPXkg9KTag9ilGjrOBwnLbPHhVaNkEp_8XPZYg.TQziLVmKa6GG85AFu-AtSEVBt-aVjLJuInrmVolxoqsg.JPEG.tnals289%2FIMG_2436.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MTZfNDgg%2FMDAxNjg0MjQxODkxNjQ3.SVRxoYtzLLK1QfFhpyG0DTLmfYKCoGW37SQYT2FlHhUg.ncVl8Ugs-1uw65bw12yxBuW0j4rumjJRtJXc1cd1jGkg.JPEG.baekhogamja%2FKakaoTalk_20230516_215348287_11.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMDNfMTk2%2FMDAxNjcwMDQyNTI2NjY4.c93DX_YMTgJq1gvvY8i9xVOCN3FQompJotsfP10euBwg.YUp-me2EdNJsdm_R4CdR6NRJJs_bn2-1H2leOW_2Qd8g.JPEG.timing1223%2FIMG_5314.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEwMDJfMTQ0%2FMDAxNjY0Njk4NjAwNjg5.R2_YkSb1dR6P-vb0LMlM8tyulULshDrO09k-e3QWhaUg.vLlvGYGCbhbq1tRL_3C-i47woVbcnzZ5UemNtTLlhRwg.JPEG.chyiyu%2F20221001%25A3%25DF143912.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMDFfMzQg%2FMDAxNjY5ODcyNTMxNzA1.IbDGsJLzP8UUy3YaedOl0ZqEiqF3df7hb2T7_fBV51Ag.xaYUboW2gkuhitlJTF4IjRoOq3ofrtCDJhCxvnD7RyAg.JPEG.laz4_4%2FKakaoTalk_20221201_134925051_17.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MDFfMTA0%2FMDAxNjgyOTQ0MDc4NTgx.aFIHZvyewTL9bJHwda7hEoLIqY_M6HNRPSBFWL9yzzgg.-TcgERNyOzG_pBzwyoHPouwfwtb0psIOGqc9O_iWyPkg.JPEG.seosoda%2FKakaoTalk_20230501_210009615_15.jpg&type=a340',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA2MDZfMTk5%2FMDAxNjg1OTg4NjY0Nzg0.7lnEo-DXvq-l_YEJdlE-iEwQ6eUKM12WqZqNLZZJUBwg.p6QZYAns-M9YCfrNl0ohTkjaaZjEK4fJMTqn2dnU5J0g.JPEG.loveha256%2FKakaoTalk_20230408_230520459_08.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MDlfMjAz%2FMDAxNjg4ODkxMjY1Mzgy.TS6uKG7aQspwcCDCJ5sXlf_z8uxeBPYeq7FDtIH6q00g.WHiVTOqJss5Wp9tx_3gAdk0T5J9n5A0oDcp8gEKvQ3Eg.JPEG.ijs960529%2FIMG_9824.JPG&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTZfMyAg%2FMDAxNjc2NTUwODYxMjU4.n8LF90e21p4JiYiJ26lvXqQMTh4bKMk6ix1Ulnp68Hgg.RR1H19R0WdKLyok7r1cvNVLGLKwR0T57wcqPElB7AdAg.JPEG.monge0264%2FIMG_1729.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MDNfNzcg%2FMDAxNjg4Mzg3MDYwMjIz.yIytn_-vBRc3NLfLuBSwLp4IgN9XIWi-O2uqvVkaeNsg.oQtMKpdPvAPV2igeLJwpqIjAWAhoeUK4T6pk4sYOyDYg.JPEG.dhrkfl88%2F20230703%25A3%25DF184145.jpg&type=sc960_832',
  
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
        <h3>Search for Anything!</h3>
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