import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { Mycontext } from "../App";

function Product() {
  const context = useContext(Mycontext);
  const params = useParams();
  const id = params.id;

  var settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slider = React.useRef<Slider | null>(null);
  const slider1 = React.useRef<Slider | null>(null);

  const next = () => {
    if (slider.current) {
      if (useOverlay) {
        slider1.current?.slickNext();
      } else {
        slider.current?.slickNext();
      }
    }
  };

  const previous = () => {
    if (slider.current) {
      if (useOverlay) {
        slider1.current?.slickPrev();
      } else {
        slider.current?.slickPrev();
      }
    }
  };

  //
  const [amount, setAmount] = useState(() => {
    return localStorage.amount ? JSON.parse(localStorage.amount) : 1;
  });
  useEffect(() => {
    localStorage.setItem("amount", JSON.stringify(amount));
  }, [amount]);
  const addproduct = () => {
    if (amount !== 10) {
      setAmount(amount + 1);
    }
  };
  const cutproduct = () => {
    if (amount !== 1) {
      setAmount(amount - 1);
    }
  };

  interface Item {
    name: string;
    images: {
      first: string;
      second: string;
      third: string;
      fourth: string;
    };
    price: number;
    discount: number;
  }

  const addHandler = (e: Item) => {
    if (amount > 0) {
      context.setUsedata((prevData: any) => {
        const updatedUser = {
          ...prevData.user[0],
          cart: [
            ...prevData.user[0].cart,
            {
              id: Math.floor(Math.random() * 1000),
              name: e.name,
              image: e.images.first,
              price: (e.price * (1 - e.discount)).toFixed(2),
              amount: amount,
            },
          ],
        };

        return {
          ...prevData,
          user: [updatedUser],
        };
      });
    }
    setAmount(1);
  };

  // active and hover styles for slider

  const [activeThumbnail, setActiveThumbnail] = useState(0);

  const handleAfterChange = (currentSlide: number) => {
    setActiveThumbnail(currentSlide);
  };

  // for overlay carousel
  const [activeThumbnail1, setActiveThumbnail1] = useState(0);

  const handleAfterChange1 = (currentSlide: number) => {
    setActiveThumbnail1(currentSlide);
  };

  // setting hovers andoverlay
  const [useOverlay, setOverlay] = useState(false);
  const [useHover, setHover] = useState(false);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

  // moves overlay's carousel at where at the main clicked
  useEffect(() => {
    if (useOverlay) {
      setTimeout(() => {
        if (slider1.current) {
          slider1.current.slickGoTo(activeThumbnail);
          setActiveThumbnail1(activeThumbnail);
        }
      }, 100);
    }
  }, [useOverlay]);
  // for close img
  useEffect(() => {
    if (!useOverlay) {
      setTimeout(() => {
        if (slider.current) {
          slider.current.slickGoTo(activeThumbnail1);
          setActiveThumbnail(activeThumbnail1);
        }
      }, 100);
    }
  }, [useOverlay]);

  // hover for minus plus svgs
  const [minus, setMinus] = useState(false);
  const [plus, setPlus] = useState(false);

  const enterMinus = () => {
    setMinus(true);
  };
  const leaveMinus = () => {
    setMinus(false);
  };

  const enterPlus = () => {
    setPlus(true);
  };
  const leavePlus = () => {
    setPlus(false);
  };

  return (
    <main
      onClick={() => context.setCartList(false)}
      className="lg:flex lg:justify-center lg:items-center"
    >
      {context.useData.products
        .filter((element: Tproduct) => element.id == Number(id))
        .map((e: Tproduct, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-center gap-6 lg:gap-[30px] xl:gap-[125px] overflow-hidden lg:mb-20"
            >
              <div className="relative main-carousel">
                <Slider
                  ref={slider}
                  {...settings}
                  afterChange={handleAfterChange}
                >
                  <div className="hover:cursor-pointer">
                    <img
                      src={e.images.first}
                      alt="first"
                      onClick={() => setOverlay(true)}
                    />
                  </div>
                  <div className="hover:cursor-pointer">
                    <img
                      src={e.images.second}
                      alt="second"
                      onClick={() => setOverlay(true)}
                    />
                  </div>
                  <div className="hover:cursor-pointer">
                    <img
                      src={e.images.third}
                      alt="third"
                      onClick={() => setOverlay(true)}
                    />
                  </div>
                  <div className="hover:cursor-pointer">
                    <img
                      src={e.images.fourth}
                      alt="fourth"
                      onClick={() => setOverlay(true)}
                    />
                  </div>
                </Slider>
                {useOverlay ? (
                  <div className="absolute">
                    <div className="flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 z-10 bg-overlay">
                      <section className="flex flex-col justify-center relative overlay-carousel">
                        <svg
                          width="14"
                          height="15"
                          xmlns="http://www.w3.org/2000/svg"
                          className="self-end mb-6 hover:cursor-pointer"
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                          onClick={() => {
                            setOverlay(false);
                          }}
                        >
                          <path
                            d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                            fill={useHover ? "#ff7e1b" : "#fff"}
                            fillRule="evenodd"
                          />
                        </svg>
                        <Slider
                          ref={slider1}
                          {...settings}
                          arrows={false}
                          afterChange={handleAfterChange1}
                        >
                          <div>
                            <img src={e.images.first} alt="first" />
                          </div>
                          <div>
                            <img src={e.images.second} alt="second" />
                          </div>
                          <div>
                            <img src={e.images.third} alt="third" />
                          </div>
                          <div>
                            <img src={e.images.fourth} alt="fourth" />
                          </div>
                        </Slider>
                        <div className="flex items-center justify-center md:gap-5 lg:gap-8 md:mt-4 lg:mt-10">
                          <div
                            className={`${
                              activeThumbnail1 == 0
                                ? " w-[90px] h-[90px] border-[2px] border-solid border-[#ff7e1b] "
                                : "w-[88px] h-[88px]"
                            } rounded-[10px] cursor-pointer overflow-hidden`}
                          >
                            <img
                              src={e.images.first}
                              alt="thumbnail-fourth"
                              className={`${
                                activeThumbnail1 == 0
                                  ? " opacity-40"
                                  : "hover:opacity-60"
                              } `}
                              onClick={() => slider1.current?.slickGoTo(0)}
                            />
                          </div>
                          <div
                            className={`${
                              activeThumbnail1 == 1
                                ? " w-[90px] h-[90px] border-[2px] border-solid border-[#ff7e1b] "
                                : "w-[88px] h-[88px]"
                            } rounded-[10px] cursor-pointer overflow-hidden`}
                          >
                            <img
                              src={e.images.second}
                              alt="thumbnail-fourth"
                              className={`${
                                activeThumbnail1 == 1
                                  ? " opacity-40"
                                  : "hover:opacity-60"
                              } `}
                              onClick={() => slider1.current?.slickGoTo(1)}
                            />
                          </div>
                          <div
                            className={`${
                              activeThumbnail1 == 2
                                ? " w-[90px] h-[90px] border-[2px] border-solid border-[#ff7e1b] "
                                : "w-[88px] h-[88px]"
                            } rounded-[10px] cursor-pointer overflow-hidden`}
                          >
                            <img
                              src={e.images.third}
                              alt="thumbnail-fourth"
                              className={`${
                                activeThumbnail1 == 2
                                  ? " opacity-40"
                                  : "hover:opacity-60"
                              } `}
                              onClick={() => slider1.current?.slickGoTo(2)}
                            />
                          </div>
                          <div
                            className={`${
                              activeThumbnail1 == 3
                                ? " w-[90px] h-[90px] border-[2px] border-solid border-[#ff7e1b] "
                                : "w-[88px] h-[88px]"
                            } rounded-[10px] cursor-pointer overflow-hidden`}
                          >
                            <img
                              src={e.images.fourth}
                              alt="thumbnail-fourth"
                              className={`${
                                activeThumbnail1 == 3
                                  ? " opacity-40"
                                  : "hover:opacity-60"
                              } `}
                              onClick={() => slider1.current?.slickGoTo(3)}
                            />
                          </div>
                        </div>
                        <button
                          onClick={previous}
                          onMouseEnter={() => setPrevHover(true)}
                          onMouseLeave={() => setPrevHover(false)}
                          className="w-[56px] h-[56px] bg-[#f6f3f3] rounded-full flex items-center absolute top-[277px] left-[0px] transform -translate-x-1/2 hidden lg:flex shadow-circle"
                        >
                          <svg
                            width="12"
                            height="18"
                            className="ml-[20px]"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11 1 3 9l8 8"
                              fill={prevHover ? "#ff7e1b" : "#1D2026"}
                              fillRule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={next}
                          onMouseEnter={() => setNextHover(true)}
                          onMouseLeave={() => setNextHover(false)}
                          className="w-[56px] h-[56px] bg-[#f6f3f3] rounded-full flex items-center justify-end absolute top-[277px] right-[0px] transform translate-x-1/2 hidden lg:flex shadow-circle"
                        >
                          <svg
                            width="13"
                            height="18"
                            className="mr-[20px]"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="m2 1 8 8-8 8"
                              fill={nextHover ? "#ff7e1b" : "#1D2026"}
                              fillRule="evenodd"
                            />
                          </svg>
                        </button>
                      </section>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex items-center justify-between mt-8">
                  <div
                    className={`${
                      activeThumbnail == 0
                        ? " w-[90px] h-[90px] border-[2px] border-solid border-[#ff7e1b] "
                        : "w-[88px] h-[88px]"
                    } rounded-[10px] cursor-pointer overflow-hidden`}
                  >
                    <img
                      src={e.images.first}
                      alt="thumbnail-fourth"
                      className={`${
                        activeThumbnail == 0
                          ? " opacity-40"
                          : "hover:opacity-60"
                      } `}
                      onClick={() => slider.current?.slickGoTo(0)}
                    />
                  </div>
                  <div
                    className={`${
                      activeThumbnail == 1
                        ? " w-[90px] h-[90px] border-[2px] border-solid border-[#ff7e1b] "
                        : "w-[88px] h-[88px]"
                    } rounded-[10px] cursor-pointer overflow-hidden`}
                  >
                    <img
                      src={e.images.second}
                      alt="thumbnail-fourth"
                      className={`${
                        activeThumbnail == 1
                          ? " opacity-40"
                          : "hover:opacity-60"
                      } `}
                      onClick={() => slider.current?.slickGoTo(1)}
                    />
                  </div>
                  <div
                    className={`${
                      activeThumbnail == 2
                        ? " w-[90px] h-[90px] border-[2px] border-solid border-[#ff7e1b] "
                        : "w-[88px] h-[88px]"
                    } rounded-[10px] cursor-pointer overflow-hidden`}
                  >
                    <img
                      src={e.images.third}
                      alt="thumbnail-fourth"
                      className={`${
                        activeThumbnail == 2
                          ? " opacity-40"
                          : "hover:opacity-60"
                      } `}
                      onClick={() => slider.current?.slickGoTo(2)}
                    />
                  </div>
                  <div
                    className={`${
                      activeThumbnail == 3
                        ? " w-[90px] h-[90px] border-[2px] border-solid border-[#ff7e1b] "
                        : "w-[88px] h-[88px]"
                    } rounded-[10px] cursor-pointer overflow-hidden`}
                  >
                    <img
                      src={e.images.fourth}
                      alt="thumbnail-fourth"
                      className={`${
                        activeThumbnail == 3
                          ? " opacity-40"
                          : "hover:opacity-60"
                      } `}
                      onClick={() => slider.current?.slickGoTo(3)}
                    />
                  </div>
                </div>
                <button
                  onClick={previous}
                  onMouseEnter={() => setPrevHover(true)}
                  onMouseLeave={() => setPrevHover(false)}
                  className="w-10 h-10 bg-[#f6f3f3] rounded-full flex items-center absolute top-[190px] left-[16px] transform -translate-y-1/2 lg:hidden shadow-circle"
                >
                  <svg
                    width="12"
                    height="18"
                    className="ml-[12px]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1 3 9l8 8"
                      fill={prevHover ? "#ff7e1b" : "#1D2026"}
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={next}
                  onMouseEnter={() => setNextHover(true)}
                  onMouseLeave={() => setNextHover(false)}
                  className="w-10 h-10 bg-[#f6f3f3] rounded-full flex items-center justify-end absolute top-[190px] right-[16px] transform -translate-y-1/2 lg:hidden shadow-circle"
                >
                  <svg
                    width="13"
                    height="18"
                    className="mr-[12px]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m2 1 8 8-8 8"
                      fill={nextHover ? "#ff7e1b" : "#1D2026"}
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <section className="w-[327px] lg:w-[445px] flex flex-col gap-4 lg:gap-[28px] mb-20 lg:mb-0">
                <span className="text-xs lg:text-[13px] text-[#ff7e1b] font-[700] tracking-[1.85px] lg:tracking-[2] leading-[13px]">
                  {e.company}
                </span>
                <h1 className="text-[28px] lg:text-[44px] text-[#1d2026] font-[700] leading-[1.14] lg:leading-[1.09] mt-[3px] lg:mt-0">
                  {e.name}
                </h1>
                <p className="text-[15px] lg:text-base text-[#69707d] font-[500] leading-[1.67] lg:leading-[1.63] lg:mt-1">
                  {e.description}
                </p>
                <div className="flex lg:flex-col items-center lg:items-start lg:gap-[10px] justify-between mt-2 lg:mt-[-4px]">
                  <div className="flex items-center gap-4">
                    <span className="text-[28px] text-[#1d2026] font-[700] leading-[28px]">
                      ${(amount * (e.price - e.price * e.discount)).toFixed(2)}
                    </span>
                    <div className="w-[51px] bg-[#ffeee2] flex lg:items-end justify-center pt-[7px] pb-1 lg:pb-[6px] rounded-[6px] text-base text-[#ff7e1b] font-[700] leading-[16px] mt-1">
                      {e.discount * 100}%
                    </div>
                  </div>
                  <span className="text-base text-[#b6bcc8] font-[700] leading-[1.63] line-through">
                    ${(amount * e.price).toFixed(2)}
                  </span>
                </div>
                <section className="flex flex-col lg:flex-row lg:justify-between gap-4 mt-2 lg:mt-1">
                  <div className="lg:w-[176px] flex items-center justify-between bg-[#f6f8fd] rounded-[10px] pt-[22px] px-6 lg:px-4 pb-[18px]">
                    <svg
                      width="12"
                      height="4"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={cutproduct}
                      onMouseEnter={enterMinus}
                      onMouseLeave={leaveMinus}
                      className="hover:cursor-pointer"
                    >
                      <path
                        d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                        id="minus"
                        fill={minus ? "#ffab6a" : "#FF7E1B"}
                        fillRule="nonzero"
                      />
                    </svg>
                    <span className="text-base text-[#1d2026] font-[700] leading-[1] mt-[-3px]">
                      {amount}
                    </span>
                    <svg
                      width="12"
                      height="12"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={addproduct}
                      onMouseEnter={enterPlus}
                      onMouseLeave={leavePlus}
                      className="hover:cursor-pointer"
                    >
                      <path
                        d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                        id="plus"
                        fill={plus ? "#ffab6a" : "#FF7E1B"}
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                  <button
                    onClick={() => addHandler(e)}
                    className="lg:w-[232px] xl:w-[272px] flex justify-center items-center gap-4 bg-[#ff7e1b] hover:bg-[#ffab6a] rounded-[10px] shadow-addToCart pt-[19px] pb-[18px]"
                  >
                    <svg
                      className="hover:cursor-pointer"
                      width="21.5"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                        fill="#fff"
                        fillRule="nonzero"
                      />
                    </svg>
                    <span className="text-base text-[#fff] font-[700] leading-[16px]">
                      Add to cart
                    </span>
                  </button>
                </section>
              </section>
            </div>
          );
        })}
    </main>
  );
}

export default Product;
