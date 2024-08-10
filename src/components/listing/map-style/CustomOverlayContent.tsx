import { Property } from "@/module/property/Property";
import Link from "next/link";

// CustomOverlayContent.tsx
interface CustomOverlayContentProps {
    property: Property;
    onClose: () => void;
  }
  
  const CustomOverlayContent: React.FC<CustomOverlayContentProps> = ({ property, onClose }) => (
    <div className="overlay-wrap">
      <div className="overlay-info">
        <div className="overlay-title">
        <Link href={`/single-v5/${property.id}?rletTpNm=${property.rletTpNm}`}>
          {property.atclNm}</Link>
          <div className="overlay-close" onClick={onClose} title="닫기">X</div>
        </div>
        <div className="overlay-body">
          <div className="overlay-desc">
            <div className="overlay-ellipsis">{property.address}</div>
            <div className="overlay-price">{property.prc.toLocaleString()} 만원</div>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default CustomOverlayContent;