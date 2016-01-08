!function(){"use strict";function o(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=typeof n;if("string"===r||"number"===r)e+=" "+n;else if(Array.isArray(n))e+=" "+o.apply(null,n);else if("object"===r)for(var a in n)i.call(n,a)&&n[a]&&(e+=" "+a)}}return e.substr(1)}var i={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=o:(r=function(){return o}.call(t,n,t,e),!(void 0!==r&&(e.exports=r)))}()},function(e,t){"use strict";var n={handleKeyDown:function(e,t){t.stopPropagation(),32!==t.which&&13!==t.which||!e||e(t)}};e.exports=n},function(e,t){e.exports={button:"_2hYv2do8HV0VkjDUmR38JN","button-green":"_2dF1se1ljzPG065T38YCWi","is-link":"_1xztFEd3R_UAMUD_-tUCV1",hidden:"_2V8mraeiYNYyl2rp__2sIM",noticon:"_1ltcKruhjJfg35XliwrHaH","is-primary":"_2Iv9aRNZENrHCN9nwfA74j","button-blue":"_3qiu1o9JkAa80km4FOkwox","is-dangerous":"_2W3P9tn-oQkEPcoqlQYCVt","is-destructive":"_1s_LBF19rmbD-SXS53yWNc","button-large":"_2uCbH9hRPA4OJ6d68A99vX","button-group":"_2M0J-xAZJAM_SuiA6MDmDS","button-small":"_3NjcVz-4f-poi1cQ1bS12R","button-hero":"_37iYl3WJRvDhD0M2Ujzskj"}},,function(e,t,n){"use strict";function r(){return{title:i.getTitle(),description:i.getDescription()}}var o=n(4),i=(n(167),n(168)),a=n(183),s=n(177),u=n(164),l=o.createClass({displayName:"SiteTitleStep",componentDidMount:function(){i.addChangeListener(this._onChange)},componentWillUnmount:function(){i.removeChangeListener(this._onChange)},_onChange:function(){this.setState(r())},getInitialState:function(){return r()},handleChangeTitle:function(e){this.setState({title:e.currentTarget.value})},handleChangeDescription:function(e){this.setState({description:e.currentTarget.value})},handleSubmit:function(e){e.preventDefault(),u.submitTitleStep(this.state.title,this.state.description)},render:function(){return o.createElement(a,{id:"welcome__site-title"},o.createElement("h1",null,"Let's launch your new website"),o.createElement("p",{className:"welcome__callout welcome__site-title--callout"},"Name and describe your website"),o.createElement("form",{onSubmit:this.handleSubmit,className:"welcome__site-title--form"},o.createElement("label",{className:"sscreen-reader-text",htmlFor:"site_title"},"Site Title"),o.createElement("input",{type:"text",name:"site_title",id:"site-title",autoComplete:"off",onChange:this.handleChangeTitle,value:this.state.title,placeholder:"Site Title (this can be changed later)",required:!0}),o.createElement("label",{className:"sscreen-reader-text",htmlFor:"site_description"},"Site Description"),o.createElement("input",{type:"text",name:"site_description",id:"site-description",autoComplete:"off",onChange:this.handleChangeDescription,value:this.state.description,placeholder:"Site Description (this can be changed later)",required:!0}),o.createElement(s,{className:"welcome-submit",primary:!0,type:"submit"},"Next Step")))}});e.exports=l},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(4),a=i.createClass({displayName:"WelcomeSection",render:function(){var e=r(this.props,[]);return i.createElement("div",o({},e,{className:"welcome__section"}),this.props.children)}});e.exports=a},function(e,t,n){"use strict";function r(){return{site_title:i.getTitle(),layout:i.getLayout()}}var o=n(4),i=n(168),a=n(177),s=n(183),u=n(164),l=o.createClass({displayName:"LayoutStep",componentDidMount:function(){i.addChangeListener(this._onChange)},componentWillUnmount:function(){i.removeChangeListener(this._onChange)},_onChange:function(){this.setState(r())},getInitialState:function(){return r()},handleIsBlog:function(){u.confirmHomepageStep()},handleNotBlog:function(){u.submitLayoutStep("website")},render:function(){return o.createElement(s,{id:"welcome__layout"},o.createElement("h1",null,"Let's launch ",o.createElement("em",null,this.state.site_title)),o.createElement("p",{className:"welcome__callout welcome__layout--callout"},"Are you going to update your site with news or blog posts?"),o.createElement("p",null,o.createElement(a,{onClick:this.handleIsBlog,primary:!0},"Yes"),o.createElement(a,{onClick:this.handleNotBlog},"Nope")))}});e.exports=l},function(e,t,n){"use strict";function r(){return{site_title:a.getTitle(),layout:a.getLayout(),siteScreenshot:JPS.base_url+"/img/layout__site-blog.png",blogScreenshot:JPS.base_url+"/img/layout__blog.png"}}var o=n(4),i=n(186),a=n(168),s=(n(177),n(183)),u=n(164),l=o.createClass({displayName:"HomepageStep",componentDidMount:function(){a.addChangeListener(this._onChange)},componentWillUnmount:function(){a.removeChangeListener(this._onChange)},_onChange:function(){this.setState(r())},getInitialState:function(){return r()},handleSetLayout:function(e){var t=jQuery(e.currentTarget).val();this.setState({layout:t}),u.submitLayoutStep(t)},skipStep:function(e){e.preventDefault();var t="blog";this.setState({layout:t}),u.submitLayoutStep(t)},render:function(){return o.createElement(s,{id:"welcome__homepage"},o.createElement("h1",null,"Let's launch ",o.createElement("em",null,this.state.site_title)),o.createElement("p",{className:"welcome__callout welcome__homepage--callout"},"What should visitors see on your homepage?"),o.createElement("form",null,o.createElement("div",{className:"welcome__homepage-cols"},o.createElement("div",{className:i({"welcome__homepage-col":!0,"is-selected":"blog"===this.state.layout})},o.createElement("label",null,o.createElement("input",{type:"radio",name:"site_layout",value:"blog",checked:"blog"===this.state.layout,onChange:this.handleSetLayout,className:"screen-reader-text"}),o.createElement("img",{src:this.state.blogScreenshot}),o.createElement("p",null,"Most recent news or updates"))),o.createElement("div",{className:i({"welcome__homepage-col":!0,"is-selected":"site-blog"===this.state.layout})},o.createElement("label",null,o.createElement("input",{type:"radio",name:"site_layout",value:"site-blog",checked:"site-blog"===this.state.layout,onChange:this.handleSetLayout,className:"screen-reader-text"}),o.createElement("img",{src:this.state.siteScreenshot}),o.createElement("p",null,"A static welcome page")))),o.createElement("p",{className:"welcome__skip"},o.createElement("a",{className:"welcome__skip-link",href:"#",onClick:this.skipStep},"Skip this step"))))}});e.exports=l},function(e,t,n){var r,o;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r))e.push(n.apply(null,r));else if("object"===o)for(var a in r)i.call(r,a)&&r[a]&&e.push(a)}}return e.join(" ")}var i={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=n:(r=[],o=function(){return n}.apply(t,r),!(void 0!==o&&(e.exports=o)))}()},function(e,t,n){"use strict";function r(){return{site_title:i.getTitle(),contactPageURL:i.getContactPageURL(),contactPageScreenshot:JPS.base_url+"/img/contact-us-screenshot.png"}}var o=n(4),i=n(168),a=n(177),s=n(183),u=n(164),l=o.createClass({displayName:"ContactPageStep",componentDidMount:function(){i.addChangeListener(this._onChange)},componentWillUnmount:function(){i.removeChangeListener(this._onChange)},_onChange:function(){this.setState(r())},getInitialState:function(){return r()},handleBuildContact:function(e){e.preventDefault(),u.createContactPage()},handleSubmit:function(e){e.preventDefault(),u.skipContactPageBuild()},handleContinue:function(e){e.preventDefault(),u.selectNextStep()},render:function(){return o.createElement(s,{id:"welcome__contact"},o.createElement("h1",null,"Let's launch ",o.createElement("em",null,this.state.site_title)),this.state.contactPageURL?this._renderWithContactPage():this._renderWithoutContactPage())},_renderWithContactPage:function(){return o.createElement("div",null,o.createElement("p",{className:"welcome__callout welcome__contact--callout welcome__contact-exists--callout"},"View your starter ",o.createElement("a",{href:this.state.contactPageURL,target:"_blank"},"Contact Us")," page."),o.createElement("p",{className:"welcome__submit"},o.createElement(a,{primary:!0,onClick:this.handleContinue},"Next Step →")))},_renderWithoutContactPage:function(){return o.createElement("div",{className:"welcome__contact-cols"},o.createElement("div",{className:"welcome__contact-col"},o.createElement("div",{className:"welcome__contact-button"},o.createElement("p",{className:"welcome__callout welcome__contact--callout welcome__contact-build--callout"},"Build a ",o.createElement("em",null,"starter"),' "Contact Us" page?'),o.createElement("p",{className:"welcome__submit"},o.createElement(a,{primary:!0,onClick:this.handleBuildContact},"Yes"),o.createElement(a,{onClick:this.handleSubmit},"No Thanks")))),o.createElement("div",{className:"welcome__contact-col welcome__contact--screenshot"},o.createElement("img",{src:this.state.contactPageScreenshot})))}});e.exports=l},function(e,t,n){"use strict";function r(){return{site_title:a.getTitle(),jetpackConfigured:a.getJetpackConfigured(),jumpstartEnabled:a.getJetpackJumpstartEnabled(),modulesEnabled:a.getActiveModuleSlugs()}}var o=n(4),i=n(189),a=n(168),s=n(167),u=n(165),l=(n(190),n(183)),c=n(164),p=(n(172),n(177)),d=o.createClass({displayName:"JetpackJumpstart",componentDidMount:function(){a.addChangeListener(this._onChange)},componentWillUnmount:function(){a.removeChangeListener(this._onChange)},_onChange:function(){this.setState(r())},getInitialState:function(){var e=r();return e.showMoreModules=!1,e},handleJetpackConnect:function(e){e.preventDefault(),s.configureJetpack(u.REVIEW_STEP_SLUG)},handleNext:function(e){e.preventDefault(),c.completeAndNextStep(u.JETPACK_MODULES_STEP_SLUG)},render:function(){return o.createElement(l,{id:"welcome__jetpack"},o.createElement("h1",null,"Let's launch ",o.createElement("em",null,this.state.site_title)),o.createElement("p",{className:"welcome__callout welcome__jetpack--callout"},"Connect your Jetpack profile to improve security, track stats, and grow traffic"),this.state.jetpackConfigured?o.createElement("div",null,o.createElement("p",null,"Congratulations! You've enabled Jetpack and unlocked dozens of powerful features."),o.createElement("p",null,o.createElement("a",{href:"#"},"Check out the settings page…")),o.createElement("p",null,o.createElement(p,{style:{"float":"right"},color:"blue",onClick:this.handleNext},"Next Step →"))):o.createElement("div",null,o.createElement("p",null,o.createElement(p,{onClick:this.handleJetpackConnect,primary:!0},"Connect to WordPress.com")),o.createElement("p",null,o.createElement(i,null))))}});e.exports=d},function(e,t,n){"use strict";function r(){return{completed:i.getCurrentStep().completed}}var o=n(4),i=n(156),a=n(164),s=o.createClass({displayName:"SkipButton",componentDidMount:function(){i.addChangeListener(this._onChange)},componentWillUnmount:function(){i.removeChangeListener(this._onChange)},_onChange:function(){this.setState(r())},getInitialState:function(){return r()},handleSkip:function(e){e.preventDefault(),a.skipStep()},render:function(){var e=this.state.completed;return e?null:o.createElement("a",{className:"welcome__skip-step",href:"#",onClick:this.handleSkip},"Not now")}});e.exports=s},function(e,t,n){"use strict";var r=n(4),o=r.createClass({displayName:"ContentBox",render:function(){return r.createElement("div",{className:"welcome__content-box clear"},this.props.children)}});e.exports=o},function(e,t,n){"use strict";function r(){return{site_title:a.getTitle(),contactUrl:a.getContactPageEditURL(),welcomeUrl:a.getWelcomePageEditURL(),newsUrl:a.getNewsPageEditURL(),isJPConnected:a.getJetpackConfigured(),layout:a.getLayout()}}var o=n(4),i=n(177),a=n(168),s=n(165),u=n(192),l=n(164),c=n(183),p=o.createClass({displayName:"AdvancedSettingsStep",getInitialState:function(){return r()},componentDidMount:function(){a.addChangeListener(this._onChange)},componentWillUnmount:function(){a.removeChangeListener(this._onChange)},_onChange:function(){this.setState(r())},handleSkipTo:function(e,t){t.preventDefault(),l.setCurrentStep(e)},handleDismiss:function(e){e.preventDefault(),jQuery("#welcome-panel .welcome-panel-close").trigger("click")},render:function(){var e={};return this.state.contactUrl?e.href=this.state.contactUrl:(e.href="#",e.onClick=this.handleSkipTo.bind(this,s.CONTACT_PAGE_STEP_SLUG)),o.createElement(c,{id:"welcome__review"},o.createElement("div",{className:"welcome__dismiss"},o.createElement("a",{href:"#",onClick:this.handleDismiss},o.createElement(u,{name:"dismiss"}),o.createElement("span",{className:"screen-reader-text"},"Dismiss"))),o.createElement("h1",null,"Let's launch ",o.createElement("em",null,this.state.site_title)),o.createElement("p",{className:"welcome__callout welcome__review--callout"},"Great Work!"),o.createElement("div",{className:"welcome__review-cols"},o.createElement("div",{className:"welcome__review-col"},o.createElement("ul",{className:"welcome__review-list"},o.createElement("li",null,o.createElement(u,{name:"yes"})," Title and description ",o.createElement("a",{href:"#",onClick:this.handleSkipTo.bind(this,s.SITE_TITLE_STEP_SLUG)},"(edit)")),o.createElement("li",null,o.createElement(u,{name:"yes"})," Homepage layout ",o.createElement("a",{href:"#",onClick:this.handleSkipTo.bind(this,s.IS_BLOG_STEP_SLUG)},"(edit)"),"blog"!==this.state.layout?o.createElement("ul",null,o.createElement("li",null,o.createElement("a",{href:this.state.welcomeUrl},"Edit your Welcome page")),"website"!==this.state.layout?o.createElement("li",null,o.createElement("a",{href:this.state.newsUrl},"Edit your News and Updates page")):null):null),o.createElement("li",null,o.createElement(u,{name:"yes"})," ",o.createElement("em",null,"Contact Us")," page ",o.createElement("a",e,"(edit)")),o.createElement("li",null,o.createElement(u,{name:"yes"}),this.state.isJPConnected?o.createElement("a",{href:JPS.steps.advanced_settings.jetpack_dash},"Jetpack: "):o.createElement("a",{href:"#",onClick:this.handleSkipTo.bind(this,s.JETPACK_MODULES_STEP_SLUG)},"Connect Jetpack: "),"increase visitors and improve security"))),o.createElement("div",{className:"welcome__review-col welcome__review-themes"},o.createElement("img",{src:JPS.base_url+"/img/review__themes.png"}),o.createElement("p",null,o.createElement(i,{href:JPS.steps.advanced_settings.customize_url},"Choose a Theme")))))}});e.exports=p},function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(4),a=i.createClass({displayName:"Dashicon",propTypes:{name:i.PropTypes.string.isRequired},render:function(){var e=this.props,t=e.name,n=r(e,["name"]);return i.createElement("span",o({className:"dashicons dashicons-"+t},n),this.props.children)}});e.exports=a}]);
//# sourceMappingURL=jetpack-onboarding.js.map