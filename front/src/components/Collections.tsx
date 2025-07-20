import { useContext, useEffect, useState } from "react";
import { Mycontext } from "../App";
import axios from "axios";

function Collections({ value }: { value: string }) {
  const context = useContext(Mycontext);

  return (
    <div
      className="flex justify-center md:justify-around lg:justify-start flex-wrap gap-10 md:p-10 mb-20"
      onClick={() => context.setCartList(false)}
    >
      {value === "Collections"
        ? context.useData.products.map((e: Tproduct, index: number) => {
            return (
              <div key={index} className="w-[330px] flex flex-col gap-3">
                <img
                  src={e.images.first}
                  alt="product"
                  onClick={() => context.navigate(`/${e.id}`)}
                  className="w-[330px] h-[350px] rounded-[10px] cursor-pointer"
                />
                <h1 className="text-2xl lg:text-[24px] text-[#1d2026] font-[700] leading-[1.14] lg:leading-[1.09] mt-[3px] lg:mt-0">
                  {e.name}
                </h1>
                <div className="flex justify-between mt-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[28px] text-[#1d2026] font-[700] leading-[28px]">
                      $
                      {(
                        Number(e.price) -
                        Number(e.price) * Number(e.discount)
                      ).toFixed(2)}
                    </span>
                    <span className="text-base text-[#b6bcc8] font-[700] leading-[1.63] line-through">
                      ${Number(e.price).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="w-[51px] bg-[#ffeee2] flex lg:items-end justify-center pt-[7px] pb-1 lg:pb-[6px] rounded-[6px] text-base text-[#ff7e1b] font-[700] leading-[16px] mt-1">
                      {Number(e.discount) * 100}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        : context.useData.products
            .filter((e: Tproduct) => e.category == value)
            .map((e: Tproduct, index: number) => {
              return (
                <div key={index} className="w-[330px] flex flex-col gap-3">
                  <img
                    src={e.images.first}
                    alt="product"
                    onClick={() => context.navigate(`/${e.id}`)}
                    className="w-[330px] h-[350px] rounded-[10px] cursor-pointer"
                  />
                  <h1 className="text-2xl lg:text-[24px] text-[#1d2026] font-[700] leading-[1.14] lg:leading-[1.09] mt-[3px] lg:mt-0">
                    {e.name}
                  </h1>
                  <div className="flex justify-between mt-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-[28px] text-[#1d2026] font-[700] leading-[28px]">
                        $
                        {(
                          Number(e.price) -
                          Number(e.price) * Number(e.discount)
                        ).toFixed(2)}
                      </span>
                      <span className="text-base text-[#b6bcc8] font-[700] leading-[1.63] line-through">
                        ${Number(e.price).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="w-[51px] bg-[#ffeee2] flex lg:items-end justify-center pt-[7px] pb-1 lg:pb-[6px] rounded-[6px] text-base text-[#ff7e1b] font-[700] leading-[16px] mt-1">
                        {Number(e.discount) * 100}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
    </div>
  );
}

export default Collections;
