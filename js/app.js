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

// TODO: Right now, input range data is propagated to the parent with $dispatch.
// Asked if there's a better solution at http://forum.vuejs.org/topic/2342/can-you-use-a-computed-property-as-a-prop
// If there is, update this.
Vue.component('input-range', {
    props: ['min', 'max', 'step', 'tostring', 'value'],
    watch: {
        value: function() {
            this.$dispatch('update', this.value);
        }
    },
    methods: {
        label: function(x) {
            return eval(this.tostring ? this.tostring : 'x');
        }
    },
    template: ' \
        <div class="input-range"> \
            <input v-model="value" min="{{min}}" max="{{max}}" step="{{step}}" type="range"> \
            <label>{{label(value)}}</label> \
        </div>'
});
Vue.component('double-input-range', {
    props: ['min', 'max', 'step', 'tostring', 'valueMin', 'valueMax'],
    computed: {
        value: function() {
            return this.valueMin < this.valueMax ?
                [this.valueMin, this.valueMax] :
                [this.valueMax, this.valueMin];
        },
    },
    watch: {
        value: function() {
            this.$dispatch('update', this.value);
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
            <input v-model="valueMin" min="{{min}}" max="{{max}}" step="{{step}}" type="range"> \
            <input v-model="valueMax" min="{{min}}" max="{{max}}" step="{{step}}" type="range"> \
            <label>{{label(value[1])}}</label> \
        </div>'
});

// All these set* methods should go away once we get a better solution to
// the problem above.
// TODO: Can't we use v-for to generate this table? Should be possible...
Vue.component('investimize-parameters', {
    data: function() {
        return {
            'weight': [0.05, 0.25],
            'return': 0.10,
            'backtest': 0,
            'allow_short': true,
            'allow_leveraged': true,
            'content': {
                'Stocks': [0.0, 1.0],
                'Bonds': [0.0, 1.0],
                'Cash': [0.0, 1.0],
                'Commodities': [0.0, 1.0],
                'Real Estate': [0.0, 1.0]
            },
            'sector': {
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
            'region': {
                'Asia': [0.0, 1.0],
                'Emerging': [0.0, 1.0],
                'Europe': [0.0, 1.0],
                'North America': [0.0, 1.0],
                'Oceania': [0.0, 1.0]
            }
        };
    },
    methods: {
        setreturn: function(val) { this.return = val; },
        setstocks: function(val) { this.content.Stocks = val; },
        setbonds: function(val) { this.content.Bonds = val; },
        setcash: function(val) { this.content.Cash = val; },
        setcommodities: function(val) { this.content.Commodities = val; },
        setrealestate: function(val) { this.content['Real Estate'] = val; },
        setasia: function(val) { this.region.Asia = val; },
        setemerging: function(val) { this.region.Emerging = val; },
        seteurope: function(val) { this.region.Europe = val; },
        setnorthamerica: function(val) { this.region['North America'] = val; },
        setoceania: function(val) { this.region.Oceania = val; },
        setcommunicationservices: function(val) { this.sector['Communication Services'] = val; }
    },
    template: ' \
        <table> \
        <tr> \
        <td>Return</td> \
        <td><input-range min="0.01" max="0.15" step="0.005" \
            :value.once="this[\'return\']" \
            tostring="(100 * x).toFixed(1)+\'%\'" \
            v-on:update="setreturn"> \
        </input-range></td> \
        </tr> \
        </table> \
        <table> \
        <tr><th colspan="2">Asset class</th></tr> \
        <tr> \
        <td>Stocks</td> \
        <td><double-input-range min="0" max="1" step="0.01" \
            :value-min.once="this.content.Stocks[0]" \
            :value-max.once="this.content.Stocks[1]" \
            tostring="(100 * x).toFixed(0)+\'%\'" \
            v-on:update="setstocks"> \
        </double-input-range></td> \
        </tr> \
        <tr> \
        <td>Bonds</td> \
        <td><double-input-range min="0" max="1" step="0.01" \
            :value-min.once="this.content.Bonds[0]" \
            :value-max.once="this.content.Bonds[1]" \
            tostring="(100 * x).toFixed(0)+\'%\'" \
            v-on:update="setbonds"> \
        </double-input-range></td> \
        </tr> \
        <tr> \
        <td>Cash</td> \
        <td><double-input-range min="0" max="1" step="0.01" \
            :value-min.once="this.content.Cash[0]" \
            :value-max.once="this.content.Cash[1]" \
            tostring="(100 * x).toFixed(0)+\'%\'" \
            v-on:update="setcash"> \
        </double-input-range></td> \
        </tr> \
        <tr> \
        <td>Commodities</td> \
        <td><double-input-range min="0" max="1" step="0.01" \
            :value-min.once="this.content.Commodities[0]" \
            :value-max.once="this.content.Commodities[1]" \
            tostring="(100 * x).toFixed(0)+\'%\'" \
            v-on:update="setcommodities"> \
        </double-input-range></td> \
        </tr> \
        <tr><th colspan="2">Region</th></tr> \
        <tr> \
        <td>Asia</td> \
        <td><double-input-range min="0" max="1" step="0.01" \
            :value-min.once="this.region.Asia[0]" \
            :value-max.once="this.region.Asia[1]" \
            tostring="(100 * x).toFixed(0)+\'%\'" \
            v-on:update="setasia"> \
        </double-input-range></td> \
        </tr> \
        <tr> \
        <td>Emerging</td> \
        <td><double-input-range min="0" max="1" step="0.01" \
            :value-min.once="this.region.Emerging[0]" \
            :value-max.once="this.region.Emerging[1]" \
            tostring="(100 * x).toFixed(0)+\'%\'" \
            v-on:update="setemerging"> \
        </double-input-range></td> \
        </tr> \
        <tr> \
        <td>Europe</td> \
        <td><double-input-range min="0" max="1" step="0.01" \
            :value-min.once="this.region.Europe[0]" \
            :value-max.once="this.region.Europe[1]" \
            tostring="(100 * x).toFixed(0)+\'%\'" \
            v-on:update="seteurope"> \
        </double-input-range></td> \
        </tr> \
        <tr> \
        <td>North&nbsp;America</td> \
        <td><double-input-range min="0" max="1" step="0.01" \
            :value-min.once="this.region[\'North America\'][0]" \
            :value-max.once="this.region[\'North America\'][1]" \
            tostring="(100 * x).toFixed(0)+\'%\'" \
            v-on:update="setnorthamerica"> \
        </double-input-range></td> \
        </tr> \
        <tr> \
        <td>Oceania</td> \
        <td><double-input-range min="0" max="1" step="0.01" \
            :value-min.once="this.region.Oceania[0]" \
            :value-max.once="this.region.Oceania[1]" \
            tostring="(100 * x).toFixed(0)+\'%\'" \
            v-on:update="setoceania"> \
        </double-input-range></td> \
        </tr> \
        <tr><th colspan="2">Sector</th></tr> \
        <tr> \
        <td>Communication Services</td> \
        <td><double-input-range min="0" max="1" step="0.01" \
            :value-min.once="this.sector[\'Communication Services\'][0]" \
            :value-max.once="this.sector[\'Communication Services\'][1]" \
            tostring="(100 * x).toFixed(0)+\'%\'" \
            v-on:update="setcommunicationservices"> \
        </double-input-range></td> \
        </tr> \
        </table> \
        <a href="#" class="chiclet">Update <i class="fa fa-chevron-circle-right"></i></a>'
});

var app = Vue.extend({
    template: ' \
        <div class="vue-wrapper"> \
            <div id="input"> \
                <a class="investimize-logo" v-link="{ path: \'/\', exact: true }"> \
                    <img> \
                </a><br> \
                <investimize-parameters></investimize-parameters> \
            </div> \
            <div id="output"></div> \
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
                <a class="chiclet" v-link="{ path: \'/app\' }">Get my portfolio <i class="fa fa-chevron-circle-right"></i></a>\
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
