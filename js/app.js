Vue.component('nav-bar', {
    template: ' \
        <nav> \
            <div> \
                <a v-link="{ path: \'/\', exact: true }"><img class="investimize-logo"></a> \
            </div> \
            <div> \
                <input type="checkbox" id="hamburger"> \
                <label for="hamburger" class="hamburger"> \
                    <i></i><i></i><i></i><i></i> \
                </label> \
                <ul> \
                    <li><a v-link="{ path: \'/\', exact: true }">Introducing Investimize</a></li> \
                    <li><a v-link="{ path: \'/howitworks\' }">How it works</a></li> \
                    <li><a v-link="{ path: \'/whoweare\' }">Who we are</a></li> \
                    <li><a v-link="{ path: \'/app\' }">Get my portfolio</a></li> \
                </ul> \
            </div> \
        </nav>'
});

Vue.component('input-range', {
    props: ['min', 'max', 'step', 'tostring', 'value'],
    methods: {
        label: function(x) {
            return eval(this.tostring ? this.tostring : 'x');
        }
    },
    template: ' \
        <div class="input-range"> \
            <input v-model="value" value="{{value}}" min="{{min}}" max="{{max}}" step="{{step}}" type="range"> \
            <label>{{label(value)}}</label> \
        </div>'
});

Vue.component('double-input-range', {
    props: ['min', 'max', 'step', 'tostring', 'valueMin', 'valueMax', 'value'],
    data: function() { return { value: [NaN, NaN] }; },
    watch: {
        '[valueMin,valueMax]': function() {
            this.value = this.valueMin < this.valueMax ?
                [this.valueMin, this.valueMax] :
                [this.valueMax, this.valueMin];
        }
    },
    methods: {
        label: function(x) {
            return eval(this.tostring ? this.tostring : 'x');
        }
    },
    template: ' \
        <div class="input-range"> \
            <label>{{label(value[0])}}</label> \
            <input v-model="valueMin" value="{{valueMin}}" min="{{min}}" max="{{max}}" step="{{step}}" type="range"> \
            <input v-model="valueMax" value="{{valueMax}}" min="{{min}}" max="{{max}}" step="{{step}}" type="range"> \
            <label>{{label(value[1])}}</label> \
        </div>'
});

Vue.component('investimize-parameters', {
    props: ['params'],
    data: function() {
        return {
            collapsed: {
                content: false,
                region: false,
                sector: true,
                advanced: true
            }
        };
    },
    methods: {
        collapse: function(section) {
            this.collapsed[section] = !this.collapsed[section];
        }
    },
    template: ' \
        <table> \
        <tbody><tr> \
            <th><span class="hint-right"> \
                Yearly return \
                <i class="fa fa-question-circle"></i> \
                <span>The yearly return you would like on your portfolio.</span> \
            </span></th> \
            <th> \
                <input-range min="0.02" max="0.15" step="0.005" \
                    :value.sync="params[\'return\']" \
                tostring="(100 * x).toFixed(1)+\'%\'"></input-range> \
            </th> \
        </tr></tbody> \
        <tbody><tr> \
            <th><span class="hint-right"> \
                Weight \
                <i class="fa fa-question-circle"></i> \
                <span>The minimum and maximum weight of an ETF in your portfolio.</span> \
            </span></th> \
            <th> \
                <double-input-range min="0.01" max="0.4" step="0.01" \
                    :value-min="params.weight[0]" :value-max="params.weight[1]" \
                    :value.sync="params.weight" \
                tostring="(100 * x).toFixed(0)+\'%\'"></double-input-range> \
            </th> \
        </tr></tbody> \
        <tbody id="assetclass" :class="{\'collapsed\': collapsed.content}"> \
        <tr> \
            <th><span class="hint-right"> \
                Asset class \
                <i class="fa fa-question-circle"></i> \
                <span>The minimum and maximum percentage of stocks, bonds, cash and commodities in your portfolio.</span> \
            </span></th> \
            <th><div><a v-on:click="collapse(\'content\')"></a></div></th> \
        </tr> \
        <tr v-if="type != \'Real Estate\'" v-for="(type, range) in params.content"> \
            <td><div>{{type}}</div></td> \
            <td> \
                <double-input-range min="0" max="1" step="0.01" \
                    :value-min="range[0]" :value-max="range[1]" \
                    :value.sync="params.content[type]" \
                tostring="(100 * x).toFixed(0)+\'%\'"></double-input-range> \
            </td> \
        </tr></tbody> \
        <tbody id="region" :class="{\'collapsed\': collapsed.region}"> \
        <tr> \
            <th><span class="hint-right"> \
                Region \
                <i class="fa fa-question-circle"></i> \
                <span>The minimum and maximum weight of a geographical region in your portfolio.</span> \
            </span></th> \
            <th><div><a v-on:click="collapse(\'region\')"></a></div></th> \
        </tr> \
        <tr v-for="(type, range) in params.region"> \
            <td><div>{{type}}</div></td> \
            <td> \
                <double-input-range min="0" max="1" step="0.01" \
                    :value-min="range[0]" :value-max="range[1]" \
                    :value.sync="params.region[type]" \
                tostring="(100 * x).toFixed(0)+\'%\'"></double-input-range> \
            </td> \
        </tr></tbody> \
        <tbody id="sector" :class="{\'collapsed\': collapsed.sector}"> \
        <tr> \
            <th><span class="hint-right"> \
                Sector \
                <i class="fa fa-question-circle"></i> \
                <span>The minimum and maximum weight of an industry sector such as Healthcare in your portfolio.</span> \
            </span></th> \
            <th><a v-on:click="collapse(\'sector\')"></a></th> \
        </tr> \
        <tr v-for="(type, range) in params.sector"> \
            <td><div>{{type.replace(\' Services\', \'\')}}</div></td> \
            <td> \
                <double-input-range min="0" max="1" step="0.01" \
                    :value-min="range[0]" :value-max="range[1]" \
                    :value.sync="params.sector[type]" \
                tostring="(100 * x).toFixed(0)+\'%\'"></double-input-range> \
            </td> \
        </tr></tbody> \
        <tbody id="advanced" :class="{\'collapsed\': collapsed.advanced}"> \
        <tr> \
            <th>Advanced</th> \
            <th><div><a v-on:click="collapse(\'advanced\')"></a></div></th> \
        </tr> \
        <tr> \
            <td><div>Leveraged ETFs</div></td> \
            <td></td> \
        </tr><tr> \
            <td><div>Short ETFs</div></td> \
            <td></td> \
        </tr><tr> \
            <td><div>Backtesting</div></td> \
            <td></td> \
        </tr></tbody> \
        </table>'
});

var locale = d3.locale({
    decimal: '.',
    thousands: ' ',
    grouping: [3],
    currency: ['€', ''],
    dateTime: '',
    date: '',
    time: '',
    periods: [],
    days: [],
    shortDays: [],
    months: [],
    shortMonths: []
});

Vue.component('vis-graph', {
    props: ['solution', 'invested'],
    methods: {
        drawChart: function(x) {
            var chartData = [], chartLegend = [];
            this.solution.portfolio.forEach(function(etf) {
                var isin = etf.isin;
                var series = etf.timeseries;
                series = d3.zip(series.date, series.price).map(
                    function(arr) {
                        var obj = {};
                        obj.date = new Date(arr[0]);
                        obj.value = etf.weight * arr[1];
                        return obj;
                    });
                chartLegend.push(isin);
                chartData.push(series);
            });
            var date_format = d3.time.format("%B %Y");
            var value_format = locale.numberFormat('$n');
            MG.data_graphic({
                data: this.growth,
                //legend: chartLegend,
                description: 'This is the graph.',
                target: '#graph',
                x_accessor: 'date',
                y_accessor: 'value',
                yax_units: '€',
                height: 400,
                width: this.$el.offsetWidth,
                mouseover: function(d, i) {
                    d3.select('#graph svg .mg-active-datapoint').text(
                        date_format(d.date) + '   ' +
                        value_format(Math.round(100 * Math.round(d.value / 100))));
                }
            });
        }
    },
    computed: {
        growth: function() {
            var date = this.solution.portfolio[0].timeseries.date.map(
                function(date) { return new Date(date); });
            var invested = this.invested;
            var price = d3.zip.apply(null, this.solution.portfolio.map(
                function(etf) {
                    return etf.timeseries.price.map(function(price) {
                        return invested * etf.weight * price;
                    });
                })).map(function(prices) { return d3.sum(prices); });
            var growth = d3.zip(date, price).map(
                function(datum) {
                    return {date: datum[0], value: datum[1]};
                });
            return growth;
        }
    },
    watch: {
        solution: function() {
            // TODO: only draw chart if solution is not an empty object
            this.drawChart();
        }
    },
    template: '<div id="graph"></div>'
});

Vue.component('vis-table', {
    props: ['solution', 'invested'],
    methods: {
        computeInvested: function(weight) {
            var value_format = locale.numberFormat('$n');
            return value_format(Math.round(weight * this.invested));
        },
        abbrev: function(string) {
            if(string.match(/None|Multiple/)) {
                return '';
            }
            var abbrev = string.indexOf(' ') > -1 ? string.split(' ').map(
                function(string) {
                    return string.charAt(0);
                }).join('') : (string.charAt(0) + string.charAt(1)).toUpperCase();
            return abbrev;
        }
    },
    template: '\
            <table id="portfolio"> \
                <thead> \
                    <tr> \
                        <th></th> \
                        <th>Amount</th> \
                        <th>Investment</th> \
                        <th>Type</th> \
                        <th>Region</th> \
                    </tr> \
                </thead> \
                <tbody> \
                    <tr v-for="etf in solution.portfolio"> \
                        <td>{{ Math.round(100 * etf.weight)+\'%\' }}</td> \
                        <td>{{ computeInvested(etf.weight) }}</td> \
                        <td><div>{{ etf.metadata.name }}</div></td> \
                        <td><i class="hint-left abbrev" \
                                v-if="abbrev(etf.metadata.investimize_sector) || \
                                abbrev(etf.metadata.investimize_content)"> \
                                {{ abbrev(etf.metadata.investimize_sector) || \
                                abbrev(etf.metadata.investimize_content) }} \
                                <span>{{ abbrev(etf.metadata.investimize_sector) ? \
                                    etf.metadata.investimize_sector : \
                                    etf.metadata.investimize_content }}</span> \
                            </i></td> \
                        <td><i class="hint-left abbrev" \
                                v-if="abbrev(etf.metadata.investimize_region)">{{ abbrev(etf.metadata.investimize_region) }} \
                                <span>{{ etf.metadata.investimize_region }}</span> \
                            </i></td> \
                    </tr> \
                </tbody> \
          </table>'
});

var app = Vue.extend({
    http: {
        root: 'http://startup-master-mqxgysywwr.elasticbeanstalk.com/api/v0.1' // API root
    },
    data: function() {
        return {
            invested: 10000,
            params: {
                weight: [0.05, 0.25],
                'return': 0.10,
                backtest: 0,
                allow_short: false,
                allow_leveraged: true,
                content: {
                    'Stocks': [0.0, 1.0],
                    'Bonds': [0.0, 0.25],
                    'Cash': [0.0, 0.25],
                    'Commodities': [0.0, 1.0],
                    'Real Estate': [0.0, 1.0]
                },
                sector: {
                    'Communication Services': [0.0, 1.0],
                    'Consumer Cyclical': [0.0, 1.0],
                    'Consumer Defensive': [0.0, 1.0],
                    'Energy': [0.0, 1.0],
                    'Financial Services': [0.0, 1.0],
                    'Healthcare': [0.0, 1.0],
                    'Industrials': [0.0, 1.0],
                    'Technology': [0.0, 1.0],
                    'Utilities': [0.0, 1.0]
                },
                region: {
                    'Asia': [0.0, 0.66],
                    'Emerging': [0.0, 0.66],
                    'Europe': [0.1, 1.0],
                    'North America': [0.2, 1.0],
                    'Oceania': [0.0, 0.66]
                },
            },
            solution: {}
        };
    },
    methods: {
        stringify: function(val) {
                return JSON.stringify(val);
            },
        fetchPortfolio: function() {
                this.$http.post('portfolio?verbose=true', this.params).then(function(response) {
                    this.solution = response.data;
                }, function(response) {
                    console.log('error', response);
                });
            }
    },
    template: ' \
        <div class="vue-wrapper"> \
            <div id="input"> \
                <a style="display:none" class="investimize-logo" v-link="{ path: \'/\', exact: true }"> \
                    <img>\
                </a> \
                <investimize-parameters :params.sync="params"></investimize-parameters> \
                <a href="#" class="chiclet" onclick="return false" v-on:click="fetchPortfolio()">Update <i class="fa fa-chevron-circle-right"></i></a> \
            </div> \
            <div id="output"> \
                <div class="vis-row"> \
                    <div class="vis-col"> \
                        <vis-graph :solution="solution" :invested="invested"></vis-graph> \
                    </div> \
                    <div class="vis-col">Bar</div> \
                </div> \
                <vis-table :solution="solution" :invested="invested"></vis-table> \
            </div> \
        </div>'
});

var hero = Vue.extend({
    template: ' \
        <div class="vue-wrapper"> \
        <nav-bar></nav-bar> \
        <div id="hero" class="row"> \
            <div class="col"> \
                <h1>Investimize</h1> \
                <h2>Low cost passive investing, \
                algorithmically optimized to fit your preferences</h2> \
                <a class="chiclet nofocus" v-link="{ path: \'/app\' }">Get my portfolio <i class="fa fa-chevron-circle-right"></i></a>\
            </div> \
        </div> \
        <div id="features" class="slanted row"> \
            <div class="col"> \
                <img src="img/chip.svg"> \
                <h3>Optimized</h3> \
                <p>Our state-of-the-art algorithms search through nearly 10&nbsp;000 ETFs \
                to find the best possible portfolio for your situation. \
                Tell Investimize about your preferences and it will search for the best solution given your constraints. \
                <a v-link="{ path: \'/howitworks\' }">Learn&nbsp;more...</a></p> \
            </div> \
            <div class="col"> \
                <img src="img/globe.svg"> \
                <h3>Diversified</h3> \
                <p>Investimize diversifies your portfolio across geographical regions \
                as well as industries such as Healthcare, Technology and Utilities to minimize risk. \
                <a v-link="{ path: \'/howitworks\' }">Learn&nbsp;more...</a></p> \
            </div> \
            <div class="col"> \
                <img src="img/pricetag.svg"> \
                <h3>Low cost</h3> \
                <p>For any given index such as the MSCI World, there are many ETFs to choose from that track that index. \
                Investimize will select the most tax&nbsp;efficient and low&nbsp;cost of these alternatives for you. \
                <a v-link="{ path: \'/howitworks\' }">Learn&nbsp;more...</a></p> \
            </div> \
        </div> \
        <div id="featured" class="row"> \
            <div class="col"> \
                <h3 style="opacity:0.2">[What are our users saying?]</h3> \
            </div> \
        </div> \
        <div id="footer" class="slanted row"> \
            <div class="col"> \
                <div> \
                <h4>Get in touch with us on</h4> \
                <a href="https://twitter.com/investimize"><i class="fa fa-twitter"></i> Twitter</a><br> \
                <a href="https://www.facebook.com/investimize"><i class="fa fa-facebook"></i> Facebook</a><br> \
                <a href="https://plus.google.com/107358769257818283098"><i class="fa fa-google-plus"></i> Google+</a><br> \
                <a href="https://www.linkedin.com/company/investimize"><i class="fa fa-linkedin"></i> LinkedIn</a> \
                </div> \
            </div> \
            <div class="col"> \
                <div> \
                <h4>Drop us a line at</h4> \
                <a href="mailto:hello@investimize.com"> \
                    hello@investimize.com \
                </a> \
                </div> \
            </div> \
            <div class="col"> \
                <div> \
                <h4>Legal</h4> \
                <a href="#">Privacy policy</a><br> \
                <a href="#">Terms of use</a> \
                <p>Past performance is no guarantee of future results.</p> \
                </div> \
            </div> \
        </div> \
        </div>'
});

var whoweare = Vue.extend({
    template: '<nav-bar></nav-bar><p>Placeholder for the about us page.</p>'
});

var howitworks = Vue.extend({
    template: '<nav-bar></nav-bar><p>Placeholder for the FAQ.</p>'
});

var router = new VueRouter({
    linkActiveClass: 'active',
    hashbang: false,
    transitionOnLoad: true
});

router.map({
    '/': {
        component: hero
    },
    '/app': {
        component: app
    },
    '/whoweare': {
        component: whoweare
    },
    '/howitworks': {
        component: howitworks
    }
});

router.redirect({
    '*': '/'
})

var app = Vue.extend({});

router.start(app, '#app');
