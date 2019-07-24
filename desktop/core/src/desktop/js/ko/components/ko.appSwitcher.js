// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import $ from 'jquery';
import ko from 'knockout';

import componentUtils from 'ko/components/componentUtils';

const TEMPLATE = `
  <div class="hue-sidebar-header">
    <a class="hue-app-switcher-trigger" data-bind="toggle: open"><svg class="show"><use xlink:href="#hi-app-picker"></use></svg></a>
  </div>
  
  <div class="hue-app-switcher" data-bind="css: { 'open': open }">
    <h3>Cloudera Data Platform</h3>
    <ul data-bind="foreach: links">
      <li><a data-bind="attr: { href: url }"><i data-bind="html: svg"></i><span data-bind="text: label"></span></a></li>
    </ul>
  </div>
`;

const AppSwitcher = function AppSwitcher(params, element) {
  this.links = [
    {
      label: 'Home',
      svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><rect width="32" height="32" fill="#F96600" rx="3.176"></rect><path fill="#FFF" d="M11.886 18.757l-4.477 4.37c.366.485.758.95 1.193 1.375l4.382-4.278a6.006 6.006 0 0 1-1.098-1.467zm-.692-2.747c0-.07.008-.14.01-.21l-5.16 5.04c.259.576.565 1.126.91 1.65l4.597-4.488a5.802 5.802 0 0 1-.357-1.992zm1.79-4.214a6.164 6.164 0 0 1 4.317-1.749c1.684 0 3.211.669 4.317 1.749L26 7.518A12.415 12.415 0 0 0 17.301 4a12.415 12.415 0 0 0-8.698 3.518 11.917 11.917 0 0 0-3.247 5.67l4.527-4.42.554.54-5.332 5.206c-.062.491-.105.988-.105 1.496 0 .369.023.731.056 1.09l6.682-6.522.553.54-7.1 6.933c.121.693.304 1.364.542 2.01l5.657-5.522a5.93 5.93 0 0 1 1.595-2.743zm9.982 14.869A12.328 12.328 0 0 0 26 24.503l-.41-.4-2.624 2.562zm1.655-3.508l-4.695 4.583a12.39 12.39 0 0 0 1.126-.292l3.982-3.888-.413-.403zm-.969-.947L17.722 28c.293-.01.586-.018.874-.047l5.469-5.34-.413-.403zm-.97-.946l-6.827 6.666c.253.03.51.043.768.057l6.473-6.32-.413-.403zm-.968-.946l-7.486 7.31c.22.054.437.115.662.159l7.237-7.066-.413-.403zm-3.569 1.592l-5.383 5.256c.199.077.4.148.604.216l5.853-5.714a6.22 6.22 0 0 1-1.074.242zm-1.905-.033l-4.805 4.692c.18.096.37.175.557.262l4.992-4.873a6.191 6.191 0 0 1-.744-.08zm-1.477-.45l-4.518 4.412c.162.111.33.216.498.32l4.61-4.502a6.119 6.119 0 0 1-.59-.23zm-.72-.382l-4.435 4.33c-.152-.12-.297-.247-.444-.374l4.394-4.29c.156.12.317.23.485.334z"></path></g></svg>',
      url: 'https://console.thunderhead-dev.cloudera.com/cdp.html#/'
    },
    {
      label: 'Management Console',
      svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><rect width="32" height="32" fill="#006EE3" rx="3.176"></rect><path fill="#FFF" d="M17.27 16.692h-2.54l-.222-1.296a5.04 5.04 0 0 1-.755-.305l-1.097.764-1.797-1.751.784-1.07a4.626 4.626 0 0 1-.313-.734L10 12.083V9.608l1.33-.217c.082-.252.187-.498.313-.734l-.784-1.069 1.797-1.751 1.097.764a4.85 4.85 0 0 1 .755-.306L14.73 5h2.54l.222 1.295c.26.081.513.183.755.306l1.097-.764 1.797 1.751-.784 1.069c.126.236.23.482.313.734l1.33.217v2.475l-1.33.217a4.521 4.521 0 0 1-.313.735l.784 1.069-1.797 1.75-1.097-.763a5.04 5.04 0 0 1-.755.305l-.222 1.296zM16 13.769c1.655 0 3-1.311 3-2.923s-1.345-2.923-3-2.923-3 1.31-3 2.923c0 1.612 1.345 2.923 3 2.923zm5.68 2.923l3.32 1.95-1.89 1.11-.81.477-.13.078-1.76 1.032-.81.469v.009l-1.89 1.09L16 23.913l-1.71-1.004-1.89-1.091v-.01l-.81-.468-1.759-1.032-.131-.078-.81-.478L7 18.641l3.32-1.95 1.89 1.111-1.44.84L16 21.708l5.23-3.068-1.44-.839.62-.36 1.27-.75zM16 24.934l7.241-4.238L25 21.73 16 27l-9-5.27 1.76-1.034L16 24.934z"></path></g></svg>',
      url: 'https://cloudera.dps.mow-dev.cloudera.com/cloud/environments'
    },
    {
      label: 'Data Catalog',
      svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><rect width="32" height="32" fill="#D99F18" rx="3.176"></rect><path fill="#FFF" d="M17.65 15.112a3.031 3.031 0 0 1 0 6.062 3.03 3.03 0 0 1-3.021-3.036 3.028 3.028 0 0 1 3.021-3.026zm4.135 5.79a4.973 4.973 0 0 0-4.135-7.729c-2.73 0-4.957 2.23-4.957 4.965 0 2.745 2.227 4.976 4.957 4.976a4.961 4.961 0 0 0 2.76-.834l3.215 3.22L25 24.123l-3.215-3.221zM9.198 8.799c.735-.282 2.236-.592 4.464-.592 2.226 0 3.727.31 4.463.592-2.372.765-6.555.765-8.927 0zM13.662 6.5C11.657 6.5 7 6.752 7 9.002v10.281c0 .95.833 1.648 2.459 2.056.959.243 2.188.398 3.515.436a5.88 5.88 0 0 1-.939-1.755c-1.976-.155-3.099-.562-3.331-.815v-1.881c.871.281 1.917.475 3.03.572.02-.505.098-.979.242-1.445-1.268-.098-2.439-.33-3.272-.679v-2.124c1.219.398 2.807.62 4.425.659a6.107 6.107 0 0 1 1.926-1.503c-2.295.164-4.86-.078-6.351-.699v-1.939c1.355.446 3.156.669 4.958.669 1.8 0 3.601-.223 4.957-.669v2.124c.29.039.581.106.852.204.3.097.58.213.852.348v-3.84c0-2.25-4.657-2.502-6.661-2.502z"></path></g></svg>',
      url: 'https://cloudera.dps.mow-dev.cloudera.com/dss/catalog/search'
    },
    {
      label: 'Data Warehouse',
      svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><rect width="32" height="32" fill="#6F47BF" rx="3.176"></rect><path fill="#FFF" d="M18.666 18.666a6.711 6.711 0 0 1-9.475 0c-1.73-1.731-2.29-4.177-1.725-6.394l3.482 3.483c.112.111.253.19.407.225l4.882 1.11a.836.836 0 0 0 1.003-1.003l-1.11-4.882a.844.844 0 0 0-.226-.407l-3.4-3.4c2.152-.465 4.49.124 6.162 1.793a6.708 6.708 0 0 1 0 9.475zm-4.093-6.75l.738 3.245-3.246-.738 2.508-2.507zm-3.733 1.363l-2.612-2.612 2.588-2.588 2.613 2.612-2.59 2.588zm10.14 6.122c2.718-3.501 2.478-8.574-.735-11.788-3.483-3.484-9.15-3.484-12.633 0-3.483 3.482-3.483 9.15 0 12.632a8.901 8.901 0 0 0 6.316 2.612 8.92 8.92 0 0 0 5.473-1.877L25.42 27 27 25.421l-6.02-6.02z"></path></g></svg>',
      url: 'https://cloudera.dps.mow-dev.cloudera.com/dwx/'
    },
    {
      label: 'Machine Learning',
      svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><rect width="32" height="32" fill="#1FCFB8" rx="3.176"></rect><path fill="#FFF" d="M22.014 6c1.2 0 2.212.344 2.934 1.056 1.745 1.755 1.245 5.277-.956 8.944 2.201 3.667 2.701 7.189.956 8.944-.722.712-1.734 1.056-2.934 1.056-1.645 0-3.624-.644-5.67-1.811a4.03 4.03 0 0 1-.344-.2 27.319 27.319 0 0 1-2.045-1.4 23.659 23.659 0 0 1-2.423-2.122 23.213 23.213 0 0 1-1.99-2.245 2.084 2.084 0 0 0-.133-.166c-.322-.478-1.09-1.69-1.402-2.056-2.2-3.667-2.7-7.189-.954-8.944C7.773 6.344 8.787 6 9.987 6c1.734 0 3.846.722 6.013 2.011.456.211 1.657 1.1 2.046 1.4a23.532 23.532 0 0 1 2.422 2.122 24.268 24.268 0 0 1 1.613 1.778c-.078.233-.956 1.356-1.323 1.889-.545-.7-1.156-1.4-1.856-2.1a21.084 21.084 0 0 0-2.558-2.189c-.066-.044-.2-.133-.355-.244a58.412 58.412 0 0 0-2.034-1.256c-.011 0-.023-.011-.023-.011l-.155-.078c-1.5-.755-2.823-1.1-3.79-1.1-.434 0-1.023.067-1.356.411-.7.69-.545 2.69.69 5.145l.088.178c.289.5.89 1.51 1.256 2.033-.011 0-.011.011-.011.011l.1.133a21.406 21.406 0 0 0 2.344 2.767 21.884 21.884 0 0 0 2.536 2.167v.01c.066.056.199.145.366.256.512.345 1.379.878 2.056 1.245l-.01.01c.01.012.022.012.033.012.011 0 .011 0 .021.011.212.111.401.211.556.278 1.324.6 2.48.889 3.358.889.433 0 1.022-.067 1.356-.411.722-.711.533-2.79-.778-5.323a23.535 23.535 0 0 1-2.124 2.423 19.831 19.831 0 0 1-1.633 1.477c-.6-.266-1.623-.744-2.201-1.066a21.206 21.206 0 0 0 2.268-1.978 21.493 21.493 0 0 0 2.444-2.9c.212-.289.878-1.411 1.235-2.067 0 .011 0 .011.01.023.056-.112.112-.223.156-.323.012-.033.033-.066.045-.089 1.134-2.344 1.256-4.244.578-4.91-.334-.345-.923-.412-1.356-.412-.867 0-2.001.278-3.301.856-.3-.345-1.258-1.178-1.935-1.511C18.668 6.556 20.491 6 22.014 6zM7.54 16.833c.356.534 1.067 1.511 1.49 1.99-.966 2.177-1.045 3.91-.4 4.544.333.344.923.41 1.355.41.857 0 1.969-.266 3.246-.833.39.445 1.112 1.212 1.767 1.59-1.81.943-3.543 1.466-5.012 1.466-1.2 0-2.212-.344-2.933-1.056-1.613-1.622-1.313-4.755.488-8.11zm5.658-6.81c.366.144.934.4 1.422.666.1.044.202.099.29.156.177.1.334.188.455.277A21.425 21.425 0 0 0 13.1 13.1a23.174 23.174 0 0 0-1.822 2.045 36.454 36.454 0 0 1-1.256-1.612c-.056-.077-.1-.133-.134-.177v-.011a22.612 22.612 0 0 1 1.644-1.812c.545-.544 1.1-1.055 1.668-1.51zM16 13.774c.567 0 1.134.22 1.568.658a2.193 2.193 0 0 1 0 3.134 2.196 2.196 0 0 1-3.135 0 2.193 2.193 0 0 1 0-3.134A2.2 2.2 0 0 1 16 13.774z"></path></g></svg>',
      url: 'https://cloudera.dps.mow-dev.cloudera.com/mlx/'
    },
    {
      label: 'Workload Manager',
      svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><rect width="32" height="32" fill="#2E2EE6" rx="3.176"></rect><path fill="#FFF" d="M14 24h4V8h-4v16zm8 0h4V12h-4v12zM6 24h4v-8H6v8z"></path></g></svg>',
      url: 'https://console.thunderhead-dev.cloudera.com/wxm/'
    },
    {
      label: 'Replication Manager',
      svg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><g fill="none" fill-rule="evenodd"><rect width="32" height="32" fill="#4B8AA3" rx="3.176"></rect><path fill="#FFF" d="M15 7v3h2V9h7v7h-2v2h4V7H15zm-2 5v2h3.586l-4.95 4.95 1.414 1.414 4.95-4.95V19h2v-7h-7zm-7 2v11h11v-4h-2v2H8v-7h3v-2H6z"></path></g></svg>',
      url: 'https://cloudera.dps.mow-dev.cloudera.com/dlm/'
    }
  ];

  this.open = ko.observable(false);

  const closeOnClickOutside = event => {
    if (!this.open()) {
      return;
    }
    if (
      $.contains(document, event.target) &&
      !$.contains($('.hue-app-switcher')[0], event.target)
    ) {
      this.open(false);
    }
  };

  this.open.subscribe(newVal => {
    if (newVal) {
      window.setTimeout(() => {
        $(document).on('click', closeOnClickOutside);
      }, 0);
    } else {
      $(document).off('click', closeOnClickOutside);
    }
  });
};

componentUtils.registerComponent(
  'hue-app-switcher',
  {
    createViewModel: function(params, componentInfo) {
      return new AppSwitcher(params, componentInfo.element);
    }
  },
  TEMPLATE
);
