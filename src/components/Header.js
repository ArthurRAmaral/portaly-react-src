import React from "react";

const Headers = () => {
  return (
    <nav class="nav-extended  brown darken-1">
      <div class="nav-wrapper">
        <a href="/" class="brand-logo">
          Logo
        </a>
      </div>
      <div class="nav-content">
        <ul class="tabs tabs-transparent">
          <li class="tab">
            <a href="#test1">Test 1</a>
          </li>
          <li class="tab">
            <a class="active" href="#test2">
              Test 2
            </a>
          </li>
          <li class="tab disabled">
            <a href="#test3">Disabled Tab</a>
          </li>
          <li class="tab">
            <a href="#test4">Test 4</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Headers;
