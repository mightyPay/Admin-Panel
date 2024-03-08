import React from "react";

export interface LogosProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const IconLogo = (props: LogosProps) => {
  return (
    <svg
      width="112"
      height="62"
      fill="none"
      viewBox="0 0 112 62"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M73.0153 12.1476C75.3491 18.0602 77.7443 23.9494 79.9951 29.8934C81.5184 33.916 82.8384 38.0156 84.5634 42.6853C86.7344 49.2429 88.5914 55.196 90.4483 61.149C84.8437 61.149 79.239 61.149 73.2094 61.149C69.6533 50.4546 65.9995 39.4665 62.2491 27.7964C65.7735 22.1255 69.3944 17.1365 73.0153 12.1476Z"
        fill="#A31C35"
      />
      <path
        d="M35.9921 19.1457C37.7846 22.5398 39.5771 25.9339 41.6933 29.9096C43.7033 35.702 45.3896 40.9128 47.0759 46.1237C43.4269 51.0252 39.7779 55.9267 35.5789 61.567C31.9324 51.7618 28.5715 42.7247 25.2542 33.0344C28.8625 27.9694 32.4273 23.5576 35.9921 19.1457Z"
        fill="#AC243E"
      />
      <path
        d="M47.3645 45.9502C45.3896 40.9128 43.7033 35.702 41.9675 30.0989C43.4522 27.7645 45.3734 26.0155 46.4554 23.8476C51.8769 12.9858 60.7537 9.85873 72.5615 12.0201C69.3944 17.1365 65.7735 22.1255 62.1089 27.4448C57.2611 33.7758 52.4571 39.7763 47.3645 45.9502Z"
        fill="#C72B46"
      />
      <path
        d="M90.7168 60.9478C88.5914 55.196 86.7344 49.2429 84.8585 42.9349C93.3193 28.4053 101.799 14.2306 110.279 0.0559387C110.705 0.246185 111.131 0.436431 111.558 0.626676C104.7 20.6667 97.8426 40.7066 90.7168 60.9478Z"
        fill="#304874"
      />
      <path
        d="M35.5317 19.0651C32.4273 23.5575 28.8625 27.9694 25.1523 32.6817C18.1796 40.1595 11.311 47.2985 4.56392 54.5504C3.38327 55.8194 2.71282 57.563 1.80674 59.0875C1.21503 58.5704 0.623325 58.0534 0.0316162 57.5364C4.93766 47.8708 10.4908 38.4672 14.5436 28.4562C17.7449 20.5485 22.4282 17.4405 30.5941 18.9184C32.043 19.1807 33.5768 18.9745 35.5317 19.0651Z"
        fill="#A31C36"
      />
    </svg>
  );
};

export default IconLogo;
