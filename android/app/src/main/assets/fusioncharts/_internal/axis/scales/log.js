import constant from'../utils/constant';import ScaleContinuous,{copyScale}from'./continuous';const deinterpolate=(a,b)=>(b=Math.log(b/a))?c=>Math.log(c/a)/b:constant(b),reinterpolate=(a,b)=>0>a?c=>-Math.pow(-b,c)*Math.pow(-a,1-c):c=>Math.pow(b,c)*Math.pow(a,1-c),pow10=a=>isFinite(a)?+('1e'+a):0>a?0:a,powp=a=>10===a?pow10:a===Math.E?Math.exp:b=>Math.pow(a,b),logp=a=>{var b=Math.log;return a===Math.E?b:10===a?Math.log10:2===a?Math.log2:c=>b(c)/b(a)},reflect=a=>b=>-a(-b);class ScaleLog extends ScaleContinuous{constructor(){super(deinterpolate,reinterpolate).setDomain([1,10]),this.base=10,this.logs=logp(this.base),this.pows=powp(this.base)}_rescaleLog(){return this.logs=logp(this.base),this.pows=powp(this.base),0>this.getDomain()[0]&&(this.logs=reflect(this.logs),this.pows=reflect(this.pows)),this}setBase(a=10){return this.base=+a,this._rescaleLog()}getBase(){return this.base}setDomain(a=[1,10]){return super.setDomain(a),this._rescaleLog()}nice(){var a,b,c=Math.ceil,d=Math.floor,e=Math.log,[f,g]=this.getDomain(),h=this.base;return f===g&&(f-=f/100),a=e(f)/e(h),b=e(g)/e(h),(a%1||b%1)&&(f<=g?(f=this.pows(d(a)),g=this.pows(c(b))):(f=this.pows(c(a)),g=this.pows(d(b))),this.setDomain([f,g])),this}ticks(){var a,b,c,d,e,f,g,h=Math.ceil,j=Math.floor,k=Math.log,[l,m]=this.getDomain(),n=1,o=0,p=[],q=this.base;if(0>=l||0>=m)return p;for(l>m&&([m,l]=this.getDomain(),n=0),1<q?(a=h(k(m)/k(q)),b=j(k(l)/k(q)),c=a,d=b):0<q&&1>q&&(a=j(k(m)/k(q)),b=h(k(l)/k(q)),c=b,d=a),f=a,g=c;g>=d;--g)e=this.pows(f),l<=e&&m>=e&&(p[o++]=e),1<q?f--:f++;return n?p.reverse():p}copy(){return copyScale(this,new ScaleLog().setBase(this.base))}}export default ScaleLog;