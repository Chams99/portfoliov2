(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [301],
  {
    8560: function (e, t, i) {
      Promise.resolve().then(i.bind(i, 3698));
    },
    3698: function (e, t, i) {
      "use strict";
      i.r(t),
        i.d(t, {
          default: function () {
            return r;
          },
        });
      var a = i(7437),
        n = i(4095),
        s = i(5933),
        l = i(675);
      function r() {
        return (0, a.jsxs)("main", {
          className: "min-h-screen",
          children: [
            (0, a.jsx)(n.Z, {}),
            (0, a.jsx)("section", {
              className: "pt-32 pb-16 bg-gradient-to-br from-blue-50 to-purple-50",
              children: (0, a.jsx)("div", {
                className: "container mx-auto px-4",
                children: (0, a.jsxs)(l.E.div, {
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  className: "text-center max-w-4xl mx-auto",
                  children: [
                    (0, a.jsxs)("h1", {
                      className: "text-4xl md:text-6xl font-bold text-gray-900 mb-6",
                      children: [
                        "About ",
                        (0, a.jsx)("span", { className: "text-gradient", children: "Energy" }),
                      ],
                    }),
                    (0, a.jsx)("p", {
                      className: "text-xl text-gray-600 leading-relaxed",
                      children:
                        "Leading the transition to renewable energy with innovative solutions and unwavering commitment to sustainability.",
                    }),
                  ],
                }),
              }),
            }),
            (0, a.jsx)("section", {
              className: "py-16 bg-white",
              children: (0, a.jsx)("div", {
                className: "container mx-auto px-4",
                children: (0, a.jsxs)("div", {
                  className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                  children: [
                    (0, a.jsxs)(l.E.div, {
                      initial: { opacity: 0, x: -50 },
                      whileInView: { opacity: 1, x: 0 },
                      transition: { duration: 0.6 },
                      viewport: { once: !0 },
                      children: [
                        (0, a.jsx)("h2", {
                          className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
                          children: "Our Mission",
                        }),
                        (0, a.jsx)("p", {
                          className: "text-lg text-gray-600 mb-6 leading-relaxed",
                          children:
                            "To accelerate the adoption of renewable energy technologies across California and beyond, making clean energy accessible, affordable, and reliable for all communities.",
                        }),
                        (0, a.jsx)("p", {
                          className: "text-lg text-gray-600 leading-relaxed",
                          children:
                            "We believe that sustainable energy solutions are not just environmentally responsible, but economically smart and socially beneficial for future generations.",
                        }),
                      ],
                    }),
                    (0, a.jsxs)(l.E.div, {
                      initial: { opacity: 0, x: 50 },
                      whileInView: { opacity: 1, x: 0 },
                      transition: { duration: 0.6 },
                      viewport: { once: !0 },
                      className:
                        "bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white",
                      children: [
                        (0, a.jsx)("h3", {
                          className: "text-2xl font-bold mb-4",
                          children: "Our Vision",
                        }),
                        (0, a.jsx)("p", {
                          className: "text-blue-100 leading-relaxed",
                          children:
                            "A future where renewable energy powers every home, business, and community, creating a sustainable world for generations to come.",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            (0, a.jsx)("section", {
              className: "py-16 bg-gray-50",
              children: (0, a.jsxs)("div", {
                className: "container mx-auto px-4",
                children: [
                  (0, a.jsxs)(l.E.div, {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.6 },
                    viewport: { once: !0 },
                    className: "text-center mb-16",
                    children: [
                      (0, a.jsx)("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
                        children: "Our Story",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-xl text-gray-600 max-w-3xl mx-auto",
                        children:
                          "From humble beginnings to industry leadership, discover the journey that shaped Energy.",
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                    children: [
                      {
                        year: "2009",
                        title: "Founded",
                        desc: "Started as a small solar installation company in Northern California with a vision for clean energy.",
                      },
                      {
                        year: "2015",
                        title: "Expansion",
                        desc: "Expanded services to include wind energy and energy storage solutions across California.",
                      },
                      {
                        year: "2024",
                        title: "Leadership",
                        desc: "Became a leading renewable energy provider with 500+ projects and 50MW+ capacity.",
                      },
                    ].map((e, t) =>
                      (0, a.jsxs)(
                        l.E.div,
                        {
                          initial: { opacity: 0, y: 50 },
                          whileInView: { opacity: 1, y: 0 },
                          transition: { duration: 0.6, delay: 0.2 * t },
                          viewport: { once: !0 },
                          className: "text-center",
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4",
                              children: (0, a.jsx)("span", {
                                className: "text-white font-bold text-xl",
                                children: e.year,
                              }),
                            }),
                            (0, a.jsx)("h3", {
                              className: "text-xl font-bold text-gray-900 mb-2",
                              children: e.title,
                            }),
                            (0, a.jsx)("p", { className: "text-gray-600", children: e.desc }),
                          ],
                        },
                        e.year,
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
                  (0, a.jsxs)(l.E.div, {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.6 },
                    viewport: { once: !0 },
                    className: "text-center mb-16",
                    children: [
                      (0, a.jsx)("h2", {
                        className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
                        children: "Our Values",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-xl text-gray-600 max-w-3xl mx-auto",
                        children: "The principles that guide everything we do at Energy.",
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                    children: [
                      {
                        title: "Sustainability",
                        desc: "Committed to environmental stewardship and sustainable practices in all our operations.",
                      },
                      {
                        title: "Excellence",
                        desc: "Striving for excellence in every project, from design to installation and maintenance.",
                      },
                      {
                        title: "Community",
                        desc: "Building stronger communities through renewable energy and local partnerships.",
                      },
                      {
                        title: "Innovation",
                        desc: "Embracing cutting-edge technology to deliver the best renewable energy solutions.",
                      },
                    ].map((e, t) =>
                      (0, a.jsxs)(
                        l.E.div,
                        {
                          initial: { opacity: 0, y: 50 },
                          whileInView: { opacity: 1, y: 0 },
                          transition: { duration: 0.6, delay: 0.1 * t },
                          viewport: { once: !0 },
                          className: "text-center",
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4",
                              children: (0, a.jsx)("svg", {
                                className: "w-8 h-8 text-blue-600",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: (0, a.jsx)("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: 2,
                                  d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                                }),
                              }),
                            }),
                            (0, a.jsx)("h3", {
                              className: "text-xl font-bold text-gray-900 mb-2",
                              children: e.title,
                            }),
                            (0, a.jsx)("p", { className: "text-gray-600", children: e.desc }),
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
              className: "py-16 bg-gradient-to-r from-blue-600 to-purple-600",
              children: (0, a.jsx)("div", {
                className: "container mx-auto px-4 text-center",
                children: (0, a.jsxs)(l.E.div, {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  viewport: { once: !0 },
                  children: [
                    (0, a.jsx)("h2", {
                      className: "text-3xl md:text-4xl font-bold text-white mb-6",
                      children: "Ready to Join the Clean Energy Revolution?",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-xl text-blue-100 mb-8 max-w-2xl mx-auto",
                      children:
                        "Let's work together to build a sustainable future for your community.",
                    }),
                    (0, a.jsxs)("div", {
                      className: "flex flex-col sm:flex-row gap-4 justify-center",
                      children: [
                        (0, a.jsx)(l.E.a, {
                          href: "/contact",
                          className:
                            "bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200",
                          whileHover: { scale: 1.05 },
                          whileTap: { scale: 0.95 },
                          children: "Get Started Today",
                        }),
                        (0, a.jsx)(l.E.a, {
                          href: "/team",
                          className:
                            "border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200",
                          whileHover: { scale: 1.05 },
                          whileTap: { scale: 0.95 },
                          children: "Meet Our Team",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            (0, a.jsx)(s.Z, {}),
          ],
        });
      }
    },
  },
  function (e) {
    e.O(0, [153, 275, 971, 23, 744], function () {
      return e((e.s = 8560));
    }),
      (_N_E = e.O());
  },
]);
