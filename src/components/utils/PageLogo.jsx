import React from "react";

const PageLogo = ({
  className = "",
  geniusColor = "#e0eafb",
  textBackground = "#F7F16C",
  textForeground = "#000000",
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 352 133"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M98.9403 8.00549C98.3149 8.04539 97.7039 8.30225 97.2338 8.7744C96.291 9.7187 96.1953 11.2225 97.0106 12.2812C104.598 22.1313 108.609 33.9189 108.609 46.3677C108.609 77.1679 83.5887 102.228 52.8372 102.228C40.408 102.228 28.644 98.2106 18.8096 90.6111C17.7526 89.7943 16.2564 89.8874 15.3083 90.8344C14.3654 91.7787 14.2647 93.2799 15.08 94.3361C26.755 109.493 44.3889 118.188 63.4604 118.188C97.144 118.188 124.544 90.7445 124.544 57.0077C124.544 37.9089 115.865 20.2443 100.735 8.551C100.206 8.14269 99.5657 7.96559 98.9403 8.00549ZM26.8393 17.1077C26.1433 17.1077 25.4762 17.3794 24.9824 17.8662C17.2565 25.4419 13 35.5655 13 46.3677C13 60.4338 20.5578 73.613 32.7215 80.7659C33.1384 81.0133 33.6028 81.1347 34.065 81.1347C34.7528 81.1347 35.4328 80.8662 35.9426 80.3555C36.7978 79.4988 36.966 78.1692 36.3524 77.124C33.2371 71.8118 31.5907 65.7776 31.5907 59.6677C31.5907 50.5838 35.0932 41.9951 41.4566 35.4887C41.9426 34.9913 42.2139 34.3257 42.2139 33.6288V19.7677C42.2139 18.2994 41.0268 17.1077 39.5581 17.1077H26.8393ZM68.772 17.1077C67.3033 17.1077 66.1162 18.2994 66.1162 19.7677V37.0577C66.1162 42.1915 61.9466 46.3677 56.8209 46.3677C56.664 46.3677 56.5157 46.337 56.3643 46.3157L55.8871 46.2585C55.0956 46.1709 54.3027 46.4557 53.7397 47.0223C53.174 47.5862 52.8924 48.3751 52.972 49.1731C53.7342 56.6718 59.9547 62.3277 67.4441 62.3277C75.4965 62.3277 82.051 55.7655 82.051 47.6977V35.7277H84.7068C85.5885 35.7277 86.4123 35.2875 86.9061 34.5587C87.4002 33.8272 87.5026 32.8998 87.1759 32.0805L81.8643 18.7805C81.4579 17.7697 80.4814 17.1077 79.3952 17.1077H68.772Z"
        fill={geniusColor}
      />
      <rect x="154" y="2" width="99" height="56" rx="7" fill="#F7F16C" />
      <rect x="154" y="68" width="200" height="56" rx="7" fill="#F7F16C" />
      <path
        d="M182.332 38H182.625V42.0039C180.802 43.0456 178.719 43.5664 176.375 43.5664C173.328 43.5664 170.828 42.5964 168.875 40.6562C166.922 38.7031 165.945 36.1641 165.945 33.0391C165.945 30.0964 166.935 27.6224 168.914 25.6172C170.906 23.612 173.406 22.6094 176.414 22.6094C178.732 22.6094 180.717 23.0846 182.371 24.0352V28.0391H182.098C181.564 27.5964 180.822 27.2122 179.871 26.8867C178.921 26.5612 177.853 26.3984 176.668 26.3984C174.832 26.3984 173.289 26.9909 172.039 28.1758C170.802 29.3607 170.184 30.9818 170.184 33.0391C170.184 34.1589 170.359 35.1549 170.711 36.0273C171.062 36.8867 171.544 37.5833 172.156 38.1172C172.781 38.651 173.484 39.0547 174.266 39.3281C175.047 39.5885 175.887 39.7188 176.785 39.7188C177.801 39.7188 178.803 39.582 179.793 39.3086C180.783 39.0221 181.629 38.5859 182.332 38ZM187.898 28.1172H187.625V24.3281C188.133 23.9505 188.992 23.5729 190.203 23.1953C191.414 22.8047 192.677 22.6094 193.992 22.6094C196.466 22.6094 198.452 23.2148 199.949 24.4258C201.447 25.6237 202.195 27.362 202.195 29.6406V43H198.387V41.3984C197.918 41.9453 197.182 42.4466 196.18 42.9023C195.177 43.3451 194.005 43.5664 192.664 43.5664C190.607 43.5664 188.901 42.987 187.547 41.8281C186.193 40.6562 185.516 39.0872 185.516 37.1211C185.516 35.7409 185.906 34.543 186.688 33.5273C187.469 32.4987 188.491 31.737 189.754 31.2422C191.03 30.7344 192.456 30.4805 194.031 30.4805C195.594 30.4805 196.915 30.7083 197.996 31.1641V30.0312C197.996 28.7682 197.599 27.8307 196.805 27.2188C196.023 26.5938 194.936 26.2812 193.543 26.2812C192.436 26.2812 191.362 26.4635 190.32 26.8281C189.292 27.1927 188.484 27.6224 187.898 28.1172ZM194.754 33.6836C193.283 33.6836 192.078 33.9766 191.141 34.5625C190.216 35.1484 189.754 35.9622 189.754 37.0039C189.754 38.0195 190.125 38.7878 190.867 39.3086C191.609 39.8164 192.566 40.0703 193.738 40.0703C194.624 40.0703 195.438 39.901 196.18 39.5625C196.935 39.224 197.54 38.8073 197.996 38.3125V34.2891C197.332 33.8854 196.251 33.6836 194.754 33.6836ZM218.094 22.9609V26.9258C217.664 26.7826 217.078 26.7109 216.336 26.7109C215.242 26.7109 214.292 26.8997 213.484 27.2773C212.69 27.6549 212.091 28.1497 211.688 28.7617V43H207.488V23.1562H211.297V25.0312C212.456 23.5208 214.109 22.7656 216.258 22.7656C217.13 22.7656 217.742 22.8307 218.094 22.9609ZM229.734 43.5664C226.909 43.5664 224.533 42.5964 222.605 40.6562C220.691 38.7031 219.734 36.2031 219.734 33.1562C219.734 31.112 220.197 29.2826 221.121 27.668C222.046 26.0404 223.263 24.7904 224.773 23.918C226.297 23.0456 227.951 22.6094 229.734 22.6094C232.013 22.6094 233.888 23.2214 235.359 24.4453V16.2031H239.578V43H235.77V41.3594C235.197 41.9323 234.383 42.4466 233.328 42.9023C232.286 43.3451 231.089 43.5664 229.734 43.5664ZM230.418 39.7969C231.512 39.7969 232.495 39.6211 233.367 39.2695C234.24 38.9049 234.904 38.4818 235.359 38V28.2734C234.891 27.7786 234.233 27.3359 233.387 26.9453C232.54 26.5547 231.577 26.3594 230.496 26.3594C228.569 26.3594 227 26.9909 225.789 28.2539C224.578 29.5169 223.973 31.138 223.973 33.1172C223.973 35.1354 224.552 36.7565 225.711 37.9805C226.87 39.1914 228.439 39.7969 230.418 39.7969Z"
        fill={textForeground}
      />
      <path
        d="M182.914 107.242V106.285C181.378 107.613 179.457 108.277 177.152 108.277C174.405 108.277 172.107 107.379 170.258 105.582C168.409 103.772 167.484 101.415 167.484 98.5117C167.484 95.6341 168.415 93.2643 170.277 91.4023C172.152 89.5404 174.529 88.6094 177.406 88.6094C178.669 88.6094 179.828 88.8177 180.883 89.2344C181.938 89.651 182.764 90.1719 183.363 90.7969V89.1562H187.113V107.594C187.113 110.406 186.299 112.516 184.672 113.922C183.812 114.664 182.745 115.224 181.469 115.602C180.206 115.979 178.891 116.168 177.523 116.168C175.922 116.168 174.431 116.038 173.051 115.777C171.684 115.517 170.616 115.204 169.848 114.84V110.953H170.16C170.876 111.383 171.853 111.728 173.09 111.988C174.327 112.262 175.603 112.398 176.918 112.398C179.132 112.398 180.759 111.917 181.801 110.953C182.23 110.523 182.523 110.009 182.68 109.41C182.836 108.824 182.914 108.102 182.914 107.242ZM182.914 102.359V94.2734C182.445 93.7526 181.768 93.3034 180.883 92.9258C180.01 92.5482 179.047 92.3594 177.992 92.3594C176.169 92.3594 174.665 92.9258 173.48 94.0586C172.309 95.1914 171.723 96.6628 171.723 98.4727C171.723 100.4 172.296 101.891 173.441 102.945C174.6 104 176.052 104.527 177.797 104.527C178.878 104.527 179.867 104.326 180.766 103.922C181.677 103.505 182.393 102.984 182.914 102.359ZM209.75 100.797H195.512C195.59 102.281 196.195 103.492 197.328 104.43C198.474 105.367 200.03 105.836 201.996 105.836C203.194 105.836 204.353 105.673 205.473 105.348C206.605 105.009 207.549 104.508 208.305 103.844H208.578V107.77C207.966 108.212 207.048 108.622 205.824 109C204.6 109.378 203.227 109.566 201.703 109.566C198.591 109.566 196.078 108.642 194.164 106.793C192.263 104.931 191.312 102.385 191.312 99.1562C191.312 96.1354 192.23 93.6224 194.066 91.6172C195.902 89.612 198.142 88.6094 200.785 88.6094C203.598 88.6094 205.805 89.5794 207.406 91.5195C209.021 93.4466 209.828 96.0573 209.828 99.3516C209.828 99.4818 209.822 99.6641 209.809 99.8984C209.796 100.133 209.789 100.289 209.789 100.367C209.763 100.471 209.75 100.615 209.75 100.797ZM195.512 97.3984H205.668C205.603 95.8359 205.141 94.5859 204.281 93.6484C203.435 92.7109 202.27 92.2422 200.785 92.2422C199.34 92.2422 198.142 92.7435 197.191 93.7461C196.241 94.7487 195.681 95.9661 195.512 97.3984ZM218.07 94.3125V109H213.871V89.1562H217.68V90.9922C218.174 90.4453 218.943 89.9115 219.984 89.3906C221.026 88.8698 222.126 88.6094 223.285 88.6094C225.629 88.6094 227.439 89.2669 228.715 90.582C229.991 91.8971 230.629 93.7852 230.629 96.2461V109H226.43V96.6367C226.43 95.2565 226.065 94.2018 225.336 93.4727C224.62 92.7305 223.585 92.3594 222.23 92.3594C221.449 92.3594 220.635 92.5807 219.789 93.0234C218.956 93.4661 218.383 93.8958 218.07 94.3125ZM253.07 100.797H238.832C238.91 102.281 239.516 103.492 240.648 104.43C241.794 105.367 243.35 105.836 245.316 105.836C246.514 105.836 247.673 105.673 248.793 105.348C249.926 105.009 250.87 104.508 251.625 103.844H251.898V107.77C251.286 108.212 250.368 108.622 249.145 109C247.921 109.378 246.547 109.566 245.023 109.566C241.911 109.566 239.398 108.642 237.484 106.793C235.583 104.931 234.633 102.385 234.633 99.1562C234.633 96.1354 235.551 93.6224 237.387 91.6172C239.223 89.612 241.462 88.6094 244.105 88.6094C246.918 88.6094 249.125 89.5794 250.727 91.5195C252.341 93.4466 253.148 96.0573 253.148 99.3516C253.148 99.4818 253.142 99.6641 253.129 99.8984C253.116 100.133 253.109 100.289 253.109 100.367C253.083 100.471 253.07 100.615 253.07 100.797ZM238.832 97.3984H248.988C248.923 95.8359 248.461 94.5859 247.602 93.6484C246.755 92.7109 245.59 92.2422 244.105 92.2422C242.66 92.2422 241.462 92.7435 240.512 93.7461C239.561 94.7487 239.001 95.9661 238.832 97.3984ZM267.797 88.9609V92.9258C267.367 92.7826 266.781 92.7109 266.039 92.7109C264.945 92.7109 263.995 92.8997 263.188 93.2773C262.393 93.6549 261.794 94.1497 261.391 94.7617V109H257.191V89.1562H261V91.0312C262.159 89.5208 263.812 88.7656 265.961 88.7656C266.833 88.7656 267.445 88.8307 267.797 88.9609ZM271.781 94.1172H271.508V90.3281C272.016 89.9505 272.875 89.5729 274.086 89.1953C275.297 88.8047 276.56 88.6094 277.875 88.6094C280.349 88.6094 282.335 89.2148 283.832 90.4258C285.329 91.6237 286.078 93.362 286.078 95.6406V109H282.27V107.398C281.801 107.945 281.065 108.447 280.062 108.902C279.06 109.345 277.888 109.566 276.547 109.566C274.49 109.566 272.784 108.987 271.43 107.828C270.076 106.656 269.398 105.087 269.398 103.121C269.398 101.741 269.789 100.543 270.57 99.5273C271.352 98.4987 272.374 97.737 273.637 97.2422C274.913 96.7344 276.339 96.4805 277.914 96.4805C279.477 96.4805 280.798 96.7083 281.879 97.1641V96.0312C281.879 94.7682 281.482 93.8307 280.688 93.2188C279.906 92.5938 278.819 92.2812 277.426 92.2812C276.319 92.2812 275.245 92.4635 274.203 92.8281C273.174 93.1927 272.367 93.6224 271.781 94.1172ZM278.637 99.6836C277.165 99.6836 275.961 99.9766 275.023 100.562C274.099 101.148 273.637 101.962 273.637 103.004C273.637 104.02 274.008 104.788 274.75 105.309C275.492 105.816 276.449 106.07 277.621 106.07C278.507 106.07 279.32 105.901 280.062 105.562C280.818 105.224 281.423 104.807 281.879 104.312V100.289C281.215 99.8854 280.134 99.6836 278.637 99.6836ZM293.461 102.77V92.5547H289.145V89.1562H293.461V83.9609H297.66V89.1562H302.66V92.5547H297.66V101.637C297.66 101.728 297.66 101.858 297.66 102.027C297.66 103.147 297.686 103.909 297.738 104.312C297.803 104.716 297.966 105.022 298.227 105.23C298.513 105.452 298.812 105.595 299.125 105.66C299.438 105.725 299.906 105.758 300.531 105.758C301.143 105.758 301.788 105.693 302.465 105.562V109.039C301.358 109.273 300.238 109.391 299.105 109.391C297.113 109.391 295.655 108.928 294.73 108.004C294.197 107.418 293.852 106.793 293.695 106.129C293.539 105.465 293.461 104.345 293.461 102.77ZM304.945 99.0781C304.945 96.1094 305.948 93.6224 307.953 91.6172C309.958 89.612 312.432 88.6094 315.375 88.6094C317.315 88.6094 319.079 89.0586 320.668 89.957C322.27 90.8424 323.526 92.0859 324.438 93.6875C325.362 95.2891 325.824 97.0859 325.824 99.0781C325.824 101.07 325.362 102.867 324.438 104.469C323.526 106.07 322.27 107.32 320.668 108.219C319.079 109.117 317.315 109.566 315.375 109.566C313.435 109.566 311.671 109.117 310.082 108.219C308.493 107.32 307.237 106.07 306.312 104.469C305.401 102.867 304.945 101.07 304.945 99.0781ZM309.184 99.0781C309.184 100.992 309.75 102.581 310.883 103.844C312.029 105.094 313.526 105.719 315.375 105.719C317.198 105.719 318.689 105.087 319.848 103.824C321.007 102.561 321.586 100.979 321.586 99.0781C321.586 97.1901 321 95.6081 319.828 94.332C318.669 93.043 317.185 92.3984 315.375 92.3984C313.513 92.3984 312.016 93.0234 310.883 94.2734C309.75 95.5234 309.184 97.125 309.184 99.0781ZM340.57 88.9609V92.9258C340.141 92.7826 339.555 92.7109 338.812 92.7109C337.719 92.7109 336.768 92.8997 335.961 93.2773C335.167 93.6549 334.568 94.1497 334.164 94.7617V109H329.965V89.1562H333.773V91.0312C334.932 89.5208 336.586 88.7656 338.734 88.7656C339.607 88.7656 340.219 88.8307 340.57 88.9609Z"
        fill={textForeground}
      />
      <defs>
        <clipPath id="clip0_415_63">
          <rect width="352" height="133" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PageLogo;
