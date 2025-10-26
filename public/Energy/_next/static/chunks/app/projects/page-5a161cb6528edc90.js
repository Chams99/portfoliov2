(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [895],
  {
    8982: function (e, t, s) {
      Promise.resolve().then(s.bind(s, 6063));
    },
    6063: function (e, t, s) {
      "use strict";
      s.r(t),
        s.d(t, {
          default: function () {
            return n;
          },
        });
      var a = s(7437),
        i = s(4095),
        l = s(5933),
        r = s(675);
      function n() {
        return (0, a.jsxs)("main", {
          className: "min-h-screen",
          children: [
            (0, a.jsx)(i.Z, {}),
            (0, a.jsx)("section", {
              className: "pt-32 pb-16 bg-gradient-to-br from-blue-50 to-purple-50",
              children: (0, a.jsx)("div", {
                className: "container mx-auto px-4",
                children: (0, a.jsxs)(r.E.div, {
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  className: "text-center max-w-4xl mx-auto",
                  children: [
                    (0, a.jsxs)("h1", {
                      className: "text-4xl md:text-6xl font-bold text-gray-900 mb-6",
                      children: [
                        "Our ",
                        (0, a.jsx)("span", { className: "text-gradient", children: "Projects" }),
                      ],
                    }),
                    (0, a.jsx)("p", {
                      className: "text-xl text-gray-600 leading-relaxed",
                      children:
                        "Discover our portfolio of successful renewable energy projects that are powering California's sustainable future.",
                    }),
                  ],
                }),
              }),
            }),
            (0, a.jsx)("section", {
              className: "py-8 bg-white border-b",
              children: (0, a.jsx)("div", {
                className: "container mx-auto px-4",
                children: (0, a.jsxs)(r.E.div, {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  viewport: { once: !0 },
                  className: "flex flex-wrap justify-center gap-4",
                  children: [
                    (0, a.jsx)("a", {
                      href: "#commercial",
                      className:
                        "bg-blue-100 text-blue-600 hover:bg-blue-200 px-6 py-3 rounded-lg font-semibold transition-colors duration-200",
                      children: "Commercial",
                    }),
                    (0, a.jsx)("a", {
                      href: "#residential",
                      className:
                        "bg-green-100 text-green-600 hover:bg-green-200 px-6 py-3 rounded-lg font-semibold transition-colors duration-200",
                      children: "Residential",
                    }),
                    (0, a.jsx)("a", {
                      href: "#utility",
                      className:
                        "bg-purple-100 text-purple-600 hover:bg-purple-200 px-6 py-3 rounded-lg font-semibold transition-colors duration-200",
                      children: "Utility Scale",
                    }),
                  ],
                }),
              }),
            }),
            (0, a.jsx)("section", {
              id: "commercial",
              className: "py-16 bg-white",
              children: (0, a.jsxs)("div", {
                className: "container mx-auto px-4",
                children: [
                  (0, a.jsxs)(r.E.div, {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.6 },
                    viewport: { once: !0 },
                    className: "text-center mb-16",
                    children: [
                      (0, a.jsx)("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
                        children: "Commercial Projects",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-xl text-gray-600 max-w-3xl mx-auto",
                        children:
                          "Large-scale solar installations for businesses, warehouses, and commercial facilities.",
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
                    children: [
                      {
                        title: "Silicon Valley Tech Campus",
                        desc: "A 5MW solar installation for a major technology company, featuring advanced monitoring systems and energy storage integration. This project reduces the campus carbon footprint by 40%.",
                        capacity: "5 MW",
                        output: "7.5 GWh",
                        co2: "3,200 tons/year",
                        panels: "12,500",
                        color: "blue",
                      },
                      {
                        title: "Industrial Warehouse Complex",
                        desc: "A 3.2MW solar installation for a major logistics company, covering 8 warehouse rooftops and providing 85% of the facility's energy needs.",
                        capacity: "3.2 MW",
                        output: "4.8 GWh",
                        co2: "2,100 tons/year",
                        panels: "8",
                        color: "green",
                      },
                    ].map((e, t) =>
                      (0, a.jsxs)(
                        r.E.div,
                        {
                          initial: { opacity: 0, y: 50 },
                          whileInView: { opacity: 1, y: 0 },
                          transition: { duration: 0.6, delay: 0.2 * t },
                          viewport: { once: !0 },
                          className:
                            "bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300",
                          children: [
                            (0, a.jsx)("div", {
                              className: "h-64 bg-gradient-to-br from-blue-600 to-purple-600",
                            }),
                            (0, a.jsxs)("div", {
                              className: "p-8",
                              children: [
                                (0, a.jsxs)("div", {
                                  className: "flex items-center space-x-2 mb-4",
                                  children: [
                                    (0, a.jsx)("span", {
                                      className:
                                        "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold",
                                      children: "Commercial",
                                    }),
                                    (0, a.jsx)("span", {
                                      className: "text-gray-500 text-sm",
                                      children: "Completed 2023",
                                    }),
                                  ],
                                }),
                                (0, a.jsx)("h3", {
                                  className: "text-2xl font-bold text-gray-900 mb-4",
                                  children: e.title,
                                }),
                                (0, a.jsx)("p", {
                                  className: "text-gray-600 mb-6 leading-relaxed",
                                  children: e.desc,
                                }),
                                (0, a.jsxs)("div", {
                                  className: "grid grid-cols-2 gap-4 mb-6",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Capacity",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.capacity,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Annual Output",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.output,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "CO2 Reduction",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.co2,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Panels",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.panels,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, a.jsx)(r.E.a, {
                                  href: "#",
                                  className: "text-"
                                    .concat(e.color, "-600 hover:text-")
                                    .concat(e.color, "-700 font-semibold"),
                                  whileHover: { scale: 1.05 },
                                  whileTap: { scale: 0.95 },
                                  children: "View Details →",
                                }),
                              ],
                            }),
                          ],
                        },
                        e.title,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            (0, a.jsx)("section", {
              id: "residential",
              className: "py-16 bg-gray-50",
              children: (0, a.jsxs)("div", {
                className: "container mx-auto px-4",
                children: [
                  (0, a.jsxs)(r.E.div, {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.6 },
                    viewport: { once: !0 },
                    className: "text-center mb-16",
                    children: [
                      (0, a.jsx)("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
                        children: "Residential Projects",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-xl text-gray-600 max-w-3xl mx-auto",
                        children:
                          "Custom solar solutions for homeowners, from rooftop installations to energy storage systems.",
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
                    children: [
                      {
                        title: "Eco-Friendly Community",
                        desc: "A 200-home residential community with integrated solar panels and battery storage systems. Each home produces more energy than it consumes, creating a net-positive energy community.",
                        homes: "200",
                        capacity: "1.2 MW",
                        storage: "400 kWh",
                        energy: "+15%",
                        color: "green",
                      },
                      {
                        title: "Luxury Home Solar System",
                        desc: "A premium residential solar installation with battery backup and smart home integration. Features advanced monitoring and energy management systems.",
                        capacity: "15 kW",
                        storage: "20 kWh",
                        offset: "95%",
                        features: "Yes",
                        color: "purple",
                      },
                    ].map((e, t) =>
                      (0, a.jsxs)(
                        r.E.div,
                        {
                          initial: { opacity: 0, y: 50 },
                          whileInView: { opacity: 1, y: 0 },
                          transition: { duration: 0.6, delay: 0.2 * t },
                          viewport: { once: !0 },
                          className:
                            "bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300",
                          children: [
                            (0, a.jsx)("div", {
                              className: "h-64 bg-gradient-to-br from-green-600 to-blue-600",
                            }),
                            (0, a.jsxs)("div", {
                              className: "p-8",
                              children: [
                                (0, a.jsxs)("div", {
                                  className: "flex items-center space-x-2 mb-4",
                                  children: [
                                    (0, a.jsx)("span", {
                                      className:
                                        "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold",
                                      children: "Residential",
                                    }),
                                    (0, a.jsx)("span", {
                                      className: "text-gray-500 text-sm",
                                      children: "Completed 2024",
                                    }),
                                  ],
                                }),
                                (0, a.jsx)("h3", {
                                  className: "text-2xl font-bold text-gray-900 mb-4",
                                  children: e.title,
                                }),
                                (0, a.jsx)("p", {
                                  className: "text-gray-600 mb-6 leading-relaxed",
                                  children: e.desc,
                                }),
                                (0, a.jsxs)("div", {
                                  className: "grid grid-cols-2 gap-4 mb-6",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Capacity",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.capacity,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Battery Storage",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.storage,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Energy Offset",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.offset,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Smart Features",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.features,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, a.jsx)(r.E.a, {
                                  href: "#",
                                  className: "text-"
                                    .concat(e.color, "-600 hover:text-")
                                    .concat(e.color, "-700 font-semibold"),
                                  whileHover: { scale: 1.05 },
                                  whileTap: { scale: 0.95 },
                                  children: "View Details →",
                                }),
                              ],
                            }),
                          ],
                        },
                        e.title,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            (0, a.jsx)("section", {
              id: "utility",
              className: "py-16 bg-white",
              children: (0, a.jsxs)("div", {
                className: "container mx-auto px-4",
                children: [
                  (0, a.jsxs)(r.E.div, {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.6 },
                    viewport: { once: !0 },
                    className: "text-center mb-16",
                    children: [
                      (0, a.jsx)("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
                        children: "Utility Scale Projects",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-xl text-gray-600 max-w-3xl mx-auto",
                        children:
                          "Massive renewable energy projects that power entire communities and regions.",
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
                    children: [
                      {
                        title: "Central Valley Solar Farm",
                        desc: "A 50MW utility-scale solar farm providing clean energy to over 15,000 homes. Features advanced tracking systems and grid integration technology.",
                        capacity: "50 MW",
                        output: "75 GWh",
                        homes: "15,000",
                        acres: "300",
                        color: "orange",
                      },
                      {
                        title: "Desert Wind Farm",
                        desc: "A 100MW wind farm in the Mojave Desert, contributing to California's renewable energy goals. Features 40 state-of-the-art wind turbines.",
                        capacity: "100 MW",
                        output: "300 GWh",
                        turbines: "40",
                        homes: "30,000",
                        color: "blue",
                      },
                    ].map((e, t) =>
                      (0, a.jsxs)(
                        r.E.div,
                        {
                          initial: { opacity: 0, y: 50 },
                          whileInView: { opacity: 1, y: 0 },
                          transition: { duration: 0.6, delay: 0.2 * t },
                          viewport: { once: !0 },
                          className:
                            "bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300",
                          children: [
                            (0, a.jsx)("div", {
                              className: "h-64 bg-gradient-to-br from-orange-600 to-red-600",
                            }),
                            (0, a.jsxs)("div", {
                              className: "p-8",
                              children: [
                                (0, a.jsxs)("div", {
                                  className: "flex items-center space-x-2 mb-4",
                                  children: [
                                    (0, a.jsx)("span", {
                                      className:
                                        "bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold",
                                      children: "Utility Scale",
                                    }),
                                    (0, a.jsx)("span", {
                                      className: "text-gray-500 text-sm",
                                      children: "Completed 2023",
                                    }),
                                  ],
                                }),
                                (0, a.jsx)("h3", {
                                  className: "text-2xl font-bold text-gray-900 mb-4",
                                  children: e.title,
                                }),
                                (0, a.jsx)("p", {
                                  className: "text-gray-600 mb-6 leading-relaxed",
                                  children: e.desc,
                                }),
                                (0, a.jsxs)("div", {
                                  className: "grid grid-cols-2 gap-4 mb-6",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Capacity",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.capacity,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Annual Output",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.output,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Homes Powered",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.homes,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsx)("p", {
                                          className: "text-sm text-gray-500",
                                          children: "Acres",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "font-semibold text-gray-900",
                                          children: e.acres,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, a.jsx)(r.E.a, {
                                  href: "#",
                                  className: "text-"
                                    .concat(e.color, "-600 hover:text-")
                                    .concat(e.color, "-700 font-semibold"),
                                  whileHover: { scale: 1.05 },
                                  whileTap: { scale: 0.95 },
                                  children: "View Details →",
                                }),
                              ],
                            }),
                          ],
                        },
                        e.title,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            (0, a.jsx)("section", {
              className: "py-16 bg-gray-50",
              children: (0, a.jsxs)("div", {
                className: "container mx-auto px-4",
                children: [
                  (0, a.jsxs)(r.E.div, {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.6 },
                    viewport: { once: !0 },
                    className: "text-center mb-16",
                    children: [
                      (0, a.jsx)("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
                        children: "Project Impact",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-xl text-gray-600 max-w-3xl mx-auto",
                        children:
                          "Our projects are making a real difference in California's renewable energy landscape.",
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                    children: [
                      {
                        number: "500+",
                        label: "Projects Completed",
                        desc: "Across California and beyond",
                      },
                      { number: "50+", label: "MW Installed", desc: "Renewable energy capacity" },
                      {
                        number: "25,000+",
                        label: "Tons CO2 Reduced",
                        desc: "Annual carbon footprint reduction",
                      },
                      {
                        number: "98%",
                        label: "Client Satisfaction",
                        desc: "Based on project reviews",
                      },
                    ].map((e, t) =>
                      (0, a.jsxs)(
                        r.E.div,
                        {
                          initial: { opacity: 0, y: 50 },
                          whileInView: { opacity: 1, y: 0 },
                          transition: { duration: 0.6, delay: 0.1 * t },
                          viewport: { once: !0 },
                          className: "text-center",
                          children: [
                            (0, a.jsx)("div", {
                              className: "text-4xl md:text-5xl font-bold text-blue-600 mb-2",
                              children: e.number,
                            }),
                            (0, a.jsx)("p", {
                              className: "text-lg font-semibold text-gray-900 mb-2",
                              children: e.label,
                            }),
                            (0, a.jsx)("p", { className: "text-gray-600", children: e.desc }),
                          ],
                        },
                        e.label,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            (0, a.jsx)("section", {
              className: "py-16 bg-white",
              children: (0, a.jsxs)("div", {
                className: "container mx-auto px-4",
                children: [
                  (0, a.jsxs)(r.E.div, {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.6 },
                    viewport: { once: !0 },
                    className: "text-center mb-16",
                    children: [
                      (0, a.jsx)("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
                        children: "Our Project Process",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-xl text-gray-600 max-w-3xl mx-auto",
                        children:
                          "From initial consultation to project completion, we ensure every step is executed with precision.",
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                    children: [
                      {
                        step: "1",
                        title: "Consultation",
                        desc: "Initial meeting to understand your energy needs and project requirements.",
                      },
                      {
                        step: "2",
                        title: "Design",
                        desc: "Custom system design optimized for your specific location and energy goals.",
                      },
                      {
                        step: "3",
                        title: "Installation",
                        desc: "Professional installation by our certified technicians with minimal disruption.",
                      },
                      {
                        step: "4",
                        title: "Support",
                        desc: "Ongoing monitoring, maintenance, and support to ensure optimal performance.",
                      },
                    ].map((e, t) =>
                      (0, a.jsxs)(
                        r.E.div,
                        {
                          initial: { opacity: 0, y: 50 },
                          whileInView: { opacity: 1, y: 0 },
                          transition: { duration: 0.6, delay: 0.1 * t },
                          viewport: { once: !0 },
                          className: "text-center",
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4",
                              children: (0, a.jsx)("span", {
                                className: "text-white font-bold text-xl",
                                children: e.step,
                              }),
                            }),
                            (0, a.jsx)("h3", {
                              className: "text-xl font-bold text-gray-900 mb-2",
                              children: e.title,
                            }),
                            (0, a.jsx)("p", { className: "text-gray-600", children: e.desc }),
                          ],
                        },
                        e.step,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            (0, a.jsx)("section", {
              className: "py-16 bg-gradient-to-r from-blue-600 to-purple-600",
              children: (0, a.jsx)("div", {
                className: "container mx-auto px-4 text-center",
                children: (0, a.jsxs)(r.E.div, {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  viewport: { once: !0 },
                  children: [
                    (0, a.jsx)("h2", {
                      className: "text-3xl md:text-4xl font-bold text-white mb-6",
                      children: "Ready to Start Your Project?",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-xl text-blue-100 mb-8 max-w-2xl mx-auto",
                      children:
                        "Join hundreds of satisfied customers who have already made the switch to renewable energy.",
                    }),
                    (0, a.jsxs)("div", {
                      className: "flex flex-col sm:flex-row gap-4 justify-center",
                      children: [
                        (0, a.jsx)(r.E.a, {
                          href: "/contact",
                          className:
                            "bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200",
                          whileHover: { scale: 1.05 },
                          whileTap: { scale: 0.95 },
                          children: "Get Started Today",
                        }),
                        (0, a.jsx)(r.E.a, {
                          href: "/services",
                          className:
                            "border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200",
                          whileHover: { scale: 1.05 },
                          whileTap: { scale: 0.95 },
                          children: "Explore Services",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            (0, a.jsx)(l.Z, {}),
          ],
        });
      }
    },
  },
  function (e) {
    e.O(0, [153, 275, 971, 23, 744], function () {
      return e((e.s = 8982));
    }),
      (_N_E = e.O());
  },
]);
