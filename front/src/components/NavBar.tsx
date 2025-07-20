import { useContext, useState, useEffect } from "react";
import { Mycontext } from "../App";
import Overlay from "./overlay/Overlay";
import { logOut } from "../services/auth";

function NavBar() {
  const context = useContext(Mycontext);
  const [isOverlay, setOverlay] = useState(false);
  // const sectionRef = useRef(null);

  const handleList = () => {
    context.setCartList(!context.cartList);
  };
  //counts products amount in cart
  type cartTy = {
    id: number;
    name: string;
    image: string;
    price: number;
    amount: number;
  };
  let products = 0;
  context.useData.user[0].cart.map((e: cartTy) => (products += e.amount));

  useEffect(() => {
    localStorage.setItem(`products`, JSON.stringify(products));
  }, [products]);

  //delete product from the cart
  const handleDelete = (id: number) => {
    const updatedUser: Tdata = {
      ...context.useData.user[0],
      cart: context.useData.user[0].cart.filter(
        (item: cartTy) => item.id !== id
      ),
    };
    context.setUsedata(() => {
      return {
        ...context.useData,
        user: [updatedUser],
      };
    });
  };

  //clears product cart

  const purchase = () => {
    const updatedUser: Tdata = {
      ...context.useData.user[0],
      cart: [],
    };
    context.setUsedata(() => {
      return {
        ...context.useData,
        user: [updatedUser],
      };
    });
  };

  // opens and closes overlay component

  const openOverlay = () => {
    setOverlay(true);
  };

  // routes for menu
  const [activeMenu, setActiveMenu] = useState(() => {
    if (localStorage.activeMenu) {
      return JSON.parse(localStorage.activeMenu);
    } else {
      return {
        Collections: true,
        Men: false,
        Women: false,
        About: false,
        Contact: false,
      };
    }
  });
  const menuDr = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const closedRoutes = {
      Collections: false,
      Men: false,
      Women: false,
      About: false,
      Contact: false,
    };

    // Cast e.target to HTMLHeadingElement
    const target = e.target as HTMLHeadingElement;

    setActiveMenu(() => {
      return {
        ...closedRoutes,
        [target.innerText]: true,
      };
    });

    // Navigate routes
    if (target.innerText === "Collections") {
      context.navigate(`/`);
    } else {
      context.navigate(`/${target.innerText}`);
    }
  };

  useEffect(() => {
    localStorage.setItem("activeMenu", JSON.stringify(activeMenu));
  }, [activeMenu]);

  // cart icon hovers
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };
  return (
    <header className="flex justify-between items-center lg:items-start px-6 lg:px-[0px] pt-[19px] lg:pt-[28px] pb-6 lg:pb-[0px]  lg:border-b lg:border-solid lg:border-[#e4e9f2]">
      <div
        className="flex gap-4 lg:gap-[56px] items-center lg:items-start lg:pt-[13px]"
        onClick={() => context.setCartList(false)}
      >
        <img
          onClick={openOverlay}
          className="lg:hidden"
          src="/images/icon-menu.svg"
          alt="menu"
        />
        <img className="lg:mt-[2px]" src="/images/logo.svg" alt="logo" />
        <nav className="flex items-center lg:items-start gap-8 hidden lg:flex">
          <div
            className={
              activeMenu.Collections
                ? "border-b-4 border-solid border-[#ff7e1b] pb-10"
                : ""
            }
          >
            <h2
              onClick={menuDr}
              className={`${
                activeMenu.Collections ? "text-[#1d2026]" : "text-[#69707d]"
              } text-[15px] font-[500] leading-[1.73] hover:text-[#1d2026] hover:cursor-pointer`}
            >
              Collections
            </h2>
          </div>
          <div
            className={
              activeMenu.Men
                ? "border-b-4 border-solid border-[#ff7e1b] pb-10"
                : ""
            }
          >
            <h2
              onClick={menuDr}
              className={`${
                activeMenu.Men ? "text-[#1d2026]" : "text-[#69707d]"
              } text-[15px] font-[500] leading-[1.73] hover:text-[#1d2026] hover:cursor-pointer`}
            >
              Men
            </h2>
          </div>
          <div
            className={
              activeMenu.Women
                ? "border-b-4 border-solid border-[#ff7e1b] pb-10"
                : ""
            }
          >
            <h2
              onClick={menuDr}
              className={`${
                activeMenu.Women ? "text-[#1d2026]" : "text-[#69707d]"
              } text-[15px] font-[500] leading-[1.73] hover:text-[#1d2026] hover:cursor-pointer`}
            >
              Women
            </h2>
          </div>
          <div
            className={
              activeMenu.About
                ? "border-b-4 border-solid border-[#ff7e1b] pb-10"
                : ""
            }
          >
            <h2
              onClick={menuDr}
              className={`${
                activeMenu.About ? "text-[#1d2026]" : "text-[#69707d]"
              } text-[15px] font-[500] leading-[1.73] hover:text-[#1d2026] hover:cursor-pointer`}
            >
              About
            </h2>
          </div>
          <div
            className={
              activeMenu.Contact
                ? "border-b-4 border-solid border-[#ff7e1b] pb-10"
                : ""
            }
          >
            <h2
              onClick={menuDr}
              className={`${
                activeMenu.Contact ? "text-[#1d2026]" : "text-[#69707d]"
              } text-[15px] font-[500] leading-[1.73] hover:text-[#1d2026] hover:cursor-pointer`}
            >
              Contact
            </h2>
          </div>
        </nav>
      </div>
      <div className="flex items-center gap-[22px] lg:gap-[46px] relative">
        <div className="relative">
          <svg
            onClick={handleList}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            className="hover:cursor-pointer"
            width="21.5"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
              fill={
                context.cartList
                  ? `${isHovered ? "#69707d" : "#1d2026"}`
                  : `${isHovered ? "#1d2026" : "#69707d"}`
              }
              fillRule="nonzero"
            />
          </svg>
          {context.useData.user[0].cart.length > 0 ? (
            <div className="h-[13px] flex items-center rounded-[6.5px] bg-[#ff7e1b] px-[6px] text-[10px] text-[#fff] font-[700] leading-[10px] absolute top-[-6px] left-[9px]">
              {products}
            </div>
          ) : (
            ""
          )}
        </div>
        <img
          src="/images/image-avatar.png"
          alt="avatar"
          onClick={() => {
            logOut();
            context.navigate("/login");
          }}
          className="w-6 lg:w-[50px] h-6 lg:h-[50px] rounded-full hover:cursor-pointer hover:border-2 hover:border-solid hover:border-[#ff7e1b]"
        />
        {context.cartList ? (
          <div className="w-[360px] bg-[#fff] rounded-[10px] flex flex-col items-center gap-6 shadow-cart absolute bottom-[-33px] lg:bottom-[-16px] right-[-17px] lg:right-[-75px] transform translate-y-full z-10">
            <div className="w-full px-6 pt-6 pb-[27px] border-b order-solid border-[#e4e9f2]">
              <span className="text-base text-[#1d2026] fornt-[900] leading-[1]">
                Cart
              </span>
            </div>
            {context.useData.user[0].cart.length > 0 ? (
              <div className="w-full flex flex-col items-center gap-6">
                {" "}
                <div className="w-full max-h-[140px] overflow-auto flex flex-col gap-6">
                  {context.useData.user[0].cart.map(
                    (e: cartTy, index: number) => {
                      return (
                        <section
                          key={index}
                          className="w-full flex items-center justify-between px-6"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={e.image}
                              alt="product"
                              className="w-[50px] h-[50px] rounded-[4px]"
                            />
                            <div>
                              <h2 className="text-base text-[#69707d] font-[500] leading-[1.63] ">
                                {e.name}
                              </h2>
                              <div>
                                <span className="text-base text-[#69707d] font-[500] leading-[1.63] ">
                                  ${e.price} x {e.amount}
                                </span>{" "}
                                <span className="text-base text-[#1d2026] font-[500] leading-[1.63] ">
                                  $
                                  {(Number(e.price) * Number(e.amount)).toFixed(
                                    2
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <img
                            onClick={() => handleDelete(e.id)}
                            src="/images/icon-delete.svg"
                            alt="delete"
                            className="ml-1 hover:cursor-pointer"
                          />
                        </section>
                      );
                    }
                  )}
                </div>
                <button
                  onClick={purchase}
                  className="w-[312px] h-[56px] rounded-[10px] bg-[#ff7e1b] hover:bg-[#ffab6a] hover:cursor-pointer flex justify-center pt-[22px] mb-[32px] text-base text-[#fff] font-[700] leading-[1] "
                >
                  Checkout
                </button>
              </div>
            ) : (
              <span className="text-base text-[#69707d] font-[700] mt-[53px] mb-[85px] leading-[1.63]">
                Your cart is empty.
              </span>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {isOverlay ? <Overlay setOverlay={setOverlay} /> : ""}
    </header>
  );
}

export default NavBar;
