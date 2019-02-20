import{ComponentInterface}from'../../../../../fc-core/src/component-interface';import{pluckNumber,preDefStr}from'../../../../../fc-core/src/lib';import{addDep}from'../../../../../fc-core/src/dependency-manager';import cartesianStackAnimation from'./index.animation';let UNDEF,visibleStr=preDefStr.visibleStr,math=Math,mathMin=math.min,mathMax=math.max;addDep({name:'cartesianStackAnimation',type:'animationRule',extension:cartesianStackAnimation});class CartesianStackgroup extends ComponentInterface{constructor(){super(),this.setState('visible',!0)}getType(){return'group'}static getName(){return'cartesianStackGroup'}getName(){return'cartesianStackGroup'}preConfigure(a){return!!a&&void(this.config.JSONData=a,super.preConfigure(a))}configure(a){return!!a&&void super.configure(a)}setSkippingInfo(a){let b=this;b.addToEnv('skipInfo',a||{drawOnlyMap:[],plotsPerBin:1,draw:[],hide:[],skippingApplied:!1,dragHashMap:[],prevDrawArray:[]})}getSkippingInfo(){return this.getFromEnv('skipInfo')||{drawOnlyMap:[],plotsPerBin:1,draw:[],hide:[],skippingApplied:!1,dragHashMap:[],prevDrawArray:[]}}setVisibility(){let a=0;this._mapChildren(b=>{b.getState('visible')&&a++}),this.setState('visible',!!a)}createContainer(){let a,b,c=this,d=c.getFromEnv('animationManager'),e=c.getLinkedParent(),f=e.getChildContainer();for(a in f)b=f[a],c.getChildContainer(a)||c.addChildContainer(a,d.setAnimation({el:'group',attr:{name:'manager-'+a},container:b,component:c}));c.getContainer('sumLabelsLayer')||c.addContainer('sumLabelsLayer',d.setAnimation({el:'group',attr:{name:'manager-sumLabelsLayer',class:'fusioncharts-datalabels'},label:'group',container:e.getChildContainer('sumLabelsLayer'),component:c})),c.getChildContainer('commonElemGroup')||c.addChildContainer('commonElemGroup',d.setAnimation({el:'group',attr:{name:'manager-common-elem-group'},label:'group',container:e.getChildContainer('areaVcanvasGroup'),component:c})),c.getChildContainer('anchorGroup')||c.addChildContainer('anchorGroup',d.setAnimation({el:'group',attr:{name:'manager-anchor-group'},label:'group',container:e.getChildContainer('areaVcanvasGroup'),component:c}))}draw(){this.createContainer(),this.drawSumValue()}_setStackPosition(){let a=this,b=+Infinity,c=-Infinity,d=a.getFromEnv('numOfColumns'),e=0,f=[],g=a.getSkippingInfo&&a.getSkippingInfo()||{},h=g.draw||[],k=h.length,l=g.skippingApplied;a._mapChildren(a=>{if(a.getState('removed')||!1===a.getState('visible'))return;e++;let d,g,m,n,o=a.getData(),p=0,q=o&&o.length,r=0;for(l&&(q=k),m=0;m<q;m++)g=h[m]||m,d=o[g],d&&d.config&&d.config.setValue!==UNDEF&&(!f[g]&&(f[g]={}),n=d.config.setValue,f[g].positive||(f[g].positive=0),f[g].negative||(f[g].negative=0),0<=n?(r=f[g].positive,p=n+r,f[g].positive=p):0>n&&(r=f[g].negative,p=n+r,f[g].negative=p),null!==n&&(f[g].isNotNull=!0),c=mathMax(p,c),b=mathMin(p,b),d.config._y=p,d.config._b=r)}),a.config.stackValues=f,a.config.dataMin=b,a.config.dataMax=c,e?a.setState('visible',!0):a.setState('visible',!1),a.addToEnv('stackValues',f),a.addToEnv('numOfColumns',e),a.addToEnv('numColDiff',pluckNumber(d-e,0))}allocatePosition(){this._setStackPosition()}_getXpos(a){var b=this,c=b.getFromEnv('shift')||0,d=b.getFromEnv('xAxis');return d.getPixel(a)+c}drawSumValue(a=0,b){let c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t=this,u=t.config,v=t.getFromEnv('yAxis'),w=t.getFromEnv('paper'),x=t.getFromEnv('animationManager'),y=t.getFromEnv('chart'),z=y.isBar,A=t.getFromEnv('smartLabel'),B=y.config,C=B.canvasRight,D=t.getFromEnv('chart-attrib'),E=pluckNumber(B.stack100percent),F=B.rotatevalues?270:0,G=u.stackValues,H=b||G&&G.length,I=B.dataLabelStyle,J=t.getContainer('sumLabelsLayer'),K=t.getGraphicalElement('sumLabels'),L=pluckNumber(D.showsum,y.showsum,0);if(L){if(J.css(I),A.setStyle(I),q=K&&K.length,r=G.length,q>r)for(;q>=r;)s=K[q],q--,s&&(s.hide(),t.removeGraphicalElement(s));for(c=a;c<H;c++){if(j=Array.isArray(K)&&K[c],!G[c]||!G[c].isNotNull){j&&j.hide();continue}l=G[c].positive,m=G[c].negative,p=l+m,n=0>p?m:l,o=v.dataLabels(p),o&&(f=I.backgroundColor,g=I.borderColor,h=A.getOriSize(o),z?(e=t._getXpos(c)+h.height/2,d=v.getPixel(E?100:n)+h.width/2,!E&&(d-=d+h.width>C?d+h.width-C:0)):(d=t._getXpos(c),e=v.getPixel(E?100:n)),k=t.getSumValuePosition(h,{stack100percent:E,rotateValues:F,xPos:d,yPos:e,offsetY:n}),k.text=o,k.fill=I.color,k['text-bound']=[f,g,I.borderThickness,I.borderPadding,I.borderRadius,I.borderDash],k['line-height']=I.lineHeight,k.visibility=visibleStr,k.transform=w.getSuggestiveRotation(F,k.x,k.y),k['text-anchor']&&delete k['text-bound'],j=x.setAnimation({el:j||'text',attr:k,label:'text',container:J,component:t}),j.show(),!(Array.isArray(K)&&K[c])&&t.addGraphicalElement('sumLabels',j,!0))}}else x.setAnimation({el:J,label:'sumLabelGroup'}),J.hide()}getSumValuePosition(a,b){var c,d,e,f,g=this,h=g.getFromEnv('chart'),i=h.config,j=i.canvasBottom,k=i.canvasTop,l=h.config.is3D,m=h.isBar,n=b.stack100percent,o=i.yDepth,p=i.xDepth,q=b.yPos,r=b.xPos,s=g.getFromEnv('canvasConfig').canvasBorderWidth,t=b.offsetY,u=b.rotateValues;return f=u?a.width:a.height,e=c=f,e=e/2+2,n?k<=c?q=e:(q=m?b.yPos:k-e-s,r+=m?s:0):(0<=t&&(d=q-k,d<c?q=q+e-d:(q-=e,r+=m?2:0)),0>t&&(d=j-q,d<c?q-=e:q+=e,l&&(r-=p,q+=o))),{x:r,y:q}}childChanged(a={}){let b,c,d=this,e=d.config,f=d.getLinkedParent(),g=d.getState('visible'),h=0,i={};d._mapChildren(a=>{a.getState('visible')&&h++}),d.setState('visible',!!h),g!==!!h&&(c=!0),!1!==a.dataLimitChanged&&(b=d.getDataLimits(),(b.min!==e.range.min||b.max!==e.range.max)&&(e.range.min=b.min,e.range.max=b.max,i.dataLimitChanged=!0,c=!0)),c?f.childChanged&&f.childChanged(i):d.asyncDraw()}getAxisValuePadding(){var a=Math.max;let b={},c=-Infinity,d=-Infinity;return this._mapChildren(e=>{e.getState('removed')||(b=e.getAxisValuePadding&&e.getAxisValuePadding()||{},c=a(c,b.left||-Infinity),d=a(d,b.right||-Infinity))}),c===-Infinity&&(c=0),d===-Infinity&&(d=0),this.config.padding||(this.config.padding={},this.config.padding.left=c,this.config.padding.right=d),{left:c,right:d}}getDataLimits(a){return this._setStackPosition(),this.config.range||(this.config.range||(this.config.range={}),this.config.range.min=this.config.dataMin,this.config.range.max=this.config.dataMax),a?this._getStackLimit():{max:this.config.dataMax,min:this.config.dataMin}}_getStackLimit(){let a=this,b=+Infinity,c=-Infinity,d=[],e=a.getSkippingInfo&&a.getSkippingInfo()||{},f=e.draw||[],g=f.length,h=e.skippingApplied;return a._mapChildren(a=>{if(a.getState('removed'))return;let e,k,l,m,n=a.getData(),o=0,p=n&&n.length,q=0;for(h&&(p=g),l=0;l<p;l++)k=f[l]||l,e=n[k],e&&e.config&&e.config.setValue!==UNDEF&&null!==e.config.setValue&&(!d[k]&&(d[k]={}),m=e.config.setValue,d[k].positive||(d[k].positive=0),d[k].negative||(d[k].negative=0),0<m?(q=d[k].positive,o=m+q,d[k].positive=o):0>m&&(q=d[k].negative,o=m+q,d[k].negative=o),c=mathMax(o,c),b=mathMin(o,b))}),{max:c,min:b}}isVisible(){return!this.isNotVisible}getMaxSumValueSpace(){var a,b,c,d,e,f=this,g=f.config.stackValues,h=f.getFromEnv('chart'),j={},k=g&&g.length,l=f.getFromEnv('number-formatter'),m=0,n=0,o=f.getFromEnv('smartLabel'),p=h.config.dataLabelStyle;for(o.useEllipsesOnOverflow(h.config.useEllipsesWhenOverflow),o.setStyle(p),a=0;a<k;a++)g[a]&&(e=g[a].positive+g[a].negative,b=l.dataLabels(e),j=o.getOriSize(b),c=j.width,d=j.height,n=mathMax(n,c),m=mathMax(m,d));return{maxWidth:n,maxHeight:m}}getCanvasPadding(){var a,b,c=this,d={paddingLeft:0,paddingRight:0,paddingTop:0,paddingBottom:0};return c._setStackPosition(),c._mapChildren(c=>{for(b in a=c.getCanvasPadding&&c.getCanvasPadding()||{},a)a.hasOwnProperty(b)&&(d[b]=Math.max(a[b],d[b]))}),d}}export default CartesianStackgroup;