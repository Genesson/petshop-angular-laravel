(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{cAcB:function(n,l,t){"use strict";t.r(l);var o=t("CcnG"),u=function(){return function(){}}(),e=t("pMnS"),i=t("oBZk"),s=t("ZZ/e"),r=t("gIcY"),c=t("N/25"),a=t("mrSG"),b=function(){function n(n){this.alertController=n}return n.prototype.presentAlert=function(n,l,t,o){return void 0===t&&(t="success"),void 0===o&&(o=1200),a.b(this,void 0,void 0,(function(){var u,e=this;return a.e(this,(function(i){switch(i.label){case 0:return this.icon="success"===t?"checkmark":"close",this.template='<div class="bg-icon">\n                            <ion-button color="'+t+'" class="icon">\n                                <ion-icon name="'+this.icon+'" size="large"></ion-icon>\n                            </ion-button>\n                         </div>',u=this,[4,this.alertController.create({header:n,message:this.template+l})];case 1:return u.alert=i.sent(),[4,this.alert.present()];case 2:return i.sent(),o&&setTimeout((function(){e.dismissAlert()}),o),[2]}}))}))},n.prototype.dismissAlert=function(){return a.b(this,void 0,void 0,(function(){return a.e(this,(function(n){switch(n.label){case 0:return[4,this.alert.dismiss()];case 1:return n.sent(),[2]}}))}))},n.ngInjectableDef=o.Vb({factory:function(){return new n(o.Wb(s.a))},token:n,providedIn:"root"}),n}(),g=t("ZYCi"),p=function(){function n(n,l,t){this.authService=n,this.router=l,this.alertService=t}return n.prototype.signin=function(n){var l=this;this.authService.signin(n).subscribe((function(){l.router.navigate(["/main"])}),(function(n){401===n.status&&l.alertService.presentAlert("Erro","Usu\xe1rio ou senha inv\xe1lidos","danger",3e3)}))},n.prototype.logout=function(){this.authService.logout()},n.ngInjectableDef=o.Vb({factory:function(){return new n(o.Wb(c.a),o.Wb(g.q),o.Wb(b))},token:n,providedIn:"root"}),n}(),d=function(){function n(n,l){this.formBuild=n,this.bankSandbox=l}return Object.defineProperty(n.prototype,"email",{get:function(){return this.form.get("email")},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"password",{get:function(){return this.form.get("password")},enumerable:!0,configurable:!0}),n.prototype.ngOnInit=function(){this.form=this.formBuild.group({email:[null,[r.n.required,r.n.email]],password:[null,[r.n.required]]})},n.prototype.onSubmit=function(){this.bankSandbox.signin(this.form.value)},n}(),f=o.ub({encapsulation:0,styles:[[".sp-login-content[_ngcontent-%COMP%]{--background:var(--ion-color-primary)}.sp-login-content[_ngcontent-%COMP%] > .sp-grid[_ngcontent-%COMP%], .sp-login-content[_ngcontent-%COMP%] > .sp-grid[_ngcontent-%COMP%] > .sp-row[_ngcontent-%COMP%]{height:100%}.sp-login-content[_ngcontent-%COMP%] > .sp-grid[_ngcontent-%COMP%] > .sp-row[_ngcontent-%COMP%] > .sp-column[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;place-content:center;-webkit-box-align:center;align-items:center}.sp-login-content[_ngcontent-%COMP%] > .sp-grid[_ngcontent-%COMP%] > .sp-row[_ngcontent-%COMP%] > .sp-column[_ngcontent-%COMP%] > .sp-form-login[_ngcontent-%COMP%]{width:300px;margin-top:-200px;text-align:-webkit-center}.sp-login-content[_ngcontent-%COMP%] > .sp-grid[_ngcontent-%COMP%] > .sp-row[_ngcontent-%COMP%] > .sp-column[_ngcontent-%COMP%] > .sp-form-login[_ngcontent-%COMP%] > .logo[_ngcontent-%COMP%]{width:80%;padding:16px 0}.sp-login-content[_ngcontent-%COMP%] > .sp-grid[_ngcontent-%COMP%] > .sp-row[_ngcontent-%COMP%] > .sp-column[_ngcontent-%COMP%] > .sp-form-login[_ngcontent-%COMP%] > .logo[_ngcontent-%COMP%]:focus{outline:0}"]],data:{}});function v(n){return o.Sb(0,[(n()(),o.wb(0,0,null,null,40,"ion-content",[["class","sp-login-content"]],null,null,null,i.V,i.k)),o.vb(1,49152,null,0,s.u,[o.i,o.l,o.B],null,null),(n()(),o.wb(2,0,null,0,38,"ion-grid",[["class","sp-grid"]],null,null,null,i.Y,i.n)),o.vb(3,49152,null,0,s.A,[o.i,o.l,o.B],null,null),(n()(),o.wb(4,0,null,0,36,"ion-row",[["class","sp-row"]],null,null,null,i.jb,i.y)),o.vb(5,49152,null,0,s.jb,[o.i,o.l,o.B],null,null),(n()(),o.wb(6,0,null,0,34,"ion-col",[["class","sp-column"]],null,null,null,i.U,i.j)),o.vb(7,49152,null,0,s.t,[o.i,o.l,o.B],null,null),(n()(),o.wb(8,0,null,0,32,"div",[["class","sp-form-login"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(n,l,t){var u=!0;return"submit"===l&&(u=!1!==o.Ib(n,9).onSubmit(t)&&u),"reset"===l&&(u=!1!==o.Ib(n,9).onReset()&&u),u}),null,null)),o.vb(9,540672,null,0,r.f,[[8,null],[8,null]],{form:[0,"form"]},null),o.Nb(2048,null,r.a,null,[r.f]),o.vb(11,16384,null,0,r.l,[[4,r.a]],null,null),(n()(),o.wb(12,0,null,null,1,"ion-img",[["class","logo"],["src","assets/logo/logo.svg"]],null,null,null,i.bb,i.q)),o.vb(13,49152,null,0,s.D,[o.i,o.l,o.B],{src:[0,"src"]},null),(n()(),o.wb(14,0,null,null,11,"ion-item",[],null,null,null,i.db,i.s)),o.vb(15,49152,null,0,s.H,[o.i,o.l,o.B],null,null),(n()(),o.wb(16,0,null,0,2,"ion-label",[["class","label"],["position","floating"]],null,null,null,i.eb,i.t)),o.vb(17,49152,null,0,s.N,[o.i,o.l,o.B],{position:[0,"position"]},null),(n()(),o.Qb(-1,0,["E-mail:"])),(n()(),o.wb(19,0,null,0,6,"ion-input",[["class","input"],["formControlName","email"],["type","email"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionBlur"],[null,"ionChange"]],(function(n,l,t){var u=!0;return"ionBlur"===l&&(u=!1!==o.Ib(n,20)._handleBlurEvent(t.target)&&u),"ionChange"===l&&(u=!1!==o.Ib(n,20)._handleInputEvent(t.target)&&u),u}),i.cb,i.r)),o.vb(20,16384,null,0,s.Mb,[o.l],null,null),o.Nb(1024,null,r.i,(function(n){return[n]}),[s.Mb]),o.vb(22,671744,null,0,r.d,[[3,r.a],[8,null],[8,null],[6,r.i],[2,r.q]],{name:[0,"name"]},null),o.Nb(2048,null,r.j,null,[r.d]),o.vb(24,16384,null,0,r.k,[[4,r.j]],null,null),o.vb(25,49152,null,0,s.G,[o.i,o.l,o.B],{type:[0,"type"]},null),(n()(),o.wb(26,0,null,null,11,"ion-item",[],null,null,null,i.db,i.s)),o.vb(27,49152,null,0,s.H,[o.i,o.l,o.B],null,null),(n()(),o.wb(28,0,null,0,2,"ion-label",[["class","label"],["position","floating"]],null,null,null,i.eb,i.t)),o.vb(29,49152,null,0,s.N,[o.i,o.l,o.B],{position:[0,"position"]},null),(n()(),o.Qb(-1,0,["Senha:"])),(n()(),o.wb(31,0,null,0,6,"ion-input",[["class","input"],["formControlName","password"],["type","password"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionBlur"],[null,"ionChange"]],(function(n,l,t){var u=!0;return"ionBlur"===l&&(u=!1!==o.Ib(n,32)._handleBlurEvent(t.target)&&u),"ionChange"===l&&(u=!1!==o.Ib(n,32)._handleInputEvent(t.target)&&u),u}),i.cb,i.r)),o.vb(32,16384,null,0,s.Mb,[o.l],null,null),o.Nb(1024,null,r.i,(function(n){return[n]}),[s.Mb]),o.vb(34,671744,null,0,r.d,[[3,r.a],[8,null],[8,null],[6,r.i],[2,r.q]],{name:[0,"name"]},null),o.Nb(2048,null,r.j,null,[r.d]),o.vb(36,16384,null,0,r.k,[[4,r.j]],null,null),o.vb(37,49152,null,0,s.G,[o.i,o.l,o.B],{type:[0,"type"]},null),(n()(),o.wb(38,0,null,null,2,"ion-button",[["color","success"],["expand","block"]],null,[[null,"click"]],(function(n,l,t){var o=!0;return"click"===l&&(o=!1!==n.component.onSubmit()&&o),o}),i.N,i.c)),o.vb(39,49152,null,0,s.k,[o.i,o.l,o.B],{color:[0,"color"],disabled:[1,"disabled"],expand:[2,"expand"]},null),(n()(),o.Qb(-1,0,["Entrar"]))],(function(n,l){var t=l.component;n(l,9,0,t.form),n(l,13,0,"assets/logo/logo.svg"),n(l,17,0,"floating"),n(l,22,0,"email"),n(l,25,0,"email"),n(l,29,0,"floating"),n(l,34,0,"password"),n(l,37,0,"password"),n(l,39,0,"success",!t.form.valid,"block")}),(function(n,l){n(l,8,0,o.Ib(l,11).ngClassUntouched,o.Ib(l,11).ngClassTouched,o.Ib(l,11).ngClassPristine,o.Ib(l,11).ngClassDirty,o.Ib(l,11).ngClassValid,o.Ib(l,11).ngClassInvalid,o.Ib(l,11).ngClassPending),n(l,19,0,o.Ib(l,24).ngClassUntouched,o.Ib(l,24).ngClassTouched,o.Ib(l,24).ngClassPristine,o.Ib(l,24).ngClassDirty,o.Ib(l,24).ngClassValid,o.Ib(l,24).ngClassInvalid,o.Ib(l,24).ngClassPending),n(l,31,0,o.Ib(l,36).ngClassUntouched,o.Ib(l,36).ngClassTouched,o.Ib(l,36).ngClassPristine,o.Ib(l,36).ngClassDirty,o.Ib(l,36).ngClassValid,o.Ib(l,36).ngClassInvalid,o.Ib(l,36).ngClassPending)}))}function h(n){return o.Sb(0,[(n()(),o.wb(0,0,null,null,1,"app-auth",[],null,null,null,v,f)),o.vb(1,114688,null,0,d,[r.b,p],null,null)],(function(n,l){n(l,1,0)}),null)}var m=o.sb("app-auth",d,h,{},{},[]),C=t("Ip0R"),w=function(){return function(){}}(),I=function(){return function(){}}();t.d(l,"AuthModuleNgFactory",(function(){return P}));var P=o.tb(u,[],(function(n){return o.Fb([o.Gb(512,o.k,o.fb,[[8,[e.a,m]],[3,o.k],o.z]),o.Gb(4608,C.n,C.m,[o.w,[2,C.E]]),o.Gb(4608,r.p,r.p,[]),o.Gb(4608,r.b,r.b,[]),o.Gb(4608,s.b,s.b,[o.B,o.g]),o.Gb(4608,s.Gb,s.Gb,[s.b,o.k,o.s]),o.Gb(4608,s.Jb,s.Jb,[s.b,o.k,o.s]),o.Gb(4608,b,b,[s.a]),o.Gb(1073742336,C.c,C.c,[]),o.Gb(1073742336,r.o,r.o,[]),o.Gb(1073742336,r.h,r.h,[]),o.Gb(1073742336,r.m,r.m,[]),o.Gb(1073742336,s.Eb,s.Eb,[]),o.Gb(1073742336,w,w,[]),o.Gb(1073742336,g.s,g.s,[[2,g.y],[2,g.q]]),o.Gb(1073742336,I,I,[]),o.Gb(1073742336,u,u,[]),o.Gb(1024,g.n,(function(){return[[{path:"",component:d}]]}),[])])}))}}]);