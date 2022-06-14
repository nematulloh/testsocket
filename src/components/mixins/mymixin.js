import $ from "jquery";
export const toggle = {
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    Shovedform(modal) {
      if (this.$store.state.saved_modal == "update") {
        this.$store.state.saved_modal = null;
      }
      let self = this;
      self.$bvModal.hide(modal);
      $(document).on("focusout", function(e) {
        if ($(e.target).attr("class") == "vs__search") {
          self.focusset = e.target;
        }
      });
      self.$refs.inputText1.focus();
    },

    Shoved() {
      let self = this;
      $(document).on("focusout", function(e) {
        if ($(e.target).attr("class") == "vs__search") {
          self.focusset = e.target;
        }
      });
      if (self.sett == "create") {
        var set = document.getElementsByClassName("atable");
        $(".modal-open .modal").scrollTop(999999);
        set[set.length - 1].focus();
      } else if (self.sett == null) {
        self.$refs.inputText1.focus();
      } else if (self.sett >= 0) {
        var set = document.getElementsByClassName("atable");
        set[self.sett].focus();
      }
    },
    Hide() {
      let self = this;
      setTimeout(function(e) {
        var classs = $(":focus");
        var rrr = $("body")
          .find("input,select,textarea,button")
          .filter(":visible")
          .not(".needt,.vs__clear");
        if (classs.attr("class") == "modallist") {
          if (
            $(self.focusset)
              .siblings(".vs__selected")
              .attr("class") != undefined
          ) {
            var focused = rrr.eq(rrr.index(classs) + 1);
            focused.focus();
          } else {
            $(self.focusset).focus();
          }
        } else if (classs.attr("class") == "modal-content") {
          self.$refs.inputText1.focus();
        } else if (classs.attr("class") == undefined) {
          if (
            $(self.focusset)
              .siblings(".vs__selected")
              .attr("class") != undefined
          ) {
            focused = rrr.eq(rrr.index($(self.focusset)) + 2);
            focused.focus();
          } else {
            $(self.focusset).focus();
          }
        }
      }, 1000);
    }
  }
};
