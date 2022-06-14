<template>
  <div class="content">
    <div class="md-layout">
      <!-- <div
      class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
    >
      <stats-card data-background-color="green">
        <template slot="header">
          <b-icon icon="bag-fill"></b-icon>
        </template>

        <template slot="content">
          <p class="category">Revenue</p>
          <h3 class="title">$34,245</h3>
        </template>

        <template slot="footer">
          <div class="stats">
            Last 24 Hours
          </div>
        </template>
      </stats-card>
    </div>
    <div
      class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
    >
      <stats-card data-background-color="orange">
        <template slot="header">
          <b-icon icon="building"></b-icon>
        </template>

        <template slot="content">
          <p class="category">Used Space</p>
          <h3 class="title">
            49/50
            <small>GB</small>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <a href="#pablo">Get More Space...</a>
          </div>
        </template>
      </stats-card>
    </div>
    <div
      class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
    >
      <stats-card data-background-color="red">
        <template slot="header">
          <b-icon icon="bell-fill" ></b-icon>
        </template>

        <template slot="content">
          <p class="category">Fixed Issues</p>
          <h3 class="title">75</h3>
        </template>

        <template slot="footer">
          <div class="stats">
            Tracked from Github
          </div>
        </template>
      </stats-card>
    </div>
    <div
      class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
    >
      <stats-card data-background-color="green">
        <template slot="header">
          <b-icon icon="cash"></b-icon>
        </template>

        <template slot="content">
          <p class="category">Folowers</p>
          <h3 class="title">+245</h3>
        </template>

        <template slot="footer">
          <div class="stats">
            Just Updated
          </div>
        </template>
      </stats-card>
    </div> -->
    <apexchart type="pie" width="500" :options="chartOptions" :series="series"></apexchart>
    <apexchart type="polarArea" width="500" :options="chartOptions1" :series="series1"></apexchart>
    <apexchart type="line" height="350" width="500" :options="chartOptions2" :series="series2"></apexchart>
    <apexchart type="bar" height="350" width="500" :options="chartOptions3" :series="series3"></apexchart>
    <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <chart-card
          :chart-data="dailySalesChart.data"
          :chart-options="dailySalesChart.options"
          :chart-type="'Line'"
          data-background-color="green"
        >
        <template slot="content">
          <h4 class="title">Email Subscription</h4>
          <p class="category">
            Last Campaign Performance
          </p>
        </template>

        <template slot="footer">
          <div class="stats">
            <!-- <md-icon>access_time</md-icon> -->
            updated 10 days ago
          </div>
        </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <chart-card
          :chart-data="emailsSubscriptionChart.data"
          :chart-options="emailsSubscriptionChart.options"
          :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Email Subscription</h4>
            <p class="category">
              Last Campaign Performance
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              updated 10 days ago
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <chart-card
          :chart-data="dataCompletedTasksChart.data"
          :chart-options="dataCompletedTasksChart.options"
          :chart-type="'Line'"
          data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">Completed Tasks</h4>
            <p class="category">
              Last Campaign Performance
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              campaign sent 26 minutes ago
            </div>
          </template>
        </chart-card>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  mounted: function() {
  },
  data() {
    return {
      series3: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
          }],
          chartOptions3: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                'United States', 'China', 'Germany'
              ],
            }
          },
      series2: [{
            name: 'Website Blog',
            type: 'column',
            data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
          }, {
            name: 'Social Media',
            type: 'line',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
          }],
          chartOptions2: {
            chart: {
              height: 350,
              type: 'line',
            },
            stroke: {
              width: [0, 4]
            },
            title: {
              text: 'Traffic Sources'
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [1]
            },
            labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
            xaxis: {
              type: 'datetime'
            },
            yaxis: [{
              title: {
                text: 'Website Blog',
              },
            
            }, {
              opposite: true,
              title: {
                text: 'Social Media'
              }
            }]},
      series1: [14, 25, 21, 17, 15, 10, 12, 17, 21],
          chartOptions1: {
            chart: {
              type: 'polarArea',
            },
            stroke: {
              colors: ['#fff']
            },
            fill: {
              opacity: 0.8
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
      series: [44, 55, 13, 43, 22],
          chartOptions: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
      columnDefs: [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" }
      ],
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
      ],
      defaultColDef: {
        resizable: true
      },
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  }
};
</script>
