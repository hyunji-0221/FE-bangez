import Image from "next/image";
import Link from "next/link";
import img01 from '../../../../../public/Images/listings/make/1.jpg'; //이미지 하드
import img02 from '../../../../../public/Images/listings/make/2.jpg'; 
import img03 from '../../../../../public/Images/listings/make/3.jpg'; 
import img04 from '../../../../../public/Images/listings/make/4.jpg'; 
import img05 from '../../../../../public/Images/listings/make/5.jpg'; 
import img06 from '../../../../../public/Images/listings/make/6.jpg'; 
import img07 from '../../../../../public/Images/listings/make/7.jpg'; 
import img08 from '../../../../../public/Images/listings/make/8.jpg'; 
import img09 from '../../../../../public/Images/listings/make/9.jpg'; 
import img10 from '../../../../../public/Images/listings/make/10.jpg'; 
import img11 from '../../../../../public/Images/listings/make/11.jpg'; 
import img12 from '../../../../../public/Images/listings/make/12.jpg'; 
import img13 from '../../../../../public/Images/listings/make/13.jpg'; 
import img14 from '../../../../../public/Images/listings/make/14.jpg'; 
import img15 from '../../../../../public/Images/listings/make/15.jpg'; 
import img16 from '../../../../../public/Images/listings/make/16.jpg'; 
import img17 from '../../../../../public/Images/listings/make/17.jpg'; 
import img18 from '../../../../../public/Images/listings/make/18.jpg'; 
import img19 from '../../../../../public/Images/listings/make/19.jpg'; 
import img20 from '../../../../../public/Images/listings/make/20.jpg'; 
import img21 from '../../../../../public/Images/listings/make/21.jpg'; 
import img22 from '../../../../../public/Images/listings/make/22.jpg'; 
import img23 from '../../../../../public/Images/listings/make/23.jpg'; 

// 모든 이미지를 배열에 추가
const images = [
  img01, img02, img03, img04, img05, img06, img07, img08, img09, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23
];

// 랜덤 이미지 선택 함수
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing) => (
        <div className={`${colstyle ? 'col-sm-12 col-lg-6' : 'col-sm-6'}  `} key={listing.id}>
          <div className={colstyle ? "listing-style6 listCustom listing-type" : "listing-style6"}>
            <div className="list-thumb">
              <Image
                width={386}
                height={334}
                className="w-100 cover"
                style={{ height: '334px' }}
                src={getRandomImage()} // 랜덤 이미지를 선택하여 사용
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {!listing.forRent && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    추천 매물
                  </div>
                )}
              </div>
              <div className="list-meta">
              </div>
            </div>
            <div className="list-content">
              <div className="list-price mb-2">{listing.prc}만원</div>
              <h6 className="list-title">
                <Link href={`/single-v5/${listing.id}?rletTpNm=${listing.rletTpNm}`}>{listing.atclNm}</Link>
              </h6>
              <p className="list-text">{listing.town}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;