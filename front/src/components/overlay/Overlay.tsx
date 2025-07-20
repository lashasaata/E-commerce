import { useContext } from "react";
import { Mycontext } from "../../App";
function Overlay({
  setOverlay,
}: {
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const closeOverlay = () => {
    setOverlay(false);
  };
  const context = useContext(Mycontext);
  //
  const routSt = {
    fontSize: "18px",
    lineHeight: "28px",
    color: "#1d2026",
    fontWeight: "700",
  };

  return (
    <div className="absolute">
      <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-overlay">
        <div className="w-[250px] h-screen bg-[#fff] z-10">
          <div className="flex flex-col items-start gap-[54px] pt-[25px] pl-[25px]">
            <img
              onClick={closeOverlay}
              src="/images/icon-close.svg"
              alt="close"
            />
            <nav className="flex flex-col gap-5">
              <h2
                style={routSt}
                onClick={() => {
                  context.navigate("/");
                  setOverlay(false);
                }}
              >
                Collections
              </h2>
              <h2
                style={routSt}
                onClick={() => {
                  context.navigate("/men");
                  setOverlay(false);
                }}
              >
                Men
              </h2>
              <h2
                style={routSt}
                onClick={() => {
                  context.navigate("/women");
                  setOverlay(false);
                }}
              >
                Women
              </h2>
              <h2
                style={routSt}
                onClick={() => {
                  context.navigate("/about");
                  setOverlay(false);
                }}
              >
                About
              </h2>
              <h2
                style={routSt}
                onClick={() => {
                  context.navigate("/contact");
                  setOverlay(false);
                }}
              >
                Contact
              </h2>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overlay;
