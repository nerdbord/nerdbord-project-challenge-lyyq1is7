import React from "react";
import Image from "next/image";
import paragonnMaly from "../../assets/paragonnMaly.jpg";

const RecentDocumentsImage = () => {
  return (
    <div className="recent-document-img-box">
      <div className="recent-document-img-box-item">
        <Image src={paragonnMaly} alt="Paragon" width={85.68} height={168} />
      </div>
      <div className="recent-document-img-box-item">
        <Image src={paragonnMaly} alt="Paragon" width={85.68} height={168} />
      </div>

    </div>
  );
};

export default RecentDocumentsImage;
