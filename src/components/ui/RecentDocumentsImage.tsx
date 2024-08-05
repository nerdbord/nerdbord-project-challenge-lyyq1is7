import React from "react";
import Image from "next/image";
import paragonnMaly from "../../assets/paragonnMaly.jpg";

const RecentDocumentsImage = () => {
  return (
    <div className="recent-document-img-box">
      <div className="card card-compact bg-base-100 w-96">
        <figure>
          <Image src={paragonnMaly} alt="Paragon" width={162} height={149} />
        </figure>
        <div className="card-body">
          <div className="card-actions justify-end">
            <span className="recent-document-img-box-item-number-date">
              27.07.2024
            </span>
            <span className="recent-document-img-box-item-number-value">
              150,75 PLN
            </span>
          </div>
        </div>
      </div>
      <div className="card card-compact bg-base-100 shadow-l">
        <figure>
          <Image src={paragonnMaly} alt="Paragon" width={162} height={149} />
        </figure>
        <div className="card-body">
          <div className="card-actions justify-end">
            <span className="recent-document-img-box-item-number-date">
              27.07.2024
            </span>
            <span className="recent-document-img-box-item-number-value">
              150,75 PLN
            </span>
          </div>
        </div>
      </div>

      {/* <div className="recent-document-img-box-item-img-and-box">
        <div className="recent-document-img-box-img-wrapper">
          <Image src={paragonnMaly} alt="Paragon" width={85.68} height={168} />
        </div>

        <div className="recent-document-img-box-number">
          <span className="recent-document-img-box-item-number-date">
            27.07.2024
          </span>
          <span className="recent-document-img-box-item-number-value">
            150,75 PLN
          </span>
        </div>
      </div>
      <div className="recent-document-img-box-item-img-and-box">
        <Image src={paragonnMaly} alt="Paragon" width={85.68} height={168} />
        <div className="recent-document-img-box-number">
          <span className="recent-document-img-box-item-number-date">
            27.07.2024
          </span>
          <span className="recent-document-img-box-item-number-value">
            150,75 PLN
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default RecentDocumentsImage;
