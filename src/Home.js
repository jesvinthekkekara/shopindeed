import React from 'react'
import './Home.css';
import Product from './Product';


function Home() {
    return (
        <div className="home">
            <div className="home_container">

                <img className="home_image"
                src="https://images-na.ssl-images-amazon.com/images/G/01/adlp/builder/BFF-V1-01-Hero-D-6bababd9-ff42-407e-8e71-b6b0012e8def._CB417386616_QL85_V1_.jpg" 
                alt=""/>

                <div className="home_row">
                    <Product  id="331" title="Amazon.com Best Sellers: The most popular items on Amazon" price={129.99} image="https://images-na.ssl-images-amazon.com/images/I/6182S7MYC2L._AC_UL320_SR320,320_.jpg" rating={5}/>
                    <Product  id="31" title="M.S ZONE Women's Tote Bag (MS14_Orange)" price={23.99} image="https://images-na.ssl-images-amazon.com/images/I/71thlhJWxCL._UL1500_.jpg" rating={3}/>
                    

                </div>
                <div className="home_row">
                <Product  id="331" title="The Hobbit - J. R. R. Tolkien; | Foyles Bookstore" price={29.99} image="https://cdn.lifehack.org/wp-content/uploads/2015/03/Hobbit_book.jpg" rating={5}/>
                <Product id="31" title="Best Amazon Products For People in Their 20s | POPSUGAR Smart Living" price={23.99} image="https://media1.popsugar-assets.com/files/thumbor/6ZqLkmM1DNMGsMxENI4ds4Q1Lmc/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2021/04/19/914/n/1922441/19f1990d607dee79160ef0.14739303_/i/Best-Amazon-Products-People-20s.jpg" rating={3}/>
                <Product  id="155" title="Coolest Amazon Products Found on TikTok | POPSUGAR Smart Living" price={29.99} image="https://media1.popsugar-assets.com/files/thumbor/47N3p1J43psDzcBFYHAv-hrymB8/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/08/10/123/n/1922441/6e99c5815f31faf3e16fc4.15276199_/i/coolest-amazon-products-found-on-tiktok-2020.jpg" rating={5}/>

                </div>
                <div className="home_row">
                <Product  id="10" title="Samsung 108 cSamsung 108 cm (43 Inches) Wondertainment Series Full HD LED Smart TV UA43TE50AAKXXL (Titan Gray) (2020 model)m (43 Inches) Wondertainment Series Full HD LED Smart TV UA43TE50AAKXXL (Titan Gray) (2020 model)" price={129.99} image="https://images.samsung.com/is/image/samsung/p6pim/in/ua50aue60aklxl/gallery/in-uhd-4k-tv-ua50aue60aklxl-front--gray-436230182?$720_576_PNG$" rating={4}/>

                </div>

            </div>
        </div>
    )
}

export default Home
