"use strict";
(function () {
  let initialDate = new Date(),
    $document = $(document),
    $window = $(window),
    $html = $("html"),
    $body = $("body"),
    isDesktop = $html.hasClass("desktop"),
    isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
    windowReady = false,
    isNoviBuilder = false,
    livedemo = true,
    plugins = {
      rdNavbar: $(".rd-navbar"),
    };

  /**
   * @desc Check the element was been scrolled into the view
   * @param {object} elem - jQuery object
   * @return {boolean}
   */
  function isScrolledIntoView(elem) {
    if (isNoviBuilder) return true;
    return (
      elem.offset().top + elem.outerHeight() >= $window.scrollTop() &&
      elem.offset().top <= $window.scrollTop() + $window.height()
    );
  }

  // Initialize scripts that require a finished document
  $(function () {
    isNoviBuilder = window.xMode;

    /**
     * Wrapper to eliminate json errors
     * @param {string} str - JSON string
     * @returns {object} - parsed or empty object
     */
    function parseJSON(str) {
      try {
        if (str) return JSON.parse(str);
        else return {};
      } catch (error) {
        console.warn(error);
        return {};
      }
    }

    // UI To Top
    if (isDesktop && !isNoviBuilder) {
      $().UItoTop({
        easingType: "easeOutQuad",
        containerClass: "ui-to-top fa fa-angle-up",
      });
    }

    // Navbar
    if (plugins.rdNavbar.length) {
      let navbar = plugins.rdNavbar,
        aliases = {
          "-": 0,
          "-sm-": 576,
          "-md-": 768,
          "-lg-": 992,
          "-xl-": 1200,
          "-xxl-": 1600,
        },
        responsive = {},
        navItems = $(".rd-nav-item");

      for (let i = 0; i < navItems.length; i++) {
        let node = navItems[i];

        if (node.classList.contains("opened")) {
          node.classList.remove("opened");
        }
      }

      for (let alias in aliases) {
        let link = (responsive[aliases[alias]] = {});
        if (navbar.attr("data" + alias + "layout"))
          link.layout = navbar.attr("data" + alias + "layout");
        if (navbar.attr("data" + alias + "device-layout"))
          link.deviceLayout = navbar.attr("data" + alias + "device-layout");
        if (navbar.attr("data" + alias + "hover-on"))
          link.focusOnHover =
            navbar.attr("data" + alias + "hover-on") === "true";
        if (navbar.attr("data" + alias + "auto-height"))
          link.autoHeight =
            navbar.attr("data" + alias + "auto-height") === "true";
        if (navbar.attr("data" + alias + "stick-up-offset"))
          link.stickUpOffset = navbar.attr("data" + alias + "stick-up-offset");
        if (navbar.attr("data" + alias + "stick-up"))
          link.stickUp = navbar.attr("data" + alias + "stick-up") === "true";
        if (isNoviBuilder) link.stickUp = false;
        else if (navbar.attr("data" + alias + "stick-up"))
          link.stickUp = navbar.attr("data" + alias + "stick-up") === "true";
      }

      plugins.rdNavbar.RDNavbar({
        anchorNav: !isNoviBuilder,
        stickUpClone:
          plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder
            ? plugins.rdNavbar.attr("data-stick-up-clone") === "true"
            : false,
        responsive: responsive,
        callbacks: {
          onStuck: function () {
            let navbarSearch = this.$element.find(".rd-search input");

            if (navbarSearch) {
              navbarSearch.val("").trigger("propertychange");
            }
          },
          onDropdownOver: function () {
            return !isNoviBuilder;
          },
          onUnstuck: function () {
            if (this.$clone === null) return;

            let navbarSearch = this.$clone.find(".rd-search input");

            if (navbarSearch) {
              navbarSearch.val("").trigger("propertychange");
              navbarSearch.trigger("blur");
            }
          },
        },
      });
    }
  });
})();
