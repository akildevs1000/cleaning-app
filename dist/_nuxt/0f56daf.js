(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{116:function(t,e,n){"use strict";var o=n(629),r={layout:"login",props:{error:{type:Object,default:null}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}}},c=(n(452),n(91)),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e(o.a,{attrs:{dark:""}},[404===t.error.statusCode?e("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):e("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),e("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"5e5826c9",null);e.a=component.exports},275:function(t,e,n){"use strict";e.a=function(t,e){var n=t.$axios;e("hello",(function(t,e){return n.$get(t,e).then((function(t){return t.data}))}))}},276:function(t,e,n){"use strict";var o=n(4),r=n(383);n(590);e.a=function(t){var e=t.app;o.a.use(r.a,{vuetify:e.vuetify,iconsGroup:"mdi"})}},279:function(t,e,n){"use strict";var o=n(4),r=n(384),c=n.n(r),l=n(385),d=n.n(l),m=n(148),f=n.n(m),h=n(386),v=n.n(h),_=n(387),y=n.n(_);o.a.component("apexchart",c.a),y()(f.a),v()(f.a),o.a.use(d.a)},280:function(t,e,n){"use strict";n(5);var o=n(388),r=n.n(o);e.a=function(t,e){t.app;e("qrcode",{generate:function(text,t){return new Promise((function(e,n){r.a.toDataURL(text,t,(function(t,o){t?n(t):e(o)}))}))}})}},281:function(t,e,n){"use strict";n(293),n(5),n(72),n(291),n(28),n(56),n(81),n(32),n(46);e.a=function(t,e){t.app;e("utils",{add_zeros:function(t){return t&&t.toString().padStart(4,"0")},convert_decimal:function(t){return t===+t&&t!==(0|t)?t.toFixed(2)+".00".replace(".00.00",".00"):t+".00".replace(".00.00",".00")},getSum:function(t){return t.reduce((function(t,e){return t+e}),0)},currency_format:function(t){return"₹"==(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"₹")?parseFloat(t).toLocaleString("en-IN",{style:"currency",currency:"INR"}):parseFloat(t).toLocaleString("en-US",{style:"currency",currency:"USD"})},numberToWords:function(t){var e=["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"],n=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"],o=["","Thousand","Million","Billion"];if(0===t)return"Zero";var r="";function c(t){return 0===t?"":t<20?e[t]+" ":t<100?n[Math.floor(t/10)]+" "+c(t%10):e[Math.floor(t/100)]+" Hundred "+c(t%100)}for(var i=0;t>0;)t%1e3!=0&&(r=c(t%1e3)+o[i]+" "+r),t=Math.floor(t/1e3),i++;return"(".concat(r.trim()," Only)")},full_name:function(t){var title=t.title,e=t.first_name,n=t.last_name;return"".concat(title," ").concat(e," ").concat(n)},full_address:function(t){var e=t.city,n=t.state,o=t.country,r=function(t){return t&&"null"!==t?t:"---"};return"".concat(r(e)," ").concat(r(n)," ").concat(r(o))},getRelatedClass:function(t){return{0:"available",1:"booked",2:"occupied",3:"checked_out",4:"blocked"}[t||""]},capsTitle:function(t){return"gst"==t?t=t.toUpperCase():t.replace(/[^a-z]/g," ").replace(/\b\w/g,(function(t){return t.toUpperCase()}))},open_external_link:function(link){var element=document.createElement("a");element.setAttribute("target","_blank"),element.setAttribute("href",link),document.body.appendChild(element),console.log(element),element.click()},calculateTotalTime:function(t,e){var n=new Date("1970-01-01T".concat(t,"Z")),o=new Date("1970-01-01T".concat(e,"Z"));"00:00:00"===e&&o.setDate(o.getDate()+1);var r=o-n,c=Math.floor(r/1e3),l=Math.floor(c/3600),d=Math.floor(c%3600/60),m=c%60;return"".concat(l.toString().padStart(2,"0"),":").concat(d.toString().padStart(2,"0"),":").concat(m.toString().padStart(2,"0"))}}),e("dateFormat",{dmyhm:function(){var t=new Date,e=String(t.getDate()).padStart(2,"0"),n=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][t.getMonth()],o=t.getFullYear(),r=String(t.getHours()).padStart(2,"0"),c=String(t.getMinutes()).padStart(2,"0");return"".concat(e," ").concat(n," ").concat(o," ").concat(r,":").concat(c)},getMyDayOnly:function(t){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(t).getDay()]},dmy:function(t){var e=new Date(t),n=e.getDate().toString().padStart(2,"0"),o=e.toLocaleString("en-GB",{month:"short"}).slice(0,3),r=e.getFullYear();return"".concat(n," ").concat(o," ").concat(r)},format1:function(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"2-digit",weekday:"short"})},format11:function(t){return new Date(t).toLocaleDateString("en-GB",{year:"numeric",month:"short",day:"2-digit"}).replace(",","")},format2:function(t){var e=new Date(t),n=e.getFullYear().toString().slice(-2),o=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(n,"-").concat(o,"-").concat(r)},format3:function(t){var e=new Date(t),n=e.getFullYear(),o=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0"),c=e.getHours().toString().padStart(2,"0"),l=e.getMinutes().toString().padStart(2,"0");e.getSeconds().toString().padStart(2,"0");return"".concat(n,"-").concat(o,"-").concat(r," ").concat(c,":").concat(l," ")},format4:function(t){if("---"==t||"--"==t||0==t||""==t)return"---";var e=new Date(t),n=e.getFullYear(),o=((e.getMonth()+1).toString().padStart(2,"0"),e.getDate().toString().padStart(2,"0"),e.getHours().toString().padStart(2,"0")),r=e.getMinutes().toString().padStart(2,"0"),c=(e.getSeconds().toString().padStart(2,"0"),new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"2-digit",weekday:"short"}));return 1970==n||0==t?"---":"".concat(c,"  ").concat(o,":").concat(r," ")},format5:function(t){var e=new Date(t),n=(e.getFullYear(),(e.getMonth()+1).toString().padStart(2,"0"),e.getDate().toString().padStart(2,"0"),e.getHours().toString().padStart(2,"0")),o=e.getMinutes().toString().padStart(2,"0"),r=(e.getSeconds().toString().padStart(2,"0"),new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"2-digit",weekday:"short"}));return"".concat(n,":").concat(o," ").concat(r,"   ")},format6:function(t){if("---"==t||"--"==t||0==t||""==t)return"---";var e=new Date(t),n=e.getFullYear(),o=((e.getMonth()+1).toString().padStart(2,"0"),e.getDate().toString().padStart(2,"0"),e.getHours().toString().padStart(2,"0")),r=e.getMinutes().toString().padStart(2,"0");e.getSeconds().toString().padStart(2,"0"),new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"2-digit",weekday:"short"});return 1970==n||0==t?"---":"".concat(o,":").concat(r,"    ")},monthStartEnd:function(t){var e=new Date(t),n=new Date(e.getFullYear(),e.getMonth(),1),o=new Date(e.getFullYear(),e.getMonth()+1,0);return{first:"".concat(n.getFullYear(),"-").concat((n.getMonth()+1).toString().padStart(2,"0"),"-01"),last:"".concat(o.getFullYear(),"-").concat((o.getMonth()+1).toString().padStart(2,"0"),"-").concat(o.getDate())}},minutesToHHMM:function(t){var e=Math.floor(t/60),n=t%60;return(e<10?"0":"")+e+":"+(n<10?"0":"")+n},time2Hm:function(t){var e=t.split(":"),n=e[0],o=e[1];return"".concat(n,":").concat(o)},format_date_with_dayname:function(t){var e=new Date(t),n=e.getDate(),o=e.getMonth()+1;return(n=(n<10?"0":"")+n)+"-"+(o=(o<10?"0":"")+o)+"-"+e.getFullYear()+", "+["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e.getDay()]},format_month_name_year:function(t){var e=new Date(t),n=["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()],o=e.getFullYear();return"".concat(n," ").concat(o)},can:function(t,e){var u=e.$auth.user;return u&&u.permissions.some((function(e){return e==t||"/"==t}))||u.is_master||"branch"==u.user_type}}),e("pagePermission",{can:function(t,e){var u=e.$auth.user;return u&&u.permissions.some((function(e){return e==t||"/"==t}))||u.is_master}})}},341:function(t,e,n){var content=n(453);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(23).default)("19633e74",content,!0,{sourceMap:!1})},360:function(t,e,n){var content=n(510);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(23).default)("438cb848",content,!0,{sourceMap:!1})},391:function(t,e,n){"use strict";var o=n(629),r=n(634),c=n(268),l=n(395),d=n(635),m=n(633),f=n(632),h=n(131),v=n(269),_=n(177),y=n(83),S=n(270),M=n(155),w=n(631),D=n(630),x=n(394),k=(n(34),n(46),n(53),n(39),n(12),n(57),n(63),n(47),n(40)),C=n(3);n(120),n(52),n(5),n(11),n(42),n(55),n(293),n(32),n(13),n(28),n(56),n(70);function T(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return F(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return F(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,r=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw r}}}}function F(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var N={head:function(){return{link:[{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"}]}},data:function(){var t;return t={currentTime:"00:00:00",todayDate:"---",activeMenu:null,topMenus:[{label:"Dashboard",name:"dashboard"},{label:"Customer",name:"customer"},{label:"Account",name:"account"},{label:"Sales",name:"sales"},{label:"Reports",name:"reports"},{label:"Setting",name:"setting"}],pendingNotificationsCount:0,menuName:"",show:!1,y:0,x:0,miniVariant:!1,right:!0,rightDrawer:!1,color:"",sideBarcolor:"background",year:(new Date).getFullYear(),dropdown_menus:[{title:"setting"},{title:"logout"}],clipped:!1,open_menu:[],drawer:!0,fixed:!1,order_count:"",menus:[{topMenu:"dashboard",icon:"mdi-home",title:"Home",to:"/",menu:"dashboard"},{topMenu:"dashboard",icon:"mdi-calendar",title:"Calendar",to:"/",menu:"calendar_access"},{topMenu:"reports",icon:"mdi-chart-areaspline",title:"Analytics",to:"/reports",menu:"dashboard"},{topMenu:"reports",icon:"mdi-chart-areaspline",title:"Night Audit",to:"/management/report/night_audit",menu:"night_audit_access"},{topMenu:"dashboard",icon:"mdi-bed",title:"History",to:"/history",menu:"guest_access"},{topMenu:"customer",icon:"mdi-ticket-account",title:"Customers",to:"/source",menu:"source_access"},{topMenu:"account",icon:"mdi-bank-transfer",title:"Income",to:"/account",menu:"accounts_posting_access"},{topMenu:"account",icon:"mdi-bank-transfer",title:"City Ledger",to:"/city_ledger",menu:"accounts_posting_access"},{topMenu:"sales",icon:"mdi-cash",title:"Inquiry",to:"/inquiry",menu:"accounts_posting_access"},{topMenu:"sales",icon:"mdi-cash",title:"Quotation",to:"/sales",menu:"accounts_posting_access"},{topMenu:"sales",icon:"mdi-cash",title:"Invoice",to:"/invoices",menu:"accounts_posting_access"},{topMenu:"account",icon:"mdi mdi-food",title:"Posting",to:"/posting",menu:"accounts_posting_access"},{topMenu:"account",icon:"mdi mdi-bank-transfer-out",title:"Expense",to:"/expense",menu:"accounts_expences_access"},{topMenu:"account",icon:"mdi-cash",title:"GST Bills",to:"/taxable",menu:"accounts_gst_access"},{topMenu:"account",icon:"mdi-account",title:"Vendor",to:"/vendors",menu:"accounts_posting_access"},{topMenu:"dashboard",icon:"mdi-home-search-outline",title:"Lost & Found  ",to:"/lost_and_found_items",menu:"lost_and_found_access"},{topMenu:"setting",icon:"mdi mdi-account-details",title:"Company",to:"/companies",menu:"settings_permissions_access"},{topMenu:"setting",icon:"mdi-email",title:"Automation",to:"/template",menu:"settings_rooms_category_access"},{topMenu:"setting",icon:"mdi-bed",title:"Rooms",to:"/room_category",menu:"settings_rooms_category_access"},{topMenu:"setting",icon:"mdi-sofa",title:"Hall",to:"/hall",menu:"settings_rooms_category_access"},{topMenu:"setting",icon:"mdi-tools",title:"Price Setup",to:"/manage",menu:"settings_room_price_access"},{topMenu:"setting",icon:"mdi-cog",title:"Setup",to:"/setup",menu:"settings_room_price_access"},{topMenu:"setting",icon:"mdi mdi-account-tie",title:"Employee",to:"/employee",menu:"settings_users_access"},{topMenu:"setting",icon:"mdi mdi-account-details",title:"Devices",to:"/devices",menu:"devices_permissions_access"},{topMenu:"setting",icon:"mdi mdi-account-check-outline",title:"Roles",to:"/role",menu:"settings_roles_access"}],items:[],filteredMenu:[],modules:{module_ids:[],module_names:[]}},Object(C.a)(t,"clipped",!0),Object(C.a)(t,"currentTime",""),Object(C.a)(t,"title",""),Object(C.a)(t,"logout_btn",{icon:"mdi-logout",label:"Logout"}),t},created:function(){var t,e=this;this.title="MyHotel2Cloud",setTimeout((function(){e.loadNotificationMenu()}),6e4),setInterval((function(){e.loadNotificationMenu()}),3e5);var n=this.$auth.user.permissions;this.menus.forEach((function(t){(n.includes(t.menu)||"company"==e.$auth.user.user_type)&&e.items.push(t)})),this.getCompanyDetails(),this.filteredMenu=this.items,this.$router.push(null!==(t=this.filteredMenu[0].to)&&void 0!==t?t:"/"),this.setActive({label:"Dashboard",name:"dashboard"})},mounted:function(){var t=this;document.addEventListener("mousemove",this.updateMouseLocation),setInterval((function(){t.currentTime=(new Date).toLocaleTimeString([],{hour12:!1})}),1e3);var e=new Date,n=new Intl.DateTimeFormat("en-US",{weekday:"long"}).format(e),o=String(e.getDate()).padStart(2,"0"),r=String(e.getMonth()+1).padStart(2,"0"),c=e.getFullYear();this.todayDate="".concat(o,"-").concat(r,"-").concat(c,", ").concat(n)},computed:{changeColor:function(){return this.$store.state.color},getUser:function(){return this.$auth.user?this.$auth.user.name+" "+this.$auth.user.last_name:""},getLogo:function(){return this.$auth.user&&this.$auth.user.image||"/no-image.PNG"}},methods:{isActive:function(menu){return this.activeMenu===menu},setActive:function(menu){console.log(menu),this.activeMenu=menu,this.filteredMenu=this.items.filter((function(t){return t.topMenu==menu.name})),this.$router.push(this.filteredMenu[0]&&this.filteredMenu[0].to||"/")},showTooltipMenu:function(t){this.show=!0,this.menuName=t},gotoReservationPage:function(){this.pendingNotificationsCount=0,this.$router.push("/reservation/up_coming")},loadNotificationMenu:function(){var t,e,n=this,o=(null===(t=this.$auth.user)||void 0===t||null===(e=t.company)||void 0===e?void 0:e.id)||0;if(0==o)return!1;var r={params:{company_id:o}},c=0;this.$axios.get("get-notifications-count",r).then((function(t){var data=t.data;try{if(c=0,data.online_booking_count){var e,o=localStorage.getItem("online_booking_count"),r=[],l=T(data.online_booking_count);try{for(l.s();!(e=l.n()).done;){var d=e.value;o.includes(d)||r.includes(d)||r.push(d)}}catch(t){l.e(t)}finally{l.f()}localStorage.setItem("online_booking_count",data.online_booking_count),c=r.length}n.pendingNotificationsCount=c}catch(t){}}))},updateMouseLocation:function(t){this.x=t.clientX,this.y=t.clientY},changeTopBarColor:function(t){this.color=t,this.$store.commit("change_color",t)},changeTheme:function(t){},changeSideBarColor:function(t){this.sideBarcolor=t},caps:function(t){return t.replace(/\b\w/g,(function(t){return t.toUpperCase()}))},goToSetting:function(){this.$router.push("/setting")},goToCompany:function(){var t,e;this.$auth.user.user_type;this.$router.push("/companies/".concat(null===(t=this.$auth.user)||void 0===t||null===(e=t.company)||void 0===e?void 0:e.id))},goToReport:function(){this.$router.push("/management/report/user")},getCompanyDetails:function(){var t,e=this,n=this.$auth.user;this.$axios.get("company/".concat(null==n||null===(t=n.company)||void 0===t?void 0:t.id)).then((function(t){var n=t.data.record.modules;null!==n&&(e.modules={module_ids:n.module_ids||[],module_names:n.module_names.map((function(t){return{icon:"mdi-chart-bubble",title:e.caps(t),to:"/"+t+"_modules",permission:!0}}))})}))},can:function(t){var e=this.$auth.user;return e&&e.permissions.some((function(e){return e==t||"/"==t}))||e.is_master},logout:function(){var t=this;return Object(k.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.$axios.get("/logout").then((function(e){e.res;t.$auth.logout()}));case 1:case"end":return e.stop()}}),e)})))()}}},$=n(91),component=Object($.a)(N,(function(){var t,e,n,k,C,T,F,N,$,I=this,H=I._self._c;return H(o.a,{staticClass:"main_bg"},[H("style",[I._v("\n    body {\n      font-size: 11px !important;\n    }\n\n    .text-color {\n      color: #8a8a8a;\n    }\n  ")]),I._v(" "),H(r.a,{attrs:{fixed:"",app:"",dense:"",flat:""}},[H(x.a,{attrs:{align:"center","no-gutters":""}},[H(l.a,{staticClass:"text-left",attrs:{cols:"4"}},[H(x.a,{attrs:{"no-gutters":""}},[H(l.a,{attrs:{cols:"8"}},[H("div",{staticClass:"text-center text-color",staticStyle:{"font-size":"11px"}},[H("span",{staticClass:"text-color"},[I._v("\n                "+I._s(I.$dateFormat.dmy(new Date)))]),I._v(" "),H("br"),I._v(" "),H("span",{staticClass:"text-color"},[I._v(" "+I._s(I.currentTime))])])])],1)],1),I._v(" "),H(l.a,{staticClass:"text-center",attrs:{cols:"4"}},[H("img",{staticStyle:{width:"100%"},attrs:{src:"/login/login-logo.png"}}),I._v(" "),H("br"),I._v(" "),H("span",{staticClass:"text-color"},[I._v("\n          "+I._s((null===(t=I.$auth)||void 0===t||null===(e=t.user)||void 0===e||null===(n=e.company)||void 0===n?void 0:n.name)<10?null===(k=I.$auth)||void 0===k||null===(C=k.user)||void 0===C||null===(T=C.company)||void 0===T?void 0:T.name:(null===(F=I.$auth)||void 0===F||null===(N=F.user)||void 0===N||null===($=N.company)||void 0===$?void 0:$.name.slice(0,1))+" & Co")+"\n        ")])]),I._v(" "),H(l.a,{staticClass:"text-right",attrs:{cols:"4"}},[H(D.a,{attrs:{"nudge-bottom":"50","nudge-left":"20",transition:"scale-transition",origin:"center center",bottom:"",left:""},scopedSlots:I._u([{key:"activator",fn:function(t){var e=t.on,n=t.attrs;return[H(c.a,I._g(I._b({},"v-avatar",n,!1),e),[H("img",{attrs:{src:I.getLogo||"/no-image.PNG"}})])]}}])},[I._v(" "),H(v.a,{attrs:{light:"",nav:"",dense:""}},[H(S.a,{attrs:{color:"primary"}},[H(_.a,{on:{click:function(t){return I.goToCompany()}}},[H(M.a,[H(h.a,[I._v("mdi-account-multiple-outline")])],1),I._v(" "),H(y.a,[H(y.b,{staticClass:"grey--text"},[I._v("Profile")])],1)],1),I._v(" "),H(_.a,{on:{click:function(t){return I.goToReport()}}},[H(M.a,[H(h.a,[I._v("mdi mdi-text-account")])],1),I._v(" "),H(y.a,[H(y.b,{staticClass:"grey--text"},[I._v("Report")])],1)],1),I._v(" "),H(_.a,{on:{click:I.logout}},[H(M.a,[H(h.a,[I._v("mdi-logout")])],1),I._v(" "),H(y.a,[H(y.b,{staticClass:"grey--text"},[I._v("Logout")])],1)],1)],1)],1)],1)],1)],1)],1),I._v(" "),H(w.a,[H(d.a,{attrs:{fluid:""}},[H("nuxt")],1)],1),I._v(" "),H(f.a,{staticClass:"white pb-5",attrs:{fixed:"",app:"",dense:"",flat:""}},[H(x.a,{attrs:{align:"center","no-gutters":""}},[H(l.a,{staticClass:"mb-1",attrs:{cols:"12"}},[H(m.a)],1),I._v(" "),H(l.a,{staticClass:"text-center"},[H(h.a,{attrs:{color:"#968f9f"}},[I._v("mdi-home")])],1),I._v(" "),H(l.a,{staticClass:"text-center"},[H(h.a,{attrs:{color:"#b8afaa",to:"/cleaning"}},[I._v("mdi-bed")])],1),I._v(" "),H(l.a,{staticClass:"text-center"},[H(h.a,{attrs:{color:"#cfbeb4"}},[I._v("mdi-cash-multiple")])],1),I._v(" "),H(l.a,{staticClass:"text-center"},[H(h.a,{attrs:{color:"#b1b6ba"}},[I._v("mdi-chart-areaspline")])],1)],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports},392:function(t,e,n){"use strict";var o=n(629),r=n(635),c={data:function(){return{drawer:!1,group:null,clipped:!1,isMobile:""}},watch:{group:function(){this.drawer=!1}},mounted:function(){this.checkDeviceType(),window.addEventListener("resize",this.checkDeviceType)},beforeDestroy:function(){window.removeEventListener("resize",this.checkDeviceType)},methods:{checkDeviceType:function(){this.isMobile=window.innerWidth<=768}}},l=n(91),component=Object(l.a)(c,(function(){var t=this._self._c;return t(o.a,[t(r.a,[t("nuxt")],1)],1)}),[],!1,null,null,null);e.a=component.exports},393:function(t,e,n){"use strict";n(509);var o=n(91),component=Object(o.a)({},(function(){return(0,this._self._c)("nuxt")}),[],!1,null,"20af1764",null);e.a=component.exports},410:function(t,e,n){n(411),t.exports=n(412)},444:function(t,e,n){"use strict";n.r(e);e.default=function(t,e,n){console.log("francis")}},452:function(t,e,n){"use strict";n(341)},453:function(t,e,n){var o=n(22)((function(i){return i[1]}));o.push([t.i,"h1[data-v-5e5826c9]{font-size:20px}",""]),o.locals={},t.exports=o},509:function(t,e,n){"use strict";n(360)},510:function(t,e,n){var o=n(22)((function(i){return i[1]}));o.push([t.i,'body[data-v-20af1764]{background-color:#f4feff;overflow:hidden}.v-application .primary--text[data-v-20af1764]{caret-color:#006a37!important;color:#006a37!important}.checkbox-label label[data-v-20af1764]{font-size:12px}.hr-text[data-v-20af1764]{border:0;font-size:14px;height:1.5em;line-height:1em;margin:30px 15px;position:relative;text-align:center}.hr-text[data-v-20af1764]:before{background:#ddd;content:"";height:1px;left:0;position:absolute;top:50%;width:100%}.hr-text[data-v-20af1764]:after{background-color:#fff;color:#000;content:attr(data-content);line-height:1.5em;padding:0 7px;position:relative}',""]),o.locals={},t.exports=o},511:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return o})),n.d(e,"mutations",(function(){return r})),n.d(e,"actions",(function(){return c})),n.d(e,"getters",(function(){return l}));var o=function(){return{first_login:1,color:"primary",employee_id:"",reservation:"",dataToSend:"",booking_payload:"",widget_data:"",widget_data_booking_confirmation:"",partyHallBookingCustomer:{},partyHallBookingEvents:{},partyHallBookingFood:{},partyHallBookingAmount:{},partyHallBookingExtra:{},customerImage:null,customerDocument:null,devices_logs_id:"",hotelQRCodeOTPverified:!1,hotelQrcodeRequestId:"",hotelQrcodeCompanyId:"",hotelQrcodeRoomId:"",hotelQrcodeRoomNumber:"",hotelQrcodeWhatsappNumber:"",hotelQrcodeID:"",hotelQRCodeCartItems:[],timingName:""}},r={timingName:function(t,e){t.timingName=e},hotelQRCodeCartItems:function(t,e){t.hotelQRCodeCartItems=e},hotelQRCodeOTPverified:function(t,e){t.hotelQRCodeOTPverified=e},hotelQrcodeWhatsappNumber:function(t,e){t.hotelQrcodeWhatsappNumber=e},hotelQrcodeID:function(t,e){t.hotelQrcodeID=e},hotelQrcodeRequestId:function(t,e){t.hotelQrcodeRequestId=e},hotelQrcodeCompanyId:function(t,e){t.hotelQrcodeCompanyId=e},hotelQrcodeRoomId:function(t,e){t.hotelQrcodeRoomId=e},hotelQrcodeRoomNumber:function(t,e){t.hotelQrcodeRoomNumber=e},customerImage:function(t,e){t.customerImage=e},devices_logs_id:function(t,e){t.devices_logs_id=e},customerDocument:function(t,e){t.customerDocument=e},first_login:function(t,e){t.first_login=e},change_color:function(t,e){t.color=e},employee_id:function(t,e){t.employee_id=e},reservation:function(t,e){t.reservation=e},booking_payload:function(t,e){t.booking_payload=e},partyHallBookingCustomer:function(t,e){t.partyHallBookingCustomer=e},partyHallBookingExtra:function(t,e){t.partyHallBookingExtra=e},partyHallBookingEvents:function(t,e){t.partyHallBookingEvents=e},partyHallBookingFood:function(t,e){t.partyHallBookingFood=e},partyHallBookingAmount:function(t,e){t.partyHallBookingAmount=e},setDataToSend:function(t,data){t.dataToSend=data},widget_data:function(t,e){t.widget_data=e},widget_data_booking_confirmation:function(t,e){t.widget_data_booking_confirmation=e}},c={setData:function(t,data){(0,t.commit)("setDataToSend",data)}},l={getDataToSend:function(t){return t.dataToSend}}}},[[410,38,3,39]]]);