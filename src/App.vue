<template>
  <router-view></router-view>
</template>
<script>
import $ from "jquery";
import SocketioService from './services/socketio.service.js';
export default {
  created(){
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
  mounted: function() {
    SocketioService.socket.on('new_message', (data) => {
  console.log(data);
});
    // this.sockets.subscribe('new_message', (data) => {
    // console.log('keldi'+data);
    // });
    // this.sockets.unsubscribe('new_message');
    
    let selfs = this.$router;
    //modalllistda qidiruvda ozgarishlar
    $("body").on("keydown", ".searchtable", function(e) {
      //tepa bosilganda  spiskada tepaga chiqish
      if (e.keyCode == 38) {
        $(this)
          .parents(".row")
          .find(".atable:eq(-3)")
          .focus();
        return false;
        //  past bosilganda spiskadan pasga tushis
      } else if (e.keyCode == 40) {
        $(this)
          .parents(".row")
          .find(".atable:eq(0)")
          .focus();
        return false;
        //enter bosilganda 1-spiskaga tushish
      } else if (e.keyCode == 13) {
        $(this)
          .parents(".row")
          .find(".atable:eq(0)")
          .focus();
      } else if (e.keyCode == 45) {
        $(this)
          .siblings(".mybtn")
          .click();
      } else {
        return true;
      }
    });
    //spiskada modalda trda ozgarishlar
    $("body").on("keydown", ".atable", function(e) {
      var self = $(this),
        table = self.parents("table:eq(0)"),
        focusable,
        focused,
        focusable = table.find(".atable");
      // past bosilsa keyingi qatorga tushish
      if (e.keyCode == 40) {
        focused = focusable.eq(focusable.index(this) + 1);
        focused.focus();
        if (focused.length) {
          var body = $(this).parents(".virtual");
          if (focusable.index(this) < 5) {
            focused.focus();
          } else {
            body.scrollTop(body.scrollTop() + 30);
            setTimeout(() => {
              focused.focus();
            }, 100);
          }
          return false;
          //    keyingisi bolmasa qidiruv inputga focus berish
        } else {
          $(".searchtable:eq(0)").focus();
        }
        //tepa bosilsa
      } else if (e.keyCode == 38) {
        var ind = focusable.index(this) - 1;
        focused = focusable.eq(ind);
        // tepasida bolamas qidiruvga focus berish
        if (ind < 0) {
          $(".searchtable").focus();
          // tepasida bolsa shunga otish
        } else if (focused.length) {
          var body = $(this).parents(".virtual");
          if (focusable.index(this) < 5) {
            focused.focus();
          } else {
            body.scrollTop(body.scrollTop() - 30);
            setTimeout(() => {
              focused.focus();
            }, 100);
          }
          return false;
        }
        //enter bosilsa tanlash
      } else if (e.keyCode == 13) {
        self.click();
        // f2 bosilsa
      } else if (e.keyCode == 113) {
        self
          .parents("tr")
          .find(".mybtn:eq(0)")
          .click();
      }
      // f3 bosilsa
      else if (e.keyCode == 114) {
        self
          .parents("tr")
          .find(".copy")
          .click();
      } else if (e.keyCode == 46) {
        self
          .parents("tr")
          .find(".mybtn:eq(1)")
          .click();
        $(".searchtable").focus();
      } else if (e.keyCode == 45) {
        $(".searchtable")
          .siblings(".mybtn")
          .click();
      } else {
        return true;
      }
      // return false;
    });
    //umumiy enter bosilsa keyingi maydonga otish
    $("body").on("keydown", "input, select, textarea", function(e) {
      var self = $(this),form = self.parents("form:eq(0)"),focusable,next,prev;
      if (e.ctrlKey) {
        if (e.keyCode == 13) {
          focusable = form.find("button.btn").filter(":visible").not(".addrow");
          prev = focusable.eq(0);
          if (prev.length) {
            prev.click();
          }
        }
      } else if (e.shiftKey) {
        if (e.keyCode == 13) {
          focusable = form.find("input,select,textarea,button").filter(":visible").not(".needt");
          prev = focusable.eq(focusable.index(this) - 1);
          if (prev.length) {
            prev.focus();
          }
        }
      } else if (e.keyCode == 13) {
        focusable = form.find("input,select,textarea,button").filter(":visible").not(".needt,.vs__clear");
        next = focusable.eq(focusable.index(this) + 1);
        if (next.attr("class") == "modallist") {
          if ($(this).siblings(".vs__selected").attr("class") != undefined || $(this).parents(".required").attr("class") == undefined) {
            next = focusable.eq(focusable.index(this) + 2);
            if (next.length) {
              next.focus();
            }
          } else {
            var nexts = focusable.eq(focusable.index(this) + 1);
            nexts.click();
          }
        } else if (next.length) {
          next.focus();
        }
      } else {
        return true;
      }
    });
    $("body").on("keydown", "button", function(e) {
      var self = $(this),
        form = self.parents(".content:eq(0)"),
        focusable,
        next,
        prev;
      focusable = form
        .find("input,select,textarea,button")
        .filter(":visible")
        .not(".needt,.vs__clear");
      if (e.keyCode == 39) {
        next = focusable.eq(focusable.index(this) + 1);
        if (next.length) {
          next.focus();
        }
      } else if (e.keyCode == 37) {
        next = focusable.eq(focusable.index(this) - 1);
        if (next.length) {
          next.focus();
        } else {
          $(".active").focus();
          return true;
        }
      } else if (e.keyCode == 13) {
        // if(self.find('a').length){
        var click = $(":focus").find("a");
        // }
      } else {
        return true;
      }
    });
    $("body").on("focus", "input", function(e) {
      $(this).select();
    });
    $("body").on("focus", ".vs__search", function(e) {
      var body = $(this)
        .parents("tbody")
        .children();
      setTimeout(() => {
        body.scrollTop(body.scrollTop() + 300);
      }, 1000);
    });

    $("body").on("keydown", ".vs__search", function(e) {
      var body = $(this)
        .parents("tbody")
        .children();
      var set1 = body.find("li:last-child").offset();
      var list = $(this)
        .parents(".v-select")
        .find(".modallist");
      var set = $(this)
        .parents(".v-select")
        .find(".pluss");
      // if (e.keyCode == 40 || e.keyCode == 38) {
      //     if (body.scrollTop() > 0) {
      //       set1 = $(this).scrollTop();
      //       setTimeout(() => {
      //         body.scrollTop(body.scrollTop() + 50);
      //       }, 100);
      //     }
      //   }
      //  f4 bosillsa
      // else
      if (e.keyCode == 115) {
        list.click();
        // ins bosilsa
      } else if (e.keyCode == 45) {
        set.click();
      } else if (e.keyCode == 39) {
        var form = $(this).parents("form:eq(0)");
        var focusable = form
          .find("input,select,textarea")
          .filter(":visible")
          .not(".needt,.vs__clear");
        var next = focusable.eq(focusable.index(this) + 1);
        next.focus();
      } else {
        return true;
      }
    });
    $("body").keydown(function(e) {
      // esc
      if (e.keyCode == 27) {
        if ($(this).attr("data-modal-open-count") != 1) {
          selfs.go(-1);
          return false;
        }
        // f1
      } else if (e.keyCode == 112) {
        if ($(".addrow").attr("class") != undefined) {
          $(".addrow").click();
          setTimeout(() => {
            $("tbody>div").scrollTop(10000);
          }, 500);
          return false;
        }
        // f9
      } else if (e.keyCode == 120) {
        if ($(".saved").attr("class") != undefined) {
          $(".saved").click();
          return false;
        }
      } else if(e.keyCode==45){
        if ($(".insert").attr("class") != undefined) {
          $(".insert").click();
          return false;
        }
      } else {
        return true;
      }
    });
  }
};
</script>
