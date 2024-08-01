import React from "react";
import Image from "next/image";
import Pug from "../../assets/pug.png";
import paragonnMaly from "../../assets/paragonnMaly.jpg";
import par from "../../assets/par.webp";

type Props = {}
const Carousel = (props: Props) => {
  return (
    <>
      <div>
        <h1>Recent documents</h1>
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <Image
                  src={paragonnMaly}
                  alt="Paragon"
                  width={500}
                  height={500}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  DD.MM.YYYY
                  <div className="badge badge-secondary">-00.00 $</div>
                </h2>
                <p>Merchant</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
              <Image
                  src={paragonnMaly}
                  alt="Paragon"
                  width={500}
                  height={500}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  DD.MM.YYYY
                  <div className="badge badge-secondary">-00.00 $</div>
                </h2>
                <p>Merchant</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                 <Image
                  src={paragonnMaly}
                  alt="Paragon"
                  width={500}
                  height={500}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  DD.MM.YYYY
                  <div className="badge badge-secondary">-00.00 $</div>
                </h2>
                <p>Merchant</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
              <Image
                  src={paragonnMaly}
                  alt="Paragon"
                  width={500}
                  height={500}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  DD.MM.YYYY
                  <div className="badge badge-secondary">-00.00 $</div>
                </h2>
                <p>Merchant</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
              <Image
                  src={Pug}
                  alt="Paragon"
                  width={500}
                  height={500}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  DD.MM.YYYY
                  <div className="badge badge-secondary">-00.00 $</div>
                </h2>
                <p>Merchant</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
              <Image
                  src={paragonnMaly}
                  alt="Paragon"
                  width={500}
                  height={500}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  DD.MM.YYYY
                  <div className="badge badge-secondary">-00.00 $</div>
                </h2>
                <p>Merchant</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
              <Image
                  src={par}
                  alt="Paragon"
                  width={500}
                  height={500}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  DD.MM.YYYY
                  <div className="badge badge-secondary">-00.00 $</div>
                </h2>
                <p>Merchant</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
