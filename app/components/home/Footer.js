export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="footer p-10 bg-gray-100 text-gray-900">
      <aside>
        <svg
          width="40"
          height="39"
          viewBox="0 0 40 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3455 15.1446C7.97315 16.7603 5.35286 18.4855 5.03165 18.9112C12.5326 24.4785 10.9902 22.3569 14.2422 24.404L8.96783 24.2471C7.37786 23.3511 6.51595 22.8278 5.03165 21.8538C2.36963 20.3325 1.98616 19.2172 2.04016 19.0289C2.04016 19.0289 2.06612 18.4053 2.78562 17.6557C3.5251 16.8852 4.97341 15.9772 6.09442 15.1446H10.3455Z"
            fill="black"
          />
          <path
            d="M29.9094 15.1446C32.2817 16.7603 34.902 18.4855 35.2232 18.9112C27.7223 24.4785 29.0293 22.3176 25.7773 24.3648L31.287 24.2471C32.877 23.3511 33.7389 22.8278 35.2232 21.8538C37.8853 20.3325 38.2687 19.2172 38.2147 19.0289C38.2147 19.0289 38.1888 18.4053 37.4693 17.6557C36.7298 16.8852 35.2815 15.9772 34.1605 15.1446H29.9094Z"
            fill="black"
          />
          <rect
            x="10.201"
            y="8.94553"
            width="27.7783"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect
            x="26.8367"
            y="12.0843"
            width="12.3197"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect
            x="0.470825"
            y="11.3781"
            width="12.0059"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect
            y="24.6395"
            width="12.0059"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect x="3" y="29" width="11" height="2" rx="1" fill="black" />
          <rect
            x="9.88037"
            y="32.4247"
            width="8.23932"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect
            x="9.88037"
            y="32.4247"
            width="8.23932"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect
            x="16.4957"
            y="36.1209"
            width="5.58234"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect
            x="3.35156"
            y="6.33072"
            width="9.49483"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect
            x="8.099"
            y="1.24319"
            width="6.27758"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect
            x="12.0059"
            y="26.4443"
            width="26.2135"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect
            x="19.2869"
            y="30.4247"
            width="17.0774"
            height="2"
            rx="1"
            fill="black"
          />
          <path
            d="M20.2772 34.5233C20.2772 33.971 20.7249 33.5233 21.2772 33.5233H30.2772C30.8295 33.5233 31.2772 33.971 31.2772 34.5233V34.5233C31.2772 35.0756 30.8295 35.5233 30.2772 35.5233H25.7772H21.2772C20.7249 35.5233 20.2772 35.0756 20.2772 34.5233V34.5233Z"
            fill="black"
          />
          <rect
            x="12.0844"
            y="4.00195"
            width="22.8347"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <rect
            x="17.2709"
            y="0.941803"
            width="13.1829"
            height="2.19715"
            rx="1.09858"
            fill="black"
          />
          <circle
            cx="20.0882"
            cy="18.6758"
            r="4.9637"
            stroke="black"
            stroke-width="2"
          />
        </svg>

        <p>
          Usercache Admin Ltd
          <br />
          Record-keeping and document storage solution
          <br />
          {year} 	&#169;
          <br />
        Created By <a className="text-blue-700" href="https://www.owentaylor.dev">Owen Taylor</a>
        </p>
      </aside>
      <nav>
        <header className="footer-title">Social</header>
        <div className="grid grid-flow-col gap-4">
          <a href="https://twitter.com" target="blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a href="https://twitter.com" target="blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a href="https://twitter.com" target="blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
        
      </nav>
    </footer>
  );
}
