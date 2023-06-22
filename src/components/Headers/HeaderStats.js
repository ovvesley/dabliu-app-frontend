import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>

            <h2 className="text-4xl font-semibold leading-normal text-white ">
              Dabliu é uma plataforma que vai te ajudar a gerenciar sua vida.
            </h2>

            <p className="mt-4 text-lg font-semibold leading-normal text-white">
              Dabliu é uma plataforma que vai te ajudar a gerenciar sua vida,
              </p>
            
          </div>
        </div>
      </div>
    </>
  );
}
