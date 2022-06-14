import $ from "jquery";
var XLSX = require("xlsx");
var FileSaver = require("file-saver");
import { mask } from "vue-the-mask";
export const print = {
  data() {
    return {
      limit: 50,
      print: false,
      height: 300,
      options: { pageSize: 50 },
      search: "",
      totalheight: 550,
      virtual: true,
      sending: false,
      changed: false,
      update_password:'',
      productlist: null,
      defaultHeight: 50
    };
  },
  directives: { mask },
  methods: {
    Sklad() {
      let self = this;
      axios
        .get("api/v1/sklads/id/" + localStorage.getItem("sklad_id"))
        .then(function(response) {
          self.update_password = response.data.update_password;
      });
    },
    Href(url) {
      this.$router.push({ path: url });
    },
    Resizable() {
      var pressed = false;
      var start = undefined;
      var startX, startWidth;

      $("table th").mousedown(function(e) {
        start = $(this);
        pressed = true;
        startX = e.pageX;
        startWidth = $(this).width();
        $(start).addClass("resizing");
        $(start).addClass("noSelect");
      });
      $(document).mousemove(function(e) {
        if (pressed) {
          $(start).width(startWidth + (e.pageX - startX));
          var table = $(e.target).parents("table");
          var th = table.find("tr:eq(0) th");
          var item = table.find("tbody tr");
          item.each(function() {
            $(this)
              .find("td")
              .each(function() {
                $(this).width(th.eq($(this).index()).width());
              });
          });
        }
      });

      $(document).mouseup(function() {
        if (pressed) {
          $(start).removeClass("resizing");
          $(start).removeClass("noSelect");
          pressed = false;
          // console.log('mouseuot');
        }
      });
    },
    Productlist() {
      let self = this;
      axios.get("api/v1/product/extra-name").then(response => {
        self.productlist = response.data;
      });
    },
    async downloadExl() {
      await this.Totalheight(99999);
      setTimeout(() => {
        let wb = XLSX.utils.table_to_book(document.getElementById("tableId")),
          wopts = {
            bookType: "xlsx",
            bookSST: false,
            type: "binary"
          },
          wbout = XLSX.write(wb, wopts);
        FileSaver.saveAs(
          new Blob([this.s2ab(wbout)], {
            type: "application/octet-stream;charset=utf-8"
          }),
          new Date() + ".xlsx"
        );
      }, 1000);
    },
    Next() {
      var self = $(":focus");
      var form = self.parents("form:eq(0)");
      var focusable = form.find("input,select,textarea");
      var next = focusable.eq(focusable.index(self) + 1);
      if (next.length && self.attr("class") == "vs__search") {
        next.focus();
      }
    },
    Setshtrix1(items) {
      axios({
        method: "get",
        url: "api/v1/product/id/" + items.product_id
      }).then(function(response) {
        if (response.data.shtrix_table[0]) {
          items.shtrix_kod = response.data.shtrix_table[0].shtrix_kod;
        }
        items.product = response.data;
      });
    },
    s2ab(s) {
      if (typeof ArrayBuffer !== "undefind") {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
    },
    async Print() {
      $(".e-content").css("height", "99999");
      await this.Totalheight(99999);
      setTimeout(() => {
        var head = $(".md-toolbar-section-start").html();
        if (head == undefined) {
          head = "";
        }
        var s = $(".content input")
          .eq(0)
          .val();
        var s1 = $(".content input")
          .eq(1)
          .val();
        if (
          $(".collapse")
            .not(".show")
            .attr("class") != undefined
        ) {
          $(".collapse")
            .not(".show")
            .remove();
        }
        let newstr = $(".content").html();
        window.document.body.innerHTML = head + newstr;
        $("input")
          .eq(0)
          .val(s);
        $("input")
          .eq(1)
          .val(s1);
        window.print();
        window.location.reload();
      }, 1000);
    },
    storeX(val) {
      this.$store.state.totatheight = val;
      return 1;
    },
    Totalheight(count) {
      $(".table-bordered")
        .find("tbody")
        .children()
        .scrollTop(0);
      this.totalheight = count;
    },
    Label(val) {
      if(this.productlist!=null){
        if (this.productlist.find(e => e.id == val) == undefined) {
          return "";
        } else {
          return this.productlist.find(e => e.id == val).extra_name;
        }
      }
    },
    Datetime(date) {
      var d = new Date(date * 1000);
      var dt = d.getDate();
      var month = d.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      if (dt < 10) {
        dt = "0" + dt;
      }

      return dt + "-" + month + "-" + d.getFullYear();
    },
    Date(date) {
      return this.Dates(date);
    },
    Dates(date) {
      var d = new Date(date * 1000);
      var dt = d.getDate();
      var month = d.getMonth() + 1;
      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      var sec = d.getSeconds();
      if (sec < 10) {
        sec = "0" + sec;
      }
      var min = d.getMinutes();
      if (min < 10) {
        min = "0" + min;
      }
      var hour = d.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      return (
        dt +
        "-" +
        month +
        "-" +
        d.getFullYear() +
        " " +
        hour +
        ":" +
        min +
        ":" +
        sec
      );
    }
  },
  mounted: function() {
    this.Productlist();
    setTimeout(() => {
      this.Resizable();
      this.Sklad();
    }, 3000);
  },
  computed: {
    paginated() {
      let self = this;
      let search = self.search;
      if (search.length > 2) {
        // const carHasCategory = typeof vm.car.category !== 'undefined';
        // return this.items.filter(item => {
        //   return item.categories.length === 0 || (carHasCategory && item.categories.some(cat => cat.id === this.car.category.id));
        // });
        return self.productlist;
        // .filter((user) => {
        //   let ss = user.id.toString();
        //     return user.extra_name.toLowerCase().includes(self.search.toLowerCase()) || ss.includes(self.search.toLowerCase());
        //   }).slice(0, self.limit);
      } else {
        return self.productlist.slice(0, self.limit);
      }
    }
  },
  watch: {
    search: function(val) {
      this.changed = true;
      // if (val.length > 2) {
      //   this.Searching();
      // }
    }
  }
};
