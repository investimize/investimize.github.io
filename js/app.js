
var hero = Vue.extend({
    template: ' \
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
                Our state-of-the-art algorithms search through nearly 10&nbsp;000 ETFs \
                to find the best possible portfolio for your situation. \
                Tell Investimize about your preferences and it will search for the best solution given your constraints. \
                <a v-link="{ path: \'/howitworks\' }">Learn&nbsp;more...</a> \
            </div> \
            <div class="col"> \
                <img src="img/globe.svg"> \
                <h3>Diversified</h3> \
                Investimize diversifies your portfolio across geographical regions \
                as well as industries such as Healthcare, Technology and Utilities to minimize risk. \
                <a v-link="{ path: \'/howitworks\' }">Learn&nbsp;more...</a> \
            </div> \
            <div class="col"> \
                <img src="img/pricetag.svg"> \
                <h3>Low cost</h3> \
                For any given index such as the MSCI World, there are many ETFs to choose from that track that index. \
                Investimize will select the most tax&nbsp;efficient and low&nbsp;cost of these alternatives for you. \
                <a v-link="{ path: \'/howitworks\' }">Learn&nbsp;more...</a> \
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
                <h4>Get it touch with us on</h4> \
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
        </div>'

});

var app = Vue.extend({
    template: '<p>Placeholder for the app.</p>'
});

var whoweare = Vue.extend({
    template: '<p>Placeholder for the about us page.</p>'
});

var howitworks = Vue.extend({
    template: '<p>Placeholder for the FAQ.</p>'
});

var router = new VueRouter({
    linkActiveClass: 'active',
    hashbang: false
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
