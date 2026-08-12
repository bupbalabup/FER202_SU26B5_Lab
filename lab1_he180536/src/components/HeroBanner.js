import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function HeroBanner() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <div className='bg-secondary container-fluid d-flex justify-content-center'>
                    <img src='/images/banner1.jpg' height='500' className='img-fluid' alt='Summer sale banner' />
                </div>
                <Carousel.Caption>
                    <h3><i>SUMMER SALE UP TO 50%</i></h3>
                    <p>Secondary description line.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className='bg-secondary container-fluid d-flex justify-content-center'>
                    <img src='/images/banner2.jpg' height='500' className='img-fluid' alt='Summer sale banner' />
                </div>
                <Carousel.Caption>
                    <h3><i>SUMMER SALE UP TO 50%</i></h3>
                    <p>Secondary description line.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className='bg-secondary container-fluid d-flex justify-content-center'>
                    <img src='/images/banner3.jpg' height='500' className='img-fluid' alt='Summer sale banner' />
                </div>
                <Carousel.Caption>
                    <h3><i>SUMMER SALE UP TO 50%</i></h3>
                    <p>Secondary description line.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default HeroBanner;
