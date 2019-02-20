import componentInterface from'../../core/component-interface';import interpolateNumber from'../axis/utils/interpolators/number';import diff from'../axis/utils/array/diff';import{getCrispPath}from'../axis/cartesian';import cartesianAxisRefAnimation from'../animation-rules/cartesian-axis-ref-animation';import{addDep}from'../dependency-manager';const isValid=a=>'undefined'===!typeof a||null!==a;let UNDEF;addDep({name:'cartesianAxisRefAnimation',type:'animationRule',extension:cartesianAxisRefAnimation});class AxisRefVisual extends componentInterface{constructor(){super(),this.config.map={},this.config.explicitDrawItems={}}getType(){return'axisRefVisuals'}getName(){return'axisRefVisualsCartesian'}draw(){let a,b,c,d,e,f,g,h=this.getDrawingInfo(),j=this.getexplicitDrawItems(),k=this.config,l=k.map,m={},n=this.getLinkedParent(),o=n.getAxes(),p=[],q=n.getChildContainer('axisReferenceVisualsFloor'),r=n.getChildContainer('axisReferenceVisualsBottom'),s=n.getChildContainer('axisReferenceVisualsMiddle'),t=n.getChildContainer('axisReferenceVisualsTop'),u=n.getChildContainer('axisReferenceVisualsCeil');for(n.config.trendlines=[],n.config.vtrendlines=[],b=0;b<o.length;++b)p.push(o[b].axis.getId());for(d in k.containers=[q,r,s,t,u],h)if(h.hasOwnProperty(d)&&(e=this.getLinkedItem(d),0<=p.indexOf(e.getId())))for(f=m[d],f||(f=m[d]=[]),a=h[d],b=0;b<a.length;++b)g=a[b],c=g.type,'band'===c?f.push.apply(f,this.createBand(g,e)):'line'===c&&f.push.apply(f,this.createLine(g,e));if(k.isSmartDrawing)for(d in l)l.hasOwnProperty(d)&&!j[d]&&this.getLinkedItem(d)&&(m[d]=l[d]);this.resetexplicitDrawItems(),this.removeExtraElements(m)}getDrawingInfo(){let a,b,c={},d=this.getexplicitDrawItems(),e=this.isCanvasChnaged(),f=this.config.isSmartDrawing=Object.keys(d).length&&!e,g=f?d:this.getLinkedItem();for(a in g)g.hasOwnProperty(a)&&(b=g[a],c[a]=b.getReferenceInfo());return c}createLine(a,b){let c,d,e,f=this.config.containers,g=f[a.layer],h=b.config,i=this.getFromEnv('paper'),j=this.getFromEnv('chart').getName(),k=this.getLinkedParent(),l=this.getFromEnv('animationManager'),m=this.getFromEnv('toolTipController'),n=k.config,o=n.trendlines,p=h.isVertical,q=n.canvasLeft,r=n.canvasTop,s=r+n.canvasHeight,t=q+n.canvasWidth,u=interpolateNumber(q,t),v=interpolateNumber(r,s),w=b.getScale(),x=w.getRangeValue(a.from),y=a.to!==UNDEF&&w.getRangeValue(a.to)||x,z=p?['M',q,x,'L',t,y]:['M',x,s,'L',y,r],A=a.attr,B=a.text,C=B&&B.attr,D=B&&B.labelPosition||0,E=b.getId(),F=a.id||a.from,G=E+'_'+F,H=this.getGraphicalElement(G),I=a.handlers,J={start:a.from,end:a.to};for(e in A.path=getCrispPath(z,isValid(A['stroke-width'])?A['stroke-width']:1).path.toString(),/trend/.test(a.id)&&o.push({x1:z[1],y1:z[2],x2:z[4],y2:z[5],tooltext:a.toolText,tolerance:5>A['stroke-width']?2.5:A['stroke-width']/2}),A['stroke-linecap']='butt',H=this.addGraphicalElement(G,l.setAnimation({container:g,el:H||'path',attr:A,component:this,axis:b,data:{value:J,path:z},label:'path'})),H.data('data',J),B&&(c=E+'_'+F+C.text,d=this.getGraphicalElement(c),p?(C.x=u(D),C.y=x):(C.x=x,C.y=v(D)),C.text=B.label,C.transform=i.getSuggestiveRotation(B.labelRotation,C.x,C.y),d=this.addGraphicalElement(c,l.setAnimation({container:f[B.layer],el:d||'text',attr:C,component:this,axis:b,data:{value:a.from},label:'text',css:B.css})),d.data('data',a.from)),/zoomscatter/i.test(j)||(a.toolText?m.enableToolTip(H,a.toolText):m.disableToolTip(H)),I)I.hasOwnProperty(e)&&(H.on(e,I[e].bind(b)),d&&d.on(e,I[e].bind(b)));return B?[G,c]:[G]}createBand(a,b){var c=Math.min;let d,e,f,g,h,i,j,k=this.config.containers[a.layer],l=b.config,m=this.getFromEnv('animationManager'),n=this.getFromEnv('toolTipController'),o=this.getLinkedParent(),p=this.getFromEnv('chart').getName(),q=o.config,r=l.isVertical,s=q.canvasLeft,t=q.canvasTop,u=t+q.canvasHeight,v=s+q.canvasWidth,w=b.getScale(),x=a.from,y=a.to===UNDEF?x:a.to,z=b.getId(),A=a.attr,B=a.handlers;for(i in d='canvasStart'===x?r?t:s:w.getRangeValue(x),e='canvasEnd'===y?r?u:v:w.getRangeValue(y),j=Math.abs(d-e),r?(A.x=s,A.y=c(d,e),A.width=v-s,A.height=j):(A.x=c(d,e),A.y=t,A.width=j,A.height=u-t),f=a.id||A.x+'_'+A.y,g=z+'_'+f,h=this.getGraphicalElement(g),/trend/.test(a.id)&&o.config.vtrendlines.push({x1:A.x,y1:A.y,x2:A.x+A.width,y2:A.y+A.height,tooltext:a.toolText,tolerance:5>A['stroke-width']?2.5:A['stroke-width']/2,isTrendZone:1}),h=this.addGraphicalElement(g,m.setAnimation({container:k,el:h||'rect',attr:A,component:this,label:'rect'})),/zoomscatter/i.test(p)||(a.toolText?n.enableToolTip(h,a.toolText):n.disableToolTip(h)),B)B.hasOwnProperty(i)&&h.on(i,B[i].bind(b));return[g]}removeExtraElements(a){let b,c,d,e,f,g,h=this.config.map;for(b in h)if(!a[b])for(c=h[b],e=c.length,d=0;d<e;++d)f=this.getGraphicalElement(c[d]),f&&this.removeGraphicalElement(f);else for(g=diff(h[b],a[b]),e=g.length,d=0;d<e;++d)f=this.getGraphicalElement(g[d]),f&&this.removeGraphicalElement(f);this.config.map=a}setLinkedItem(a,b){super.setLinkedItem(a,b);let c=this;'axis'===b.getType()&&c.addExtEventListener('preremove',a=>{c.removeLinkedItem(a.sender.getId()),c.asyncDraw()},b)}addexplicitDrawItems(a,b){this.config.explicitDrawItems[a]=b}getexplicitDrawItems(){return this.config.explicitDrawItems}resetexplicitDrawItems(){this.config.explicitDrawItems={}}isCanvasChnaged(){let a,b=this.getLinkedParent().getEffectiveDimensions(),c=this.config;return a=JSON.stringify(b)!==JSON.stringify(c.canvasDim),c.canvasDim=b,a}}export default AxisRefVisual;