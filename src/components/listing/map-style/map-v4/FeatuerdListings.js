import Image from "next/image";
import Link from "next/link";
import img01 from '../../../../../public/Images/listings/apartment.jpeg'

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
                src={img01} // 임시 이미지 경로 사용
                // src={listing.image}
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {!listing.forRent && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    FEATURED
                  </div>
                )}
              </div>
              <div className="list-meta">
                <div className="icons">
                  <a href="#">
                    <span className="flaticon-like" />
                  </a>
                  <a href="#">
                    <span className="flaticon-new-tab" />
                  </a>
                  <a href="#">
                    <span className="flaticon-fullscreen" />
                  </a>
                </div>
              </div>
            </div>
            <div className="list-content">
              <div className="list-price mb-2">{listing.prc}</div>
              <h6 className="list-title">
                <Link href={`/single-v5/${listing.id}`}>{listing.atclNm}</Link>
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