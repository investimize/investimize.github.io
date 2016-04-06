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
                    <li><a v-alink="{ path: \'/howitworks\' }">How it works</a></li> \
                    <li><a v-alink="{ path: \'/whoweare\' }">Who we are</a></li> \
                    <li><a v-link="{ path: \'/app\' }">Get my portfolio</a></li> \
                </ul> \
            </div> \
        </nav>'
});

Vue.component('input-checkbox', {
    props: ['name', 'value'],
    template: ' \
        <div class="input-checkbox" style="margin-left: 2em"> \
            <input type="checkbox" id="{{name}}" v-model="value"> \
            <label for="{{name}}">{{ value ? "Enabled" : "Disabled" }}</label> \
        </div>'
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
    props: ['params', 'invested'],
    data: function() {
        return {
            collapsed: {
                content: false,
                region: true,
                sector: true,
                advanced: true
            },
            foo: true
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
                Amount \
                <i class="fa fa-question-circle"></i> \
                <span>How much you would like to invest.</span> \
            </span></th> \
            <th> \
                <input-range min="1000" max="100000" step="1000" \
                    :value.sync="invested" \
                tostring="\'€\'+d3.formatPrefix(x).scale(x)+d3.formatPrefix(x).symbol"></input-range> \
            </th> \
        </tr></tbody> \
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
                <span>The minimum and maximum percentage of an ETF in your portfolio.</span> \
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
                <span>The minimum and maximum percentage of a geographical region in your portfolio.</span> \
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
                <span>The minimum and maximum percentage of an industry sector such as Healthcare in your portfolio.</span> \
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
        <tbody id="advanced"> \
        <tr> \
            <th>Advanced</th> \
            <th><a v-on:click="collapse(\'advanced\')"></a></th> \
        </tr> \
        <tr> \
            <td><span class="hint-right"> \
                Backtest \
                <i class="fa fa-question-circle"></i> \
                <span>The number of months to backtest the algorithm on.</span> \
            </span></td> \
            <td> \
                <input-range min="0" max="36" step="1" \
                    :value.sync="params.backtest" \
                    tostring="x+\'m\'" \
                ></input-range> \
            </td> \
        </tr> \
        <tr> \
            <td><span class="hint-right"> \
                Short ETFs \
                <i class="fa fa-question-circle"></i> \
                <span>Allow ETFs in the portfolio that short their positions. \
                Not recommended unless you know what you are doing.</span> \
            </span></td> \
            <td> \
                <input-checkbox name="allow_short" \
                    :value.sync="params.allow_short" \
                ></input-range> \
            </td> \
        </tr> \
        <tr> \
            <td><span class="hint-right"> \
                Leveraged ETFs \
                <i class="fa fa-question-circle"></i> \
                <span>Allow ETFs in the portfolio that leverage their positions. \
                Not recommended unless you know what you are doing.</span> \
            </span></td> \
            <td> \
                <input-checkbox name="allow_leveraged" \
                    :value.sync="params.allow_leveraged" \
                ></input-range> \
            </td> \
        </tr> \
        </tbody> \
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
    props: ['params', 'solution', 'benchmarks', 'invested'],
    data: function() {
        return {
            chartData: {
                portfolioCurve: [],
                etfCurves: [],
                benchmarkCurves: []
            }
        };
    },
    computed: {
        benchmarkCurves: function() {
            return this.benchmarks.map(
                function(benchmark) {
                    return d3.zip(benchmark.timeseries.date,
                        benchmark.timeseries.price).map(
                        function(arr) {
                            return {date: new Date(arr[0]), value: arr[1]};
                        });
                });
        },
        benchmarkCurvesInvested: function() {
            var invested = this.invested;
            return this.benchmarkCurves.map(
                function(benchmarkCurve) {
                    return benchmarkCurve.map(
                        function(datum) {
                            return {date: datum.date, value: invested * datum.value};
                        });
                });
        },
        etfCurves: function() {
            return this.solution.portfolio.map(
                function(etf) {
                    return d3.zip(etf.timeseries.date,
                        etf.timeseries.price).map(
                        function(arr) {
                            return {date: new Date(arr[0]), value: etf.weight * arr[1]};
                        });
                });
        },
        etfCurvesInvested: function() {
            var invested = this.invested;
            return this.etfCurves.map(
                function(etfCurve) {
                    return etfCurve.map(
                        function(datum) {
                            return {date: datum.date, value: invested * datum.value};
                        });
                });
        },
        portfolioCurveInvested: function() {
            var dates = this.etfCurvesInvested[0].map(
                    function(datum) {
                        return datum.date;
                    });
            var prices = this.etfCurvesInvested.map(
                function(etfCurveInvested) {
                    return etfCurveInvested.map(
                        function(datum) {
                            return datum.value;
                        });
                });
            prices = d3.zip.apply(null, prices).map(
                function(prices) {
                    return d3.sum(prices);
                });
            return d3.zip(dates, prices).map(
                function(arr) {
                    return {date: arr[0], value: arr[1]};
                });
        }
    },
    methods: {
        drawChart: function() {
            var date_format = d3.time.format("%B %Y");
            var value_format = locale.numberFormat('$n');
            var markers = [
                {'date': new Date('2009-03-31'), 'label': 'Trough of the 2008 crisis'}
            ];
            if(this.params.backtest > 0) {
                markers.push({'date': this.portfolioCurveInvested[
                    this.portfolioCurveInvested.length - this.params.backtest].date,
                    'label': 'Backtest'});
            }
            MG.data_graphic({
                data: [this.benchmarkCurvesInvested[0], this.portfolioCurveInvested ? this.portfolioCurveInvested : []],
                legend: ['MSCI World', 'Portfolio'],
                show_tooltips: false,
                target: '#graph',
                x_accessor: 'date',
                y_accessor: 'value',
                yax_units: '€',
                height: 350,
                top: 40,
                right: 75,
                full_width: true,
                transition_on_update: false,
                aggregate_rollover: false, // TODO: set this to true and rewrite mouseover
                markers: markers,
                mouseover: function(d, i) {
                    var value_format = locale.numberFormat('$n');
                    var prefix = d3.formatPrefix(d.value);
                    d3.select('#graph svg .mg-active-datapoint').text(
                        this.legend[d.line_id - 1] + '  —  ' +
                        date_format(d.date) + '   ' +
                        value_format(Math.round(100 * Math.round(d.value / 100))));
                }
            });
        }
    },
    watch: {
        solution: function() {
            this.drawChart();
        },
        benchmarks: function() {
            this.drawChart();
        },
        invested: function() {
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
            weight = Math.round(weight * 100) / 100;
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
                        <td><div><a href="http://www.morningstar.be/be/etf/snapshot/snapshot.aspx?id={{etf.metadata.id.morningstar}}">\
                            {{ etf.metadata.name }}</a></div></td> \
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

Vue.component('questions', {
    data: function() {
        return {
            currentQuestion: 1,
            lastQuestion: 3,
            answers: {
                age: 24,
                plan: 'rich',
                targetReturn: 0.10,
                other: 100,
            }
        };
    },
    methods: {
        nextQuestion: function() {
            if (this.currentQuestion < this.lastQuestion) {
                this.currentQuestion = this.currentQuestion + 1;
            } else {
                this.$router.go({ path: 'app', query: this.answers });
            }
        },
        convertAnswersToParams: function () {
            console.log(this.params);
            // this.params['return'] = this.answers.targetReturn;
        }
    },
    template: ' \
            <div v-show="currentQuestion == 1"> \
                <h4>I am <input type="text" size="2" v-model="answers.age"> years old and plan to \
                <select v-model="answers.plan"> \
                  <option value="rich">become rich</option> \
                  <option value="marry">marry</option> \
                  <option value="retire">retire</option> \
                </select></h4> \
                <a class="chiclet nofocus" v-on:click="nextQuestion()">Next<i class="fa fa-chevron-circle-right"></i></a>\ \
            </div> \
            <div v-show="currentQuestion == 2"> \
                <h4>What is your target return?</h4> \
                <input type="text" size="2" v-model="answers.targetReturn"> \
                <a class="chiclet nofocus" v-on:click="nextQuestion()">Next<i class="fa fa-chevron-circle-right"></i></a>\ \
            </div> \
            <div v-show="currentQuestion == 3"> \
                <h4>A third question?</h4> \
                <input type="text" size="3" v-model="answers.other"> \
                <a class="chiclet nofocus" v-on:click="nextQuestion()">Next<i class="fa fa-chevron-circle-right"></i></a>\ \
            </div> \
            <span>{{ answers | json }}</span> \
            <span>{{ params | json }}</span>'
            
            /*
            <input-range min="0.02" max="0.15" step="0.005" \
                    :value.sync="answers.targetReturn" \
                tostring="(100 * x).toFixed(1)+\'%\'"></input-range> \
            */
});

var app = Vue.extend({
    http: {
        root: 'http://startup-master-mqxgysywwr.elasticbeanstalk.com/api/v0.1' // API root
        // root: 'http://localhost:8000/api/v0.1' // API root
    },
    data: function() {
        return {
            invested: 10000,
            params: {
                weight: [0.09, 0.18],
                'return': 0.10,
                backtest: 0,
                allow_short: false,
                allow_leveraged: false,
                content: {
                    'Stocks': [0.0, 1.0],
                    'Bonds': [0.0, 0.0],
                    'Cash': [0.0, 0.0],
                    'Commodities': [0.0, 0.18],
                    'Real Estate': [0.0, 0.18]
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
                    'Utilities': [0.0, 0.0]
                },
                region: {
                    'Asia': [0.0, 0.66],
                    'Emerging': [0.0, 0.66],
                    'Europe': [0.1, 1.0],
                    'North America': [0.2, 1.0],
                    'Oceania': [0.0, 0.66]
                },
            },
            solution: {},
            benchmarks: [],
        };
    },
    methods: {
        convertAnswersToParams: function(answers) {
            var age = 24;
            if (answers.hasOwnProperty('age')) {
                age = answers.targetReturn < 20 ? 20 : 65;
            }
            if (answers.hasOwnProperty('plan')) {
                if (answers.plan === 'rich' || answers.plan === 'retire') {
                    this.params.content.Stocks[1] = -0.85/45*(age - 65);
                } else if (answers.plan === 'marry') {
                    this.params.content.Stocks[1] = 0.45;
                }
            }
            if (answers.hasOwnProperty('targetReturn')) {
                this.params.return = parseFloat(answers.targetReturn);
            }
        },
        fetchPortfolio: function() {
            this.$http.post('portfolio?verbose=true', this.params).then(function(response) {
                this.solution = response.data;
            }, function(response) {
                console.log('error', response);
            });
        },
        fetchBenchmarks: function () {
            var benchmarkIsins = ['IE00B0M62Q58'];
            benchmarkIsins.forEach(function(benchmarkIsin) {
                this.$http.get('etfs/' + benchmarkIsins[0] + '?verbose=true').then(function(response) {
                    this.benchmarks.push({
                        'isin': benchmarkIsins[0],
                        'timeseries': response.data.timeseries
                    });
                }, function(response) {
                    console.log('error', response);
                });
             }, this);
            //console.log(this.benchmarks);
        }
    },
    ready: function () {
        // load the url params
        this.convertAnswersToParams(this.$route.query);
        
        // load the benchmarks
        this.fetchBenchmarks();
        
        // load a portfolio to avoid empty screen
        this.fetchPortfolio();    
    },
    template: ' \
        <div id="product" class="vue-wrapper"> \
            <div id="input"> \
                <a style="display:none" class="investimize-logo" v-link="{ path: \'/\', exact: true }"> \
                    <img>\
                </a> \
                <investimize-parameters :params.sync="params" :invested.sync="invested"></investimize-parameters> \
                <a href="#" class="chiclet" onclick="return false" v-on:click="fetchPortfolio()">Update <i class="fa fa-chevron-circle-right"></i></a> \
            </div> \
            <div id="output"> \
                <div class="vis-row"> \
                    <div class="vis-col"> \
                        <h1>Historical performance</h1> \
                        <vis-graph :params="params" :solution="solution" :invested="invested" :benchmarks="benchmarks"></vis-graph> \
                    </div> \
                    <!--<div class="vis-col"> \
                        <h1>Portfolio contents</h1> \
                    </div>--> \
                </div> \
                <h1><a style="color:inherit;text-decoration:none" href="{{solution.xray}}">Your portfolio <i class="fa fa-magic"></i></a></h1> \
                <vis-table :solution="solution" :invested="invested"></vis-table> \
            </div> \
        </div>'
});

Vue.component('questions-alt', {
    data: function() {
        return {
            currentQuestion: 1,
            lastQuestion: 3,
            answers: {
                goal: null,
                targetReturn: 0.1,
                other: 100,
            }
        };
    },
    methods: {
        nextQuestion: function() {
            this.$router.go({ path: 'app', query: {} }); //this.answers });
        },
        convertAnswersToParams: function () {
            console.log(this.params);
        }
    },
    template: ' \
            <div v-show="currentQuestion == 1"> \
                <h3 style="margin-bottom:1em">I am \
                    <div class="input-text light-bg default-label"> \
                        <input placeholder="28" type="text" style="width:1.5em;text-align:center" v-model="answers.age"required> \
                    </div> \
                    years old and want to invest \
                </h3> \
                <table style="display:none"> \
                    <tr> \
                        <td><div :class="{ \'active\': answers.goal == \'save\' }" v-on:click="answers.goal = \'save\'"> \
                        <img src="img/notes.svg">Just to save</div></td> \
                        <td><div :class="{ \'active\': answers.goal == \'bigspend\' }" v-on:click="answers.goal = \'bigspend\'"> \
                        <img src="img/house.svg">For a big spend</div></td> \
                        <td><div :class="{ \'active\': answers.goal == \'retirement\' }" v-on:click="answers.goal = \'retirement\'"> \
                        <img src="img/safe.svg">For my retirement</div></td> \
                    </tr>  \
                <table> \
                <a class="chiclet nofocus" v-on:click="nextQuestion()">Get my portfolio <i class="fa fa-chevron-circle-right"></i></a>\ \
            </div> \
            <div v-show="currentQuestion == 2"> \
                <h4>What is your target return?</h4> \
                <input type="text" size="2" v-model="answers.targetReturn"> \
                <a class="chiclet nofocus" v-on:click="nextQuestion()">Next<i class="fa fa-chevron-circle-right"></i></a>\ \
            </div> \
            <div v-show="currentQuestion == 3"> \
                <h4>A third question?</h4> \
                <input type="text" size="3" v-model="answers.other"> \
                <a class="chiclet nofocus" v-on:click="nextQuestion()">Next<i class="fa fa-chevron-circle-right"></i></a>\ \
            </div>'
});

var landing = Vue.extend({
    template: ' \
        <div id="landing" class="vue-wrapper"> \
        <nav-bar></nav-bar> \
        <div id="hero" class="row"> \
            <div class="col"> \
                <h1>Investimize</h1> \
                <h2>Passive investing,<br>\
                algorithmically optimized</h2> \
            </div> \
            <div class="col"> \
                <questions-alt></questions-alt> \
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
        component: landing
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
