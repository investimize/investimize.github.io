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
        <tbody id="sector" :class="{\'collapsed\': collapsed.advanced}"> \
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

var app = Vue.extend({
    data: function() {
        return {
            params: {
                weight: [0.05, 0.25],
                'return': 0.10,
                backtest: 0,
                allow_short: true,
                allow_leveraged: true,
                content: {
                    'Stocks': [0.0, 1.0],
                    'Bonds': [0.0, 0.4],
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
            }
        };
    },
    methods: {
        stringify: function(val) {
            return JSON.stringify(val);
        }
    },
    template: ' \
        <div class="vue-wrapper"> \
            <div id="input"> \
                <a class="investimize-logo" v-link="{ path: \'/\', exact: true }"> \
                    <img>\
                </a><br> \
                <investimize-parameters :params.sync="params"></investimize-parameters> \
                <a href="#" class="chiclet">Update <i class="fa fa-chevron-circle-right"></i></a> \
            </div> \
            <div id="output"> \
                {{stringify(params)}} \
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
